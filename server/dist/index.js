"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const prisma_1 = require("./prisma");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const corsOptions = {
    origin: "*",
};
const PORT = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, { cors: corsOptions });
io.on('connection', (socket) => {
    socket.on('send_message', async (message) => {
        io.emit('receive_message', message);
    });
});
httpServer.listen(PORT, () => {
    console.log("server started at port 3000!");
});
app.get("/userMessages/:userName", async (req, res) => {
    const { userName } = req.params;
    let user = await prisma_1.prismaClient.user.findUnique({ where: { userName: userName } });
    if (!user)
        user = await prisma_1.prismaClient.user.create({ data: { userName: userName } });
    const userMessages = await prisma_1.prismaClient.message.findMany({ where: { recipient: user.userName } });
    return res.status(200).json({ message: "success", messages: userMessages });
});
app.post("/sendMessage", async (req, res) => {
    const { title, recipient, body, sender } = req.body;
    const result = await prisma_1.prismaClient.message.create({
        data: {
            title: title,
            body: body,
            recipient: recipient,
            sender: sender
        }
    });
    if (result)
        return res.status(200).json({ message: "success!" });
});
app.get("/allUsers", async (req, res) => {
    const result = await prisma_1.prismaClient.user.findMany();
    return res.status(200).json({ data: result.map(res => res.userName) });
});
