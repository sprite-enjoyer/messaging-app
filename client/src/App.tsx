import { CSSProperties, createContext, useState } from "react";
import MessageComposer from "./components/MessageComposer";
import ReceivedMessages from "./components/ReceivedMessages";
import { Message } from "./types";
import { Button, TextField } from "@mui/material";

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
};

const message: Message = {
  sender: "weuirh",
  recipient: "adkshjf",
  title: " test",
  body: "dfklaegjnkladf jngkldasjn klrjagaerjo ngjoarhn gjkowerang "
};
const message2: Message = {
  sender: "guga",
  recipient: "gugishvili",
  title: "heyy title",
  body: "hello, dakfhkdas mdgaksdffm asdkjfgasd klerjna klgfsdklan nkfdvna klfndka fn jklanfdkla nflkmad nfkmldsa nlksdf nfsd klasn",
};

export const NameContext = createContext("");

const App = () => {
  const [userName, setUserName] = useState("");
  const [inputValue, setInputValue] = useState("");

  if (userName.length === 0) return (
    <div style={{ ...mainDivStyle, gap: "50px", }}>
      <TextField onChange={(e) => setInputValue(e.target.value)} label="Your Name" />
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
        < MessageComposer />
        <ReceivedMessages messages={[message, message2]} />
      </NameContext.Provider>
    </div >
  );
};

export default App;

