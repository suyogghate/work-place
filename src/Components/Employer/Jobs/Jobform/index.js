import {
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
import { Box } from "@mui/system";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import {
  setDoc,
  doc,
  addDoc,
  collection,
  getFirestore,
} from "firebase/firestore";
import { db } from "../../../../firebaseConfig";

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

function Jobform({ postAjob, jobData, setJobData }) {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const theme = useTheme();

  const handleSkillChange = (event) => {
    const {
      target: { value },
    } = event;
    setJobData({
      ...jobData,
      skills: typeof value === "string" ? value.split(",") : value,
    });
  };

  const submitJob = async (e) => {
    e.preventDefault();
    const Job_id = uuidv4();

    try {
      if (jobData.Job_id) {
        //update

        await setDoc(doc(db, "jobsData", jobData.Job_id), {
          ...jobData,
        });
        //setDoc(doc,data)
        // doc (db,'collection_name','doc_id')
      } else {
        //create

        await setDoc(doc(db, "jobsData", Job_id), {
          Job_id: Job_id,
          ...jobData,
          employerId: userInfo.uid,
          createdAt: new Date(),
          employer_name: userInfo.displayName
        });
      }
      alert("Job Posted Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return postAjob ? (
    <form onSubmit={(e) => submitJob(e)}>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h1>Jobform</h1>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          value={jobData.title}
          // disabled={!edit}
          required
          id="outlined-required"
          label="Title"
          fullWidth
          sx={{ marginTop: "20px" }}
          onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          value={jobData.location}
          // disabled={!edit}
          required
          id="outlined-required"
          label="Location"
          fullWidth
          sx={{ marginTop: "20px" }}
          onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          value={jobData.salary}
          // disabled={!edit}
          required
          id="outlined-required"
          label="Salary"
          fullWidth
          sx={{ marginTop: "20px" }}
          onChange={(e) => setJobData({ ...jobData, salary: e.target.value })}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          value={jobData.experience}
          // disabled={!edit}
          required
          id="outlined-required"
          label="Experience"
          fullWidth
          sx={{ marginTop: "20px" }}
          onChange={(e) =>
            setJobData({ ...jobData, experience: e.target.value })
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          value={jobData.jobType}
          // disabled={!edit}
          required
          id="outlined-required"
          label="Job Type"
          fullWidth
          sx={{ marginTop: "20px" }}
          onChange={(e) => setJobData({ ...jobData, jobType: e.target.value })}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          required
          multiline
          rows={4}
          label="Description about the company...."
          value={jobData.description}
          onChange={(e) =>
            setJobData({ ...jobData, description: e.target.value })
          }
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" sx={{ marginTop: "20px" }}>
            Domain
          </InputLabel>
          <Select
            // disabled={!edit}
            labelId="demo-simple-select-label"
            id="outlined-required"
            value={jobData.domain}
            label="Domain"
            sx={{ marginTop: "20px" }}
            onChange={(e) => setJobData({ ...jobData, domain: e.target.value })}
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
            fullWidth
            // disabled={!edit}
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={jobData.skills}
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
                style={getStyles(skill, jobData.skills, theme)}
              >
                {skill}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Grid>
    </Grid>
    </form>
  ) : (
    <div>Please select a job</div>
  );
}

export default Jobform;
