import { CSSProperties, createContext, useEffect, useState } from "react";
import MessageComposer from "./components/MessageComposer";
import ReceivedMessages from "./components/ReceivedMessages";
import { Message } from "./misc/types";
import { Button, TextField } from "@mui/material";
import ServerActions from "./misc/ServerActions";
import { io } from "socket.io-client";

const mainDivStyle: CSSProperties = {
  top: "0",
  left: "0",
  width: "100vw",
  height: "100vh",
  margin: "0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  overflowX: "hidden",
};

export const NameContext = createContext("");
const socket = io(import.meta.env.VITE_SERVER_URL, { autoConnect: false });
const serverActions = new ServerActions(socket);

const App = () => {
  const [userName, setUserName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    serverActions.socket.on('receive_message', (message: Message) => {
      if (message.recipient !== userName) return;
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          title: message.title,
          sender: message.sender,
          body: message.body,
          recipient: message.recipient
        }
      ]);
    });
  }, [userName, serverActions]);

  useEffect(() => {
    if (userName.length === 0) return;
    socket.connect();
    serverActions.getInitialMessages(userName)
      .then(async res => {
        const json = await res.json() as { messages: Message[] };
        setMessages(prev => [...prev, ...json.messages]);
      })
      .catch(e => console.error(e));
  }, [userName, serverActions]);


  if (userName.length === 0) return (
    <div style={{ ...mainDivStyle, gap: "50px", }}>
      <TextField
        onChange={(e) => setInputValue(e.target.value)}
        label="Your Name"
      />
      <Button
        onClick={() => setUserName(inputValue)}
        variant="contained"
        size="large"
      >
        Start
      </Button>
    </div>
  )

  return (
    <div style={mainDivStyle}>
      <NameContext.Provider value={userName}>
        <MessageComposer serverActions={serverActions} />
        <ReceivedMessages messages={messages} />
      </NameContext.Provider>
    </div >
  );
};

export default App;

