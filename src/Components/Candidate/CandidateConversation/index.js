import { Grid, Button } from "@mui/material";
import React from "react";
import LastMessage from "../../common/LastMessage";
import MessageArea from "../../common/MessageArea";
import { where, collection, query, onSnapshot, setDoc, doc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { v4 as uuidv4 } from "uuid";

function CandidateConversation() {
  const [lastMessageMobile, setLastMessageMobile] = React.useState(true);
  const [selectConversation, setSelectConversation] = React.useState(null);
  const [allLastMessages, setAllLastMesssages] = React.useState(null);
  const [allConversations, setAllConversations] = React.useState(null);
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const selectAConversation = async(data) => {
    console.log(data);
    setSelectConversation(data);
    const q = query(
      collection(db, "one-to-one-messages"),
      where("conversationId", "==", data.conversationId)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let data = [];
      console.log(querySnapshot, "querySnapshot");
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setAllConversations(data);
      console.log("Current messages: ", data);
    })
    setLastMessageMobile(false);
  };

  const postMessage = async (message) => {
    const conversationId = selectConversation.conversationId;
    const oneToOneMessageId = uuidv4();
    try{
    await setDoc(doc(db, 'last_messages', selectConversation.last_message_id),{
      last_message: message,
      postedAt: new Date().toLocaleTimeString(),
    },{
      merge: true
    })
    await setDoc(doc(db, 'one-to-one-messages', oneToOneMessageId),{
      postedAt: new Date().toLocaleTimeString(),
      conversationId: conversationId,
      userId:userInfo.uid,
      userType:'candidate',
      message:message,
    })
  } catch(err) {
    console.log(err);
  } 
}

  const fetchData = async () => {
    const q = query(
      collection(db, "last_messages"),
      where("candidateId", "==", userInfo.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setAllLastMesssages(data);
      console.log("Current messages: ", data);
    });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid container>
      <Grid
        xs={12}
        sm={4}
        sx={{
          display: { xs: lastMessageMobile ? "block" : "none", sm: "block" },
        }}
      >
        <LastMessage
          allLastMessages={allLastMessages}
          selectAConversation={selectAConversation}
        />
      </Grid>
      <Grid
        xs={12}
        sm={8}
        sx={{
          display: { xs: lastMessageMobile ? "none" : "block", sm: "block" },
        }}
      >
        <Button
          sx={{
            display: { xs: "block", sm: "none" },
          }}
          onClick={() => setLastMessageMobile(true)}
        >
          back
        </Button>
        <MessageArea 
        allConversations={allConversations}
        postMessage={postMessage}
        />
      </Grid>
    </Grid>
  );
}

export default CandidateConversation;
// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 900px
// lg, large: 1200px
// xl, extra-large: 1536px

