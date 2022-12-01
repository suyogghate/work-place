import { Button } from "@mui/material";
import React from "react";
import "../LandingPage/Jobnews.css";

function Jobnews() {
  return (
    <div className="job-container">
      <div className="heading-container">
        <div className="heading-text">
          Never Want to Miss Any{" "}
          <span style={{ color: "#4540DB" }}>Job News?</span>
        </div>
        <div>
          <input
            className="input-field"
            type="text"
            placeholder="Enter your email..."
          />
        </div>
        <div>
          <Button
            sx={{
              width: "119px",
              height: "50px",
              marginTop: '30px',
              marginLeft: '2rem',
              background: "#4540DB",
              borderRadius: "20px",
              color: 'white',
              ":hover": { bgcolor: "transparent", color: "#4540DB" }
            }}
          >
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Jobnews;
