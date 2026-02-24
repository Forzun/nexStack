import {createClient} from "redis"
import { prisma } from "@workspace/database"

const client = createClient();

async function main(){ 
    client.connect()
    client.on("error", (error) => console.log("redis error", error))
    console.log("server connect...")

    const res = await client.xReadGroup('india', 'india-1', {
        key: 'nexstack:website', 
        id: '>'
    }, { 
        COUNT: 2
    })

    if(res){
        return;
    }
}

setInterval(() => main() , 3 * 60);

