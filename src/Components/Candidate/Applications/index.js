import React from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import CommonTable from "../../common/CommonTable";

const columnsName = [
  {
    title: "Company",
    key: "company_name"
  },
  {
    title: "Job title",
    key: "title",
  },
  {
    title: "Job location",
    key: "location",
  },
  {
    title: "status",
    key: "status",
  },
  // {
  //   title: "Job id",
  //   key: "jobId"
  // }
  // {
  //   title: "applied on",
  //   key: "postedAt",
  // },
];

function Application() {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const [allApplications, setAllApplications] = React.useState(null);

  const fetchData = async () => {
    const q = query(
      collection(db, "applications"),
      where("candidateId", "==", userInfo.uid)
    );
    let data = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      data.push(doc.data());
    });
    console.log(data, "data");
    setAllApplications(data);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {allApplications && allApplications.length > 0 ? (
        <div>
          <CommonTable data={allApplications} columnName={columnsName} />
        </div>
      ) : allApplications && allApplications.length === 0 ? (
        <div>no data</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Application;
