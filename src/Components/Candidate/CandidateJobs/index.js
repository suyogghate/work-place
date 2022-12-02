import React from "react";
import {
  collection,
  query,
  onSnapshot,
  setDoc,
  doc,
  getDoc,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { Button, Grid } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

function CandidateJob() {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const [allJobs, setAllJobs] = React.useState(null);

  const fetchJobs = async () => {
    try {
      const q = await query(collection(db, "jobsData"));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const jobs = [];
        querySnapshot.forEach((doc) => {
          jobs.push(doc.data());
        });
        setAllJobs(jobs);
        console.log("Current Jobs: ", jobs);
      });
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    fetchJobs();
  }, []);

  const applyForJob = async (job) => {
    // application id
    // job id
    // candidate id
    // status
    const applicationId = uuidv4();
    console.log(job, "job");

    // fetch the applications with candidate id
    // if job id is present in the applications then show alert already applied
    // else apply for the job

    const q = await query(
      collection(db, "applications"),
      where("candidateId", "==", userInfo.uid)
    );
    let data = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      data.push(doc.data());
    });

    const isApplied = data.find((item) => item.jobId === job.Job_id);

    if (isApplied) {
      alert("You've already applied for this job.");
      return;
    } else {
      try {
        await setDoc(doc(db, "applications", applicationId), {
          applicationId,
          jobId: job.Job_id,
          employerId: job.employerId,
          title: job.title,
          location: job.location,
          postedAt: new Date(),
          candidateId: userInfo.uid,
          status: "applied",
          candidate_name: userInfo.displayName,
          company_name: job.employer_name,
          candidate_email: userInfo.email
        });
        alert("Applied successfully!");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      {allJobs && allJobs.length > 0 ? (
        <div>
          {allJobs.map((job) => {
            return (
              <Grid
                sx={{
                  maxWidth: "600px",
                  width: "70%",
                  marginTop: "5rem",
                  marginLeft: '26rem',
                  padding: "10px",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                  borderRadius: "10px",
                  gap: '2px',
                }}
                container
              >
                <Grid item xs={12}>
                  Job title: {job.title}
                </Grid>
                <Grid item xs={12}>
                  Location: {job.location}
                </Grid>
                <Grid item xs={12}>
                  Description: {job.description}
                </Grid>
                <Grid item xs={12}>
                  <label>Skills : </label>
                  <div style={{ display: "flex", gap: "10px", flexDirection: 'row' }}>
                    {job.skills.map((skill) => {
                      return <div>{skill}</div>;
                    })}
                  </div>
                </Grid>
                <Grid item sx={12}>
                  <Button onClick={() => applyForJob(job)} variant="contained">
                    Apply
                  </Button>
                </Grid>
              </Grid>
            );
          })}
        </div>
      ) : allJobs && allJobs.length === 0 ? (
        <div style={{marginTop: '6rem'}}><h3>No data</h3></div>
      ) : (
        <div style={{marginTop: '6rem'}}><h3>Loading...</h3></div>
      )}
    </div>
  );
}

export default CandidateJob;
