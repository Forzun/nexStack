import {createClient} from "redis"

const client = createClient();

async function main(){
    client.connect() 
    client.on('error', (error) => console.log(`Redis Error: ${error}`))
    console.log("server connect successfully");

    const res = await client.xAdd('nexstack:website', "*", { 
        url: "google.com", 
        id:"1"
    })

    console.log(res); 
    client.destroy();
}

main();