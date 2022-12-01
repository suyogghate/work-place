import { Button } from "@mui/material";
import React from "react";
import grafiti from "../../assets/rafiki.png";
import "../LandingPage/Section4.css";
import upload from "../../assets/upload.png";

function Section4() {
  return (
    <div>
      <div
        className="section4"
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#4540DB",
          height: "523px",
          width: "1213.3px",
          marginLeft: "140px",
          top: "2414px",
          borderRadius: "20px",
        }}
      >
        <img
          style={{
            width: "660.41px",
            height: "487px",
            marginRight: "702.97px",
            marginLeft: "-2rem",
            marginBottom: "-31rem",
            top: "2424px",
            zIndex: "1000",
          }}
          src={grafiti}
          alt="grafiti"
        />
        <div
          className="text-container"
          style={{
            // backgroundColor: "black",
            width: "553px",
            height: "290px",
            left: "737px",
            top: "2560px",
            color: "white",
            marginRight: "4rem",
            marginLeft: "-43rem",
            marginTop: "7rem",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              className="heading-text"
              style={{
                width: "516px",
                height: "141px",
                right: "187px",
                top: "2560px",
                fontFamily: "'Roboto'",
                fontStyle: "normal",
                fontWeight: "400",
                fontSize: "40px",
                lineHeight: "47px",
                color: "#FFFFFF",
                textAlign: "left",
              }}
            >
              Get Matched The Most Valuable Jobs, Just Drop Your CV at Get Set
              Job
            </div>
            <div
              style={{
                width: "553px",
                height: "42px",
                right: "150px",
                top: "2716px",
                fontFamily: "Roboto",
                fontStyle: "normal",
                fontWeight: "700",
                fontSize: "18px",
                lineHeight: "21px",
                color: "#FFFFFF",
                textAlign: "left",
                marginTop: "1.5rem",
              }}
            >
              In the subject line of email, write your name, the description of
              the position you want to apply
            </div>
            <div
              style={{
                width: "186px",
                height: "50px",
                marginTop: "2rem",
                background: "#FFFFFF",
                borderRadius: "20px",
                color: "#4540DB",
              }}
            >
              <Button
                sx={{
                  textAlign: "center",
                  "&:hover": {
                    scale: "1.1",
                    // background: "transparent",
                  },
                }}
              >
                <img
                  style={{
                    width: "18px",
                    height: "17px",
                    color: "#4540DB",
                    marginRight: "8px",
                    marginTop: "-15px",
                  }}
                  src={upload}
                  alt=""
                />
                <p style={{ color: "#4540DB", marginTop: "8px" }}>
                  Upload Your CV
                </p>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section4;
