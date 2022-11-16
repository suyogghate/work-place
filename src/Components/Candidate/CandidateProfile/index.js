import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import React from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

const domain = [
  "Frontend",
  "Backend",
  "Fullstack",
  "Devops",
  "UI/UX",
  "Machine Learning",
  "Artificial Intelligence",
  "Data Science",
  "QA",
  "Cloud Computing",
  "BlockChain",
  "Software Enginner",
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const skills = [
  "C",
  "C++",
  "Java",
  "Python",
  "HTML",
  "CSS",
  "Javascript",
  "React",
  "Redux",
  "SQL",
  "MongoDB",
  "Express",
  "NodeJs",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function CandidateProfile() {
  const userData = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = React.useState(true);
  const theme = useTheme();
  const [edit, setEdit] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({
    name: "",
    email: "",
    phone: "",
    skills: [],
    experience: "",
    education: "",
    domain: "",
    ctc: "",
  });

  async function fetchUserInfo() {
    try{
    const docRef = doc(db, "userData", userData.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setUserInfo(docSnap.data());
      setLoading(false);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (err){
    console.log(err);
  }
  }

  React.useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleSkillChange = (event) => {
    const {
      target: { value },
    } = event;
    setUserInfo({
      ...userInfo,
      skills: typeof value === "string" ? value.split(",") : value,
    });
  };

  const saveInfo = async() => {
    try {
      await setDoc(doc(db, "userData", userData.uid), {
        ...userInfo,
      }, {merge: true});
      alert('successfully submitted!');
      setEdit(false)
    } 
    catch (error) {
      console.log(error)
    }
  } 

  return (
    <div>
      {
        loading ? <div>Loading...</div> : (
          <form>
      <h1>Candidate Profile</h1>
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
            disabled={!edit}
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
            type="email"
            id="outlined-required"
            label="Email"
            fullWidth
            sx={{ marginTop: "20px" }}
            value={userInfo.email}
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            disabled={!edit}
            type="number"
            id="outlined-required"
            label="Phone"
            fullWidth
            sx={{ marginTop: "20px" }}
            value={userInfo.phone}
            onChange={(e) =>
              setUserInfo({ ...userInfo, phone: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={!edit}
            required
            id="outlined-required"
            label="Total Experience"
            fullWidth
            sx={{ marginTop: "20px" }}
            value={userInfo.experience}
            onChange={(e) =>
              setUserInfo({ ...userInfo, experience: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={!edit}
            required
            id="outlined-required"
            label="Education"
            fullWidth
            sx={{ marginTop: "20px" }}
            value={userInfo.education}
            onChange={(e) =>
              setUserInfo({ ...userInfo, education: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel
              id="demo-simple-select-label"
              sx={{ marginTop: "20px" }}
            >
              Domain
            </InputLabel>
            <Select
              disabled={!edit}
              labelId="demo-simple-select-label"
              id="outlined-required"
              value={userInfo.domain}
              label="Domain"
              sx={{ marginTop: "20px" }}
              onChange={(e) =>
                setUserInfo({ ...userInfo, domain: e.target.value })
              }
            >
              {domain.map((domain, index) => {
                return (
                  <MenuItem key={index} value={domain}>
                    {domain}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl sx={{ mx: 0.5, mt: 2.5, width: 700 }}>
            <InputLabel id="demo-multiple-chip-label">Skills</InputLabel>
            <Select
              disabled={!edit}
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={userInfo.skills}
              onChange={handleSkillChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {skills.map((skill) => (
                <MenuItem
                  key={skill}
                  value={skill}
                  style={getStyles(skill, userInfo.skills, theme)}
                >
                  {skill}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={!edit}
            required
            id="outlined-required"
            label="Current CTC"
            fullWidth
            sx={{ marginTop: "20px", marginBottom: "20px" }}
            value={userInfo.ctc}
            onChange={(e) => setUserInfo({ ...userInfo, ctc: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          {edit ? (
            <div>
              <Button variant="contained" onClick={saveInfo}>Save</Button>
              <Button variant="contained" onClick={()=> setEdit(false)}>Cancel</Button>
            </div>
          ) : (
            <Button variant="contained" onClick={()=> setEdit(true)}>Edit</Button>
          )}
        </Grid>
      </Grid>
    </form>
        )
      }
    </div>
  );
}

export default CandidateProfile;
