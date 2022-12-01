import { Button, Grid, Typography } from "@mui/material";
import React from "react";

function Card2({ card }) {
  return (
    <Grid
      sx={{
        display: "flex",
        background: "#FFFFFF",
        boxShadow: "0px 3px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "20px",
        margin: "7px",
        padding: "20px 30px",
        width: "268px",
        height: "350px",
        alignItems: "center",
        // gap: '5px',
        "&:hover": {
          scale: "1.10",
        },
      }}
      item
      xs={6}
      md={2.5}
      lg={2.5}
    >
      <div>
        <img
          style={{
            height: "33px",
            width: "33px",
            marginBottom: "17rem",
            marginLeft: "-1rem",
          }}
          src={card.img}
          alt="img"
        />
      </div>
      <div>
        <Typography
          sx={{
            // fontWeight: "bold",
            fontSize: "20px",
            marginBottom: "0rem",
            marginRight: "12rem",
            marginTop: "2rem",
          }}
        >
          {card.title}
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: "400",
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            lineHeight: "14px",
            textAlign: "center",
            marginRight: "14rem",
            marginBottom: "2rem",
          }}
        >
          {card.type}
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "-2rem",
            textAlign: "start",
          }}
        >
          <Typography
            sx={{
              width: "215px",
              height: "23px",
              top: "1687px",
              fontFamily: "'Roboto'",
              fontStyle: "normal",
              fontWeight: "bold",
              fontSize: "25px",
              lineHeight: "29px",
              marginRight: "7rem",
              marginBottom: "2rem",
            }}
          >
            {card.designation}
          </Typography>
          <Typography sx={{ fontSize: "12px" }}>{card.type2}</Typography>
          <Typography
            sx={{
              width: "225px",
              height: "72px",
              left: "159px",
              top: "1756px",
              fontFamily: "'Roboto'",
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: "12px",
              lineHeight: "14px",
              color: "#585858",
              alignItems: "center",
            }}
          >
            <p>{card.text}</p>
          </Typography>
        </div>
        <div
          style={{
            marginLeft: "-7rem",
            marginBottom: "2rem",
            marginTop: "2rem",
            marginRight: "8rem",
          }}
        >
          <Typography>
            <p style={{ fontSize: "25px" }}>
              $2500<span style={{ fontSize: "15px" }}>/month</span>
            </p>
          </Typography>
        </div>
        <div>
          <Typography>
            <Button sx={{ margin: "-98px -61px 25px 25px", color: "#4540DB",
            "&:hover": {
                backgroundColor: '#4943DA',
                color: 'white'
              },
              borderRadius: '10px',
         }}>
              Apply Now
            </Button>
          </Typography>
        </div>
      </div>
    </Grid>
  );
}

export default Card2;
