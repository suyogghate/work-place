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
        <div>data</div>
      ) : allApplications && allApplications.length === 0 ? (
        <div>no data</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Application;
