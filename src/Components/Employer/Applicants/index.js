import React from "react";
import { collection, query, where } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import CommonTable from "../../common/CommonTable";
import { setDoc, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

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
  const last_messages_id = uuidv4();
  const oneToOneMessageId = uuidv4();

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
      // we need to update the status of the application to approved
      try {
        await setDoc(
          doc(db, "applications", row.applicationId),
          {
            status: "approved",
          },
          {
            merge: true,
          }
        );
        alert("Approved successfully!");
      } catch (err) {
        console.log(err);
      }
      // console.log("accept", row);
      try {
        // console.log("row", row);
        await setDoc(doc(db, "last_messages", last_messages_id), {
          last_message:
            `Hello, thankyou for showing interest in our company, we have accepted your application for ${row.title}`,
          postedAt: new Date(),
          employerId: row.employerId,
          candidateId: row.candidateId,
          jobId: row.jobId,
          applicationId: row.applicationId,
          last_message_id: last_messages_id,
          candidate_name: row.candidate_name,
          employer_name: row.company_name,
          conversationId: `${userInfo.uid}-${row.candidateId}`,
        });
        await setDoc(doc(db, "one-to-one-messages", oneToOneMessageId), {
          createdAt: new Date(),
          conversationId: `${userInfo.uid}-${row.candidateId}`,
          userId: userInfo.uid,
          userType: "employer",
          message:
          `Hello, thankyou for showing interest in our company, we have accepted your application for ${row.title}`,
        });
      } catch (err) {
        console.log(err);
      }
    } else if (action === "reject") {
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
