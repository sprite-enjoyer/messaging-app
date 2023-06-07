import { Accordion, AccordionDetails, AccordionSummary, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Message } from "../misc/types";

export interface ReceivedMessagesProps {
  messages: Message[]
};

const ReceivedMessages = ({ messages }: ReceivedMessagesProps) => {
  return (
    <List
      sx={{
        paddingTop: "20px",
      }}
    >
      {
        messages.map((message, i) =>
          <ListItem key={i}>
            <Accordion
              sx={{
                width: "100%",
              }}
            >
              <AccordionSummary>
                <Typography>{`${message.title} - ${message.sender}`}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {message.body}
              </AccordionDetails>
            </Accordion>
          </ListItem>
        )
      }
    </List>
  );
};


export default ReceivedMessages;