import {createClient } from "redis"
import axios from "axios";
import { prisma } from "@workspace/database"

const CONSUMER_GROUP_NAME='us';
const STREAM_KEY='nexstack:website';

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

    response.map(({id , message}) => { 
        const startTime = Date.now();
        const websiteId = message.id;
        const websiteUrl = message.url;
        axios.get(websiteUrl)
            .then(async() =>  {
                const endTime = Date.now() 
                await prisma.websiteTick.create({
                    data: { 
                        response_time: Date.now() - startTime,
                        status: "UP", 
                        website_id: websiteId,
                        createdAt: new Date(),
                    }
                })
            }).catch(() => {

            })
    })

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
    return messages
}
