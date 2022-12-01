import { Grid, Typography } from "@mui/material";
import React from "react";

function Card({card}) {
  return (
    <Grid
      sx={{
        display: "flex",
        background: "#FFFFFF",
        boxShadow: "0px 3px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "20px",
        margin: "7px",
        padding: "20px 30px",
        // width: '318px',
        height: '156px',
        alignItems: 'center',
        // gap: '5px',
        "&:hover": {
          background: "#4540DB",
          color: "white",
          transition: "ease-in",
        },
      }}
      item
      xs={6}
      md={2.5}
      lg={2.5}
    >
      <div>
        <img
          style={{ height: "45px", width: "45px", margin: "10px" }}
          src={card.img}
          alt="img"
        />
      </div>
      <div>
        <Typography variant="h6" sx={{ fontWeight: "600" }}>
          {card.title}
        </Typography>
        <Typography variant="h6">
          {card.availableJobs} Available Jobs
        </Typography>
      </div>
    </Grid>
  );
}

export default Card;
