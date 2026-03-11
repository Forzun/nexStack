import "dotenv/config";
import {createClient } from "redis"
import axios from "axios";
import { prisma } from "@workspace/database"
import apiClient from "./services/apiClient";
import { start } from "repl";

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
    await client.connect()
    client.on("error", (error) => console.log("redis error", error))
    console.log("server connect...")

    try{ 
        const createGroup = await client.xGroupCreate(STREAM_KEY, CONSUMER_GROUP_NAME , '$')
        console.log("createGroup created:", createGroup , {length: createGroup.length});
    }catch(error: any){ 
        if(error.message?.includes("BUSYGROUP")){
            console.log('group is already created using existing one:');
        }else{
            console.log(error)
        }
    }

    while(true){    
        try{ 
            const response = await xReadGroup(CONSUMER_GROUP_NAME , '1');

            const promises = response.map(({message}) => { 
                return new Promise<void>(async(resolve , reject ) => {
                    const websiteId = message.id;
                    const websiteUrl = message.url;
                    console.log({
                        websiteId, 
                        websiteUrl
                    })
                    const startTime = Date.now();
                        apiClient.head(`${websiteUrl}` , { 
                            timeout: 5000
                        })
                        .then(async() =>  {
                            const endTime = Date.now() 
                            const ms = endTime - startTime
                            await prisma.websiteTick.create({
                                data: { 
                                    response_time: ms,
                                    status: "UP", 
                                    website_id: websiteId,
                                }
                            })
                            resolve();
                        }).catch(async(error) => {
                            console.log(error.error)
                            const endTime = Date.now()
                            await prisma.websiteTick.create({ 
                                data: {
                                    response_time: endTime- startTime,
                                    status: "DOWN", 
                                    website_id: websiteId,
                                    createdAt: new Date(),
                                }
                            })
                            resolve();
                        })
               })
            })
            await Promise.all(promises)    
            xAckBulk(CONSUMER_GROUP_NAME , response.map(({id}) => id))
        }catch(error){ 
            console.log(error)
        }
    }

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
    );

    const streams = (res ?? []) as { name: string; messages: message[] }[];
    if (streams.length === 0) {
        return [];
    }
    const messages = streams[0]?.messages ?? [];

    console.log("read message", messages);
    return messages;
}

async function xAck(consumerGroup: string , id: string){ 

    const response = await client.xAck(STREAM_KEY , consumerGroup , id);
    return response;
}

async function xAckBulk(consumerGroup: string , eventIds: string[]){ 
    eventIds.map(eventId => xAck(consumerGroup , eventId))
}

