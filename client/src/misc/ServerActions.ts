import { Socket } from "socket.io-client";
import { Message } from "./types";

class ServerActions {

  serverUrl = import.meta.env.VITE_SERVER_URL;

  socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }

  async sendMessage(message: Message) {
    this.socket.emit("send_message", message);
    await this.fetch("/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify(message),
    })
  }

  async getAllUsers() {
    return await this.fetch(
      `/allUsers`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json", },
      }
    );
  }

  async getInitialMessages(userName: string) {
    return await this.fetch(
      `/userMessages/${userName}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json", },
      }
    );
  }

  fetch(path: string, init?: RequestInit) {
    return fetch(`${this.serverUrl}${path}`, init);
  }

}

export default ServerActions;