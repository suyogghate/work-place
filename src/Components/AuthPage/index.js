import React from "react";
import { Button } from "@mui/material";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { UserContext } from "../context/UserContext";

function AuthPage({ type }) {
  const [state, dispatch] = React.useContext(UserContext);
  const navigate = useNavigate();
  const signIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // // The signed-in user info.
        const user = result.user;
        console.log(user);
        // localStorage.setItem("user", JSON.stringify(user));
        dispatch({ type: "SET_USER", payload: user });

        const docRef = doc(db, "userData", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userInfo = docSnap.data();
          const userType = userInfo.type;
          // localStorage.setItem('userInfo', JSON.stringify(userInfo));
          dispatch({ type: "SET_USER_INFO", payload: userInfo })

          if (type === "candidate") {
            if(userType === type){
              navigate("/candidate/profile");
            } else {
              alert('You are already onboarded as employer!');
              return;
            }
          } else {
            if(userType === type){
              navigate("/employer/profile");
            } else {
              alert("You are already onboarded as candidate!");
              return;
            }
          }
          console.log("Document data: ", docSnap.data());
        } else {
          if (type === "candidate") {
            navigate("/candidate/onboarding");
          } else {
            navigate("/employer/onboarding");
          }
        }
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
        // ...
      });
  };
  return (
    <div>
      {/* Auth for {type} */}
      <h1>Welcome {type} please SignIn</h1>
      <h3>SignIn with Google</h3>
      <Button onClick={signIn}>SignIn</Button>
    </div>
  );
}

export default AuthPage;
