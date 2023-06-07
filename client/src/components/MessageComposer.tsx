import { Autocomplete, Box, Button, Container, TextField } from "@mui/material";
import ServerActions from "../misc/ServerActions";
import { useContext, useEffect, useState } from "react";
import { NameContext } from "../App";
import { Message } from "../misc/types";

export interface MessageComposerProps {
  serverActions: ServerActions,
}

const MessageComposer = ({ serverActions }: MessageComposerProps) => {

  const [dbUsers, setDbUsers] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [recipient, setRecepient] = useState("");
  const [body, setBody] = useState("");
  const [open, setOpen] = useState(false);
  const userName = useContext(NameContext);

  const handleButtonClick = () => {
    const newMessage: Message = {
      title: title,
      recipient: recipient,
      body: body,
      sender: userName
    };
    serverActions.sendMessage(newMessage);
  };

  useEffect(() => {
    if (!open) return;
    serverActions.getAllUsers()
      .then(async res => {
        const result = await res.json() as { data: string[] };
        setDbUsers(result.data);
      })
      .catch(e => console.error(e));
  }, [open]);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: 'center',
        alignItems: "flex-start",
        flexDirection: "column",
        gap: "20px",
        width: "100%",
        paddingTop: "30px",
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flex: "1 1",
          width: "100%",
          gap: "50px",
          padding: "0 !important",

        }}
      >
        <TextField
          label="Title"
          sx={{
            width: "auto",
            flex: "1 1",
            padding: "0",
          }}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <Autocomplete
          disablePortal
          autoComplete
          clearOnEscape={false}
          options={dbUsers}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          onInputChange={(e, value) => setRecepient(value)}
          value={recipient}
          renderInput={
            (params) =>
              <TextField
                {...params}
                label="Recipient"
              />
          }
          sx={{
            width: "auto",
            flex: "1 1",
          }}

        />
      </Container>
      <TextField
        label="Message body"
        multiline
        minRows={10}
        sx={{
          flex: "1 1",
          width: "100%",
        }}
        onChange={(e) => setBody(e.target.value)}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Button
          variant="contained"
          size={"large"}
          onClick={handleButtonClick}
        >
          Send Message
        </Button>
      </Box>
    </Container>
  );
};

export default MessageComposer;