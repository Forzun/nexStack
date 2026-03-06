import "dotenv/config";
import {createClient } from "redis"
import axios from "axios";
import { prisma } from "@workspace/database"

const CONSUMER_GROUP_NAME='India';
const STREAM_KEY='nexstack:website';
const REGION_ID = '1'

type message = { 
    id: string; 
    message:{ 
        url: string;
        id: string;
    }
}

const client = createClient();

async function main(){ 

    
try{
    client.connect()
    client.on("error", (error) => console.log("redis error", error))
    console.log("server connect...")

    try{ 
        const createGroup = await client.xGroupCreate(STREAM_KEY, CONSUMER_GROUP_NAME , '$')
        console.log("createGroup created:", createGroup , {length: createGroup.length});
    }catch(error: any){ 
        if(error.message?.includes("BUSYGROUP")){
            console.log('group is already created using existing one:');
        }else{
            throw error
        }
    }
    
    const response = await xReadGroup(CONSUMER_GROUP_NAME , '1');
    console.log("xReadGroup response here", response)

    const promises = response.map(({message}) => { 
        return new Promise<void>((resolve , reject ) => {
        const startTime = Date.now();
        const websiteId = message.id;
        const websiteUrl = message.url;
        console.log({
            websiteId, 
            websiteUrl
        })
        axios.get(websiteUrl)
            .then(async() =>  {
                console.log("atlest once")
                const endTime = Date.now() 
                await prisma.websiteTick.create({
                    data: { 
                        response_time: endTime - startTime,
                        status: "UP", 
                        website_id: websiteId,
                    }
                })
                resolve();
            }).catch(async(error) => {
                console.log(error.error)
                console.log(error.message)
                const endTime = Date.now()
                await prisma.websiteTick.create({ 
                    data: {
                        response_time: endTime- startTime,
                        status: "DOWN", 
                        website_id: websiteId,
                        createdAt: new Date(),
                    }
                })
                resolve()
            })
    })
    })
    await Promise.all(promises)    
    console.log("promise length", promises.length)

    xAckBulk(CONSUMER_GROUP_NAME , response.map(({id}) => id))
}catch(error){
    console.log(error)
}
}
main()


async function xReadGroup(consumerGroup:string , workerId:string):Promise<message[]>{
    
    const res = await client.xReadGroup(
        consumerGroup, 
        workerId, { 
            key: STREAM_KEY, 
            id: '>',
        }, { 
            COUNT: 3
        }
    )
    
    // @ts-ignore
    let messages:message[] = res[0].messages;
    console.log("read message", messages)
    return messages
}

async function xAck(consumerGroup: string , id: string){ 

    const response = await client.xAck(STREAM_KEY , consumerGroup , id);
    return response;
}

async function xAckBulk(consumerGroup: string , eventIds: string[]){ 
    eventIds.map(eventId => xAck(consumerGroup , eventId))
}

