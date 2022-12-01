import React from "react";
import "../LandingPage/Footer.css";
import logo from "../../assets/get-set-job-logo.png";
import line from "../../assets/line.png";

function Footer() {
  return (
    <>
      <div className="whole-container">
        <div className="footer-container">
          <div>
            <img
              src={logo}
              alt="logo"
              style={{
                height: "120px",
                width: "120px",
                borderRadius: "50%",
              }}
            />
          </div>
          <div className="footer-navs">
            <p className="nav"><a href="/">About</a></p>
            <p className="nav"><a href="/">Jobs</a></p>
            <p className="nav"><a href="/">Contact Us</a></p>
            <p className="nav"><a href="/">Terms</a></p>
            <p className="nav"><a href="/">Privacy Policy</a></p>
          </div>
        </div>
        <div className="line-img">
          <img
            style={{
              width: "1159px",
              height: "0px",
              left: "18px",
              top: "3433.09px",
              border: "2px solid #CDCDCD",
              marginBottom: '2rem',
            }}
            src={line}
            alt="line"
          />
        </div>
        <div>
          Made with ♥ by Suyog Ghate.
        </div>
      </div>
    </>
  );
}

export default Footer;
