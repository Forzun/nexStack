import {createClient} from "redis"
import { prisma } from "@workspace/database";

const client = createClient();

async function main(){
    client.connect() 
    client.on('error', (error) => console.log(`Redis Error: ${error}`))
    console.log("server connect successfully");

    const websites = await prisma.website.findMany({ 
        select: {
            url: true,
            id: true
        }
    });

    websites.forEach( async (website) => { 
        const res = await client.xAdd('nexstack:website', "*", { 
            url: website.url,
            id: website.id
        })            
        console.log(res);
    })
    client.destroy();
}

main();