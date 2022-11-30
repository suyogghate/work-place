import React, { useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import { Button, Grid } from "@mui/material";

function Sidebar({selectAJob}) {
  const [allJobs, setAllJobs] = useState(null);

  const fetchJobs = async () => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const employerId = userInfo.uid;

    try {
      const q = await query(
        collection(db, "jobsData"),
        where("employerId", "==", employerId)
      );
      
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

  return (
    <div style={{marginTop: '80px'}}>
      <Button
      sx={{
        border: '1px solid blue',
      }} 
      onClick={() => selectAJob()}>+ Post a Job</Button>
      {allJobs && allJobs.length > 0 ? (
        <div>
          {" "}
          {allJobs.map((job) => {
            return (
              <Grid
                onClick={() => selectAJob(job)}
                key={job.Job_id}
                container
                sx={{
                  padding: "10px",
                  margin: "10px",
                  border: " 2px solid black",
                  borderRadius: "8px",
                  fontSize: "16px",
                }}
              >
                <Grid item xs={12}>
                  {job.title}
                </Grid>
                <Grid item xs={12}>
                  {job.location}
                </Grid>
                <Grid item xs={12}>
                  {job.jobType}
                </Grid>
              </Grid>
            );
          })}
        </div>
      ) : allJobs && allJobs.length === 0 ? (
        <div><h1>No jobs posted</h1></div>
      ) : (
        <div
        style={{marginTop: '70px'}}
        >Loading...</div>
      )}
    </div>
  );
}

export default Sidebar;
