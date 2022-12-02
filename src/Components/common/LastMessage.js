import { Grid } from "@mui/material";
import React from "react";

// const currTime = new Date().toLocaleTimeString();

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
              marginTop: "8rem",
              marginLeft: '2rem',
              backgroundColor: 'white',
              textAlign: "left",
              borderRadius: '6px',
              boxShadow: '0px 0px 25px -10px black',
              width: '90%',
            }}
            container
            key={item.last_message_id}
          >
            <Grid item xs={9}>
              {item.candidate_name}
            </Grid>
            <Grid item xs={3}>
              {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </Grid>
            <Grid item xs={12}>
              {item.last_message}
            </Grid>
          </Grid>
        );
      })}
        </div>
      ) : allLastMessages && allLastMessages.length === 0 ? (
        <div style={{marginTop: '80px'}}><h3>No data</h3></div>
      ) : (
        <div style={{marginTop: '80px'}}><h3>Loading...</h3></div>
      )}
    </div>
  );
}

export default LastMessage;
