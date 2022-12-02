import { Button, Grid, TextField } from "@mui/material";
import React from "react";

function MessageArea({ allConversations, postMessage }) {
  const [message, setMessage] = React.useState("");
  const loggedIn_user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      {allConversations ? (
        <Grid sx={{ height: "90vh" }} container>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "90%",
              overflowY: "scroll",
            }}
            item
            xs={12}
          >
            {allConversations.reverse().map((item) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      item.userId === loggedIn_user.uid
                        ? "flex-end"
                        : "flex-start",
                  }}
                >
                  <div
                    style={{
                      background: "#F0DBDB",
                      borderRadius: "0px 16px 16px 16px",
                      margin: "15px",
                      padding: "10px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems:
                        item.userId === loggedIn_user.uid
                          ? "flex-end"
                          : "flex-start",
                    }}
                    key={item.conversationId}
                  >
                    <div>{item.message}</div>
                    <div>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                  </div>
                </div>
              );
            })}
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              position: "sticky",
              // bottom: "100px",
              width: "100%",
              bottom: { xs: "50px", md: "0px" },
              background: "#ffff",
              padding: "10px",
              borderRadius: " 12px 13px 0px 0px",
            }}
          >
            <Grid container>
              <Grid item xs={10}>
                <TextField
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <Button onClick={() => postMessage(message)}>Send</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <div style={{ marginTop: "80px" }}>
          <h3>Please select a conversation</h3>
        </div>
      )}
    </div>
  );
}

export default MessageArea;
