import "dotenv/config";
import express from "express";
import { AuthInput } from "./shared/types/user.types.js";
import jwt from "jsonwebtoken";
import { prisma } from "@workspace/database";
import { authMiddleware } from "./middleware/auth.js";

const app = express();
app.use(express.json());

app.post("/website", authMiddleware, async (req, res) => {
    if(!req.body){
      res.status(411).json({});
      return
    }
    
    const website = await prisma.website.create({
      data:{ 
        url: req.body.url, 
        createdAt: req.body.url, 
        user_id: req.userId
      }
    })


})

app.get("status/:websiteId", authMiddleware , async(req, res) => {
    const website = await prisma.website.findFirst({
      where: {
        user_id: req.userId,
        id: req.params.websiteId as string
      },
      include:{ 
        websiteTick: { 
            orderBy: { 
              createdAt:"desc",
            }, 
            take:1
        }
      },
    })

    if(!website){
      res.status(409).json({
        message:"not found"
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
        id: existingUser.id
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
      id: user.id
    })

  } catch (error) {
    const message = error instanceof Error ? error.message : "Something went wrong";
    res.status(403).send(message);
  }

})

app.post("/user/signin", async (req, res) => {
  try{ 
    const data = AuthInput.safeParse(req.body); 

  if(!data.success){
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
    sb: user.id,
  }, process.env.JWT_SECRET!)

  res.status(200).json({
    token: token
  })
  }catch(error){
    res.status(403).send("wrong")
  }
})


app.listen(3000);