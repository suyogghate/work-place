import React from "react";
// import { Form } from "react-router-dom";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { db } from "../../../firebaseConfig";
import { setDoc, doc} from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";

const industry = [
  "Automotive",
  "Agriculture",
  "Banking",
  "IT & Software",
  "Construction",
  "Chemical industries",
  "Public Services",
  "Commerce",
  "Education"
];

function EmployerOnboarding() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));
  const [userInfo, setUserInfo] = React.useState({
    name: "",
    email: userData?.email?userData.email:"",
    phone: "",
    companyName: "",
    companySize: "",
    companyLocation: "",
    hremailid: "",
    industry: "",
  });

  const submitUserInfo = async(e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "userData", `${userData.uid}`), {
        ...userInfo,
        type: "employer",
      });
      alert('successfully submitted!');
      navigate('/employer/profile');  
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    console.log("Submit", userInfo);
  };

  return (
    <form onSubmit={submitUserInfo}>
      <h1>Employer Onboarding</h1>
      <Grid
        container
        spacing={2}
        sx={{
          padding: "10px",
          maxWidth: "95%",
          margin: "30px auto",
          backgroundColor: "#e9eff3",
          boxShadow: "0px 0px 30px rgb(0 0 0 / 45%)",
          borderRadius: "8px",
        }}
      >
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="outlined-required"
            label="Name"
            fullWidth
            sx={{ marginTop: "20px" }}
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            required
            type='email'
            id="outlined-required"
            label="Email"
            fullWidth
            sx={{ marginTop: "20px" }}
            value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            type='number'
            id="outlined-required"
            label="Phone"
            fullWidth
            sx={{ marginTop: "20px" }}
            value={userInfo.phone}
            onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="outlined-required"
            label="Company Name"
            fullWidth
            sx={{ marginTop: "20px" }}
            value={userInfo.companyName}
            onChange={(e) =>
              setUserInfo({ ...userInfo, companyName: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="outlined-required"
            label="Company Size"
            fullWidth
            sx={{ marginTop: "20px" }}
            value={userInfo.companySize}
            onChange={(e) =>
              setUserInfo({ ...userInfo, companySize: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="outlined-required"
            label="Company Location"
            fullWidth
            sx={{ marginTop: "20px" }}
            value={userInfo.companyLocation}
            onChange={(e) =>
              setUserInfo({ ...userInfo, companyLocation: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="outlined-required"
            label="HR Email id"
            fullWidth
            sx={{ marginTop: "20px" }}
            value={userInfo.hremailid}
            onChange={(e) =>
              setUserInfo({ ...userInfo, hremailid: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" sx={{ marginTop: "20px" }}>
              Industry
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="outlined-required"
              value={userInfo.industry}
              label="Industry"
              sx={{ marginTop: "20px" }}
              onChange={(e) =>
                setUserInfo({ ...userInfo, industry: e.target.value })
              }
            >
              {industry.map((ind, index) => {
                return (
                  <MenuItem key={index} value={ind}>
                    {ind}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit">Submit</Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default EmployerOnboarding;
