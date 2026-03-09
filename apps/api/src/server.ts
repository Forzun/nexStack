import "dotenv/config";
import express, { response } from "express";
import { AuthInput } from "./shared/types/user.types.js";
import jwt from "jsonwebtoken";
import { Prisma, prisma } from "@workspace/database";
import { authMiddleware } from "./middleware/auth.js";
import cors from "cors"
import { object } from "zod/v4";

const app = express();
app.use(express.json());
app.use(cors())

app.post("/create/website", authMiddleware, async (req, res) => {
  try {
    if (!req.body) {
      res.status(411).json({
        error: "data is not vaild"
      });
      return
    }
    console.log("data pase here", { url: req.body.url, userId: req.userId })

    const website = await prisma.website.create({
      data: {
        url: req.body.url,
        time_added: new Date(),
        user_id: req.userId
      }
    })

    res.status(201).json(website);
  } catch (error) {
    console.error("Create website error:", error);

    res.status(500).json({
      error: "Failed to create website"
    });
  }
})


app.get("status/:websiteId", authMiddleware, async (req, res) => {
  const website = await prisma.website.findFirst({
    where: {
      user_id: req.userId,
      id: req.params.websiteId as string
    },
    include: {
      tick: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1
      }
    },
  })

  if (!website) {
    res.status(409).json({
      message: "not found"
    })
    return;
  }

  res.json({
    website
  })
})


app.post("/user/signup", async (req, res) => {
  try {
    const data = AuthInput.safeParse(req.body);
    console.log("data", data)

    if (!data.success) {
      res.status(403).send("wrong!")
      return
    }

    const { username, password } = data.data

    const existingUser = await prisma.user.findFirst({
      where: {
        username: username
      }
    })

    if (existingUser) {
      res.status(409).json({
        message: "oops user already exist",
      })
    }

    let user = await prisma.user.create({
      data: {
        username: username,
        password: password
      }
    })

    if (!user) {
      console.log("user created successfully: ", user)
    }

    return res.status(200).json({
      message: "successed!",
      username: user.username, 
    })

  } catch (error) {
    const message = error instanceof Error ? error.message : "Something went wrong";
    res.status(403).send(message);
  }

})

app.post("/user/signin", async (req, res) => {
  try {
    const data = AuthInput.safeParse(req.body);

    if (!data.success) {
      res.status(403).send("wrong input");
      return;
    }

    const { username, password } = data.data

    if (!data.success) {
      res.status(403).send("wrong!")
      return;
    }

    let user = await prisma.user.findFirst({
      where: {
        username: username
      }
    })

    if (!user) {
      res.status(403).send("")
      return;
    }

    if (user.password != password) {
      res.status(403).send("")
      return;
    }

    let token = jwt.sign({
      sub: user.id,
    }, process.env.JWT_SECRET!)

    res.status(200).json({
      token: token,
      message: "successed!",
      username: user.username, 
    })
  } catch (error) {
    res.status(403).send("wrong")
  }
})

app.get("/websites", authMiddleware , async(req ,res) => { 
  try{ 
    const response = await prisma.website.findMany({ 
      where: {
          user_id: req.userId
      },include: {
        tick: { 
          orderBy: {
            createdAt: "desc",
          },
          take: 1
        }
      }
    })

    if(response.length < 0){
       return res.status(200).json({ 
          message:"No website created yet", 
          success: true,
       })
    } 

    res.status(200).json({ 
        data: response
    })
  }catch(error){
    res.status(404).json({ 
        error: error
    })
  }
})

app.get("/websites/matrics", authMiddleware , async(req ,res) => {
  try{ 
    const extractDate = (d: string | Date) => new Date(d).toISOString().slice(0, 10);
    
    const userWebsite = await prisma.website.findMany({ 
        where:{ 
          user_id: req.userId
        },
    })

    const websiteIds = userWebsite.map(w => w.id);

    const matrics = await prisma.$queryRaw`
      SELECT
      DATE("createdAt") as date,
      MIN(response_time) as min_ms,
      MAX(response_time) as max_ms,
      CAST(AVG(response_time) AS INT) AS avg_ms
      FROM "WebsiteTick"
      WHERE website_id IN (${Prisma.join(websiteIds)})
      GROUP BY DATE("createdAt")
      ORDER BY date;
    `;

    res.send(matrics);
  }catch(error){
    console.log(error)
  }
})



app.listen(3000);