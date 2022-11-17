import React from "react";
import Sidebar from "../../Employer/Jobs/Sidebar";
import Jobform from "../../Employer/Jobs/Jobform";
import { Button, Grid } from "@mui/material";

function Jobs() {
  const [postAjob, setpostAjob] = React.useState(false);
  const [mobileSidebar, setMobileSidebar] = React.useState(true);
  const [jobData, setJobData] = React.useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    experience: "",
    skills: [],
    jobType: "",
    domain: "",
  });

  const selectAJob = (data) => {
    setMobileSidebar(false);

    if(!data){
      setJobData({
        title: "",
    description: "",
    location: "",
    salary: "",
    experience: "",
    skills: [],
    jobType: "",
    domain: "",
      });
      setpostAjob(true);
    }else {
      setJobData(data);
      setpostAjob(true);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={3}  // 40%
          sx={{
            display: { xs: mobileSidebar ? "block" : "none", sm: 'block' },
          }}
        >
          <Sidebar selectAJob={selectAJob}/>
        </Grid>
        <Grid
          item
          xs={12}
          md={9} // 60%
          sx={{
            display: { xs: mobileSidebar ? "none" : "block", sm: 'block' },
          }}
        >
          <Button 
            sx={{
              display: { xs: "block", sm: "none" },
            }}
            onClick={() => setMobileSidebar(true)}
          >
            Back
          </Button>
          <Jobform 
          jobData={jobData}
          setJobData={setJobData}
          postAjob={postAjob}/>
        </Grid>
      </Grid>
    </>
  );
}

export default Jobs;
