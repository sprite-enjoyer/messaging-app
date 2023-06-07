import { Autocomplete, Box, Button, Container, TextField } from "@mui/material";

const MessageComposer = () => {
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
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={[]}
          renderInput={(params) => <TextField {...params} label="Recipient" />}
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
        >
          Send Message
        </Button>
      </Box>
    </Container>
  );
};

export default MessageComposer;