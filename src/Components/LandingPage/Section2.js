import { Grid, Typography } from "@mui/material";
import React from "react";
import "../LandingPage/Section2.css";
import marketing from "../../assets/marketing.png";
import design from "../../assets/design.png";
import hrd from "../../assets/hrd.png";
import finance from "../../assets/finance.png";
import government from "../../assets/government.png";
import business from "../../assets/business.png";
import customer from "../../assets/customer.png";
import project from "../../assets/project.png";
import Card from "../common/Card";

const cards = [
  {
    title: "Marketing and communication",
    availableJobs: "100+",
    img: marketing,
  },
  {
    title: "Design & Development",
    availableJobs: "200+",
    img: design,
  },
  {
    title: "Human Research & Development",
    availableJobs: "150+",
    img: hrd,
  },
  {
    title: "Finance Management",
    availableJobs: "100+",
    img: finance,
  },
  {
    title: "Government Jobs",
    availableJobs: "250+",
    img: government,
  },
  {
    title: "Business & Consulting",
    availableJobs: "323+",
    img: business,
  },
  {
    title: "Customer Support Care",
    availableJobs: "220+",
    img: customer,
  },
  {
    title: "Project Management",
    availableJobs: "150+",
    img: project,
  },
];

function Section2() {
  return (
    <Grid
      container
      className="grid-container"
      sx={{
        width: "100%",
        height: "600px",
        backgroundColor: "lightblue",
        marginTop: "20rem",
      }}
    >
      <Typography
        className="heading"
        variant="h4"
        sx={{
          fontWeight: "600",
          fontSize: "50px",
          fontFamily: "Roboto",
          marginTop: "3rem",
          marginLeft: '35rem',
          marginBottom: '-6rem',
        }}
      >
        One Platfrom <br/>Many <span className="solution">Solutions</span>
      </Typography>

      <Grid
        container
        sx={{
          margin: "auto",
          justifyContent: "center",
          gap: '25px',
        }}
      >
        {cards.map((card, i) => {
          return <Card key={i} card={card} />;
        })}
      </Grid>
    </Grid>
  );
}

export default Section2;
