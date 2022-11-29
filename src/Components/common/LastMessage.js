import { Grid } from "@mui/material";
import React from "react";

// const currTime = new Date().toLocaleTimeString();

// const mock = [
//   {
//     id: 1,
//     name: "John Doe",
//     lastMessage: "Hello there, I am John Doe",
//     time: "12:00 PM",
//   },
//   {
//     id: 2,
//     name: "John Doe",
//     lastMessage: "Hello there, I am John Doe",
//     time: "12:00 PM",
//   },
//   {
//     id: 3,
//     name: "John Doe",
//     lastMessage: "Hello there, I am John Doe",
//     time: "12:00 PM",
//   },
//   {
//     id: 4,
//     name: "John Doe",
//     lastMessage: "Hello there, I am John Doe",
//     time: "12:00 PM",
//   },
// ];

function LastMessage({selectAConversation, allLastMessages}) {
  return (
    <div>
      {allLastMessages && allLastMessages.length > 0 ? (
        <div>
          {allLastMessages.map((item) => {
        return (
          <Grid
          onClick={() => selectAConversation(item)}
            sx={{
              padding: "10px",
              margin: "10px",
              textAlign: "left",
            }}
            container
            key={item.last_message_id}
          >
            <Grid item xs={9}>
              {item.candidate_name}
            </Grid>
            <Grid item xs={3}>
              {item.postedAt.seconds}
            </Grid>
            <Grid item xs={12}>
              {item.last_message}
            </Grid>
          </Grid>
        );
      })}
        </div>
      ) : allLastMessages && allLastMessages.lenght === 0 ? (
        <div>No data</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default LastMessage;
