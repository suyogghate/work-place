import React from "react";
import { collection, query, where } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import CommonTable from "../../common/CommonTable";
import { doc, deleteDoc, onSnapshot } from "firebase/firestore";

const columnsName = [
  {
    title: "Candidate",
    key: "candidate_name",
  },
  {
    title: "email",
    key: "candidate_email",
  },
  {
    title: "status",
    key: "status",
  },
  {
    title: "Job Title",
    key: "title",
  },
  {
    title: "actions",
    key: "buttons",
  },
];

function Applicants() {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const [allApplications, setAllApplications] = React.useState(null);

  const fetchData = async () => {
    const q = query(
      collection(db, "applications"),
      where("employerId", "==", userInfo.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setAllApplications(data);
      console.log("Current applications: ", data);
    });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleClick = async (action, row) => {
    if (action === "accept") {
      console.log("accept", row);
    } else {
      // application should be deleted
      await deleteDoc(doc(db, "applications", row.applicationId));
      console.log("reject", row);
    }
  };

  return (
    <div>
      {allApplications && allApplications.length > 0 ? (
        <div>
          <CommonTable
            columnName={columnsName}
            handleClick={handleClick}
            data={allApplications}
          />
        </div>
      ) : allApplications && allApplications.length === 0 ? (
        <div>no data</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Applicants;
