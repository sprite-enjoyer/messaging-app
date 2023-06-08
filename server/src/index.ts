import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import { prismaClient } from "./prisma";
import dotenv from "dotenv";
import { Message } from "./misc/types";
import cors, { CorsOptions } from "cors";
dotenv.config();

const corsOptions: CorsOptions = {
  origin: "*",
};

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: corsOptions });

io.on('connection', (socket) => {

  socket.on('send_message', async (message: Message) => {
    io.emit('receive_message', message);
  });

});

httpServer.listen(PORT, () => {
  console.log("server started at port 3000!");
});

app.get("/userMessages/:userName", async (req, res) => {
  const { userName } = req.params;

  let user = await prismaClient.user.findUnique({ where: { userName: userName } });
  if (!user) user = await prismaClient.user.create({ data: { userName: userName } });

  const userMessages = await prismaClient.message.findMany({ where: { recipient: user.userName } });
  return res.status(200).json({ message: "success", messages: userMessages });
});

app.post("/sendMessage", async (req, res) => {
  const { title, recipient, body, sender } = req.body;
  const result = await prismaClient.message.create({
    data: {
      title: title,
      body: body,
      recipient: recipient,
      sender: sender
    }
  });

  if (result) return res.status(200).json({ message: "success!" })
});

app.get("/allUsers", async (req, res) => {
  const result = await prismaClient.user.findMany();
  return res.status(200).json({ data: result.map(res => res.userName) });
})