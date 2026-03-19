import "dotenv/config";
import { createClient } from "redis"
import { prisma } from "@workspace/database";

const client = createClient();

async function main() {
    client.connect()
    client.on('error', (error) => console.log(`Redis Error: ${error}`))
    console.log("server connect successfully");

    const websites = await prisma.website.findMany({
        select: {
            url: true,
            id: true
        }
    });

    console.log("length:", websites.length)
    for (const website of websites) {
        try {
            const response = await client.xAdd('nexstack:website', '*', {
                url: website.url,
                id: website.id
            })
            console.log("pusher response:", response)
        } catch (error) {
            console.log("failed to add:", website.id, website.url);
        }
    }

    client.destroy();
}

setInterval(() => { main() }, 20 * 1000)

main();