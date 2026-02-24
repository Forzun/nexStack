import {createClient} from "redis"

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

    console.log(res);
    client.destroy();
}

main();


