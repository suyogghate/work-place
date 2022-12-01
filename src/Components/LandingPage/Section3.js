import { Grid, Typography, Button } from "@mui/material";
import React from "react";
import "../LandingPage/Section3.css";
import Card from "../common/Card2";
import Job from "../../assets/job.png";

const cards = [
  {
    title: "Microsoft",
    type: "Freelance",
    designation: "Senior UI Designer",
    type2: "Fulltime",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis, cum? Nihil fugit, reprehenderit tempore corrupti neque sequi animi impedit! Laborum accusantium.",
    price: "$2500/month",
    img: Job,
  },
  {
    title: "Microsoft",
    type: "Freelance",
    designation: "Senior UI Designer",
    type2: "Fulltime",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis, cum? Nihil fugit, reprehenderit tempore corrupti neque sequi animi impedit! Laborum accusantium.",
    price: "$2500/month",
    img: Job,
  },
  {
    title: "Microsoft",
    type: "Freelance",
    designation: "Senior UI Designer",
    type2: "Fulltime",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis, cum? Nihil fugit, reprehenderit tempore corrupti neque sequi animi impedit! Laborum accusantium.",
    price: "$2500/month",
    img: Job,
  },
  {
    title: "Microsoft",
    type: "Freelance",
    designation: "Senior UI Designer",
    type2: "Fulltime",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis, cum? Nihil fugit, reprehenderit tempore corrupti neque sequi animi impedit! Laborum accusantium.",
    price: "$2500/month",
    img: Job,
  },
  {
    title: "Microsoft",
    type: "Freelance",
    designation: "Senior UI Designer",
    type2: "Fulltime",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis, cum? Nihil fugit, reprehenderit tempore corrupti neque sequi animi impedit! Laborum accusantium.",
    price: "$2500/month",
    img: Job,
  },
  {
    title: "Microsoft",
    type: "Freelance",
    designation: "Senior UI Designer",
    type2: "Fulltime",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis, cum? Nihil fugit, reprehenderit tempore corrupti neque sequi animi impedit! Laborum accusantium.",
    price: "$2500/month",
    img: Job,
  },
  {
    title: "Microsoft",
    type: "Freelance",
    designation: "Senior UI Designer",
    type2: "Fulltime",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis, cum? Nihil fugit, reprehenderit tempore corrupti neque sequi animi impedit! Laborum accusantium.",
    price: "$2500/month",
    img: Job,
  },
  {
    title: "Microsoft",
    type: "Freelance",
    designation: "Senior UI Designer",
    type2: "Fulltime",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis, cum? Nihil fugit, reprehenderit tempore corrupti neque sequi animi impedit! Laborum accusantium.",
    price: "$2500/month",
    img: Job,
  },
];

function Section3() {
  return (
    <Grid
      container
      className="grid-container"
      sx={{
        width: "100%",
        height: "500px",
        backgroundColor: "",
        marginTop: "5rem",
        marginBottom: '34rem',
      }}
    >
      <Typography
        className="heading"
        variant="h4"
        sx={{
          fontWeight: "600",
          fontSize: "50px",
          fontFamily: "Roboto",
          marginTop: "0rem",
          marginLeft: "34rem",
          marginBottom: "5rem",
        }}
      >
        Featured Job Circulars
      </Typography>

      <Grid
        container
        sx={{
          margin: "auto",
          justifyContent: "center",
          gap: "25px",
        }}
      >
        {cards.map((card, i) => {
          return <Card key={i} card={card} />;
        })}
      </Grid>
      <Grid>
        <Button
          sx={{
            margin: "2rem 5rem 3rem 43.5rem",
            height: "50px",
            width: "158px",
            border: "2px solid #4943DA",
            borderRadius: "20px",
            color: "#4943DA",
            "&:hover": {
              background: "#4540DB",
              color: "white",
              transition: "ease-in",
            },
          }}
        >
          Find More Jobs
        </Button>
      </Grid>
    </Grid>
  );
}

export default Section3;
