import React from "react";
import Sidebar from "../../Employer/Jobs/Sidebar";
import Jobform from "../../Employer/Jobs/Jobform";
import { Button, Grid } from "@mui/material";

function Jobs() {
  const [mobileSidebar, setMobileSidebar] = React.useState(true);
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
          <Sidebar />
        </Grid>
        <Grid
          item
          xs={12}
          md={9} // 60%
          sx={{
            display: { xs: mobileSidebar ? "none" : "block", sm: 'block' },
          }}
        >
          <Jobform />
        </Grid>
      </Grid>
      <Button onClick={() => setMobileSidebar(!mobileSidebar)}>Switch</Button>
    </>
  );
}

export default Jobs;
