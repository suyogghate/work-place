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
import { DarkmodeContext } from "../../context/Darkmode";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebaseConfig";

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
  // const [darkModeOn, toggleDarkMode] = React.useContext(DarkModeContext);
  const [loading, setLoading] = React.useState(true);
  const [state, dispatch] = React.useContext(DarkmodeContext);
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
    try {
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
    } catch (err) {
      console.log(err);
    }
  }

  React.useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleSkillChange = React.useCallback(
    (event) => {
      const {
        target: { value },
      } = event;
      setUserInfo({
        ...userInfo,
        skills: typeof value === "string" ? value.split(",") : value,
      });
    },
    [userInfo]
  );

  const saveInfo = async () => {
    try {
      await setDoc(
        doc(db, "userData", userData.uid),
        {
          ...userInfo,
        },
        { merge: true }
      );
      alert("successfully submitted!");
      setEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  const [pdfurl, setPdfurl] = React.useState("");
  const [progresspercent, setProgresspercent] = React.useState(0);
  const submitFile = (e) => {
    e.preventDefault();
    console.log(e.target[0].files[0]);
    const file = e.target[0]?.files[0];

    if (!file) return;

    const storageRef = ref(storage, `resume/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setPdfurl(downloadURL);
          console.log(downloadURL, "url");
          setUserInfo({
            ...userInfo,
            resume: downloadURL,
          });
          setProgresspercent(0);
        });
      }
    );
  };

  return (
    <div
      style={{
        backgroundColor: state.darkMode ? "#1e1e1e" : "#fff",
        color: state.darkMode ? "#fff" : "#1e1e1e",
        height: "42.6rem",
      }}
    >
      {loading ? (
        <div style={{ marginTop: "70px" }}>
          <h3>Loading...</h3>
        </div>
      ) : (
        <div>
          <h1 style={{ marginTop: "70px" }}>Candidate Profile</h1>
          <Grid
            container
            spacing={2}
            sx={{
              padding: "10px",
              maxWidth: "95%",
              margin: "30px auto",
              backgroundColor: state.darkMode ? "#fff" : "#fff",
              // color: state.darkMode ? "#2C3333" : "#fff",
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
                onChange={(e) =>
                  setUserInfo({ ...userInfo, name: e.target.value })
                }
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
              <FormControl sx={{ mx: 0.5, mt: 2.5, width: 500 }}>
                <InputLabel id="demo-multiple-chip-label">Skills</InputLabel>
                <Select
                  disabled={!edit}
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={userInfo.skills}
                  onChange={handleSkillChange}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
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
                onChange={(e) =>
                  setUserInfo({ ...userInfo, ctc: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              {!edit ? (
                <form onSubmit={submitFile}>
                  <input accept="application/pdf" type="file" style={{color: 'black'}}/>
                  {progresspercent > 0 && progresspercent <= 100 ? (
                    <div>{progresspercent}</div>
                  ) : (
                    <Button variant="contained" type="submit">Upload</Button>
                  )}
                </form>
              ) : userInfo.resume ? (
                <Button variant="contained" onClick={() => window.open(userInfo.resume, "_blank")}>
                  View resume
                </Button>
              ) : (
                <div>Upload your Resume</div>
              )}
            </Grid>
            <Grid item xs={12}>
              {edit ? (
                <div>
                  <Button variant="contained" onClick={saveInfo}>
                    Save
                  </Button>
                  <Button variant="contained" onClick={() => setEdit(false)}>
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button variant="contained" onClick={() => setEdit(true)}>
                  Edit
                </Button>
              )}
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}

export default React.memo(CandidateProfile);
