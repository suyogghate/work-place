import React from "react";
import { Button } from "@mui/material";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import {useNavigate} from 'react-router-dom';

function AuthPage({ type }) {
  const navigate = useNavigate();
  const signIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // // The signed-in user info.
        const user = result.user;
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));
        if(type === 'candidate'){
          // navigate to candidate
          if(!true){   // data
            // navigate to candidate profile
            navigate('/candidate/profile');
          }
          else{
            // navigate to candidate onboarding
            navigate('/candidate/onboarding');
          }
        }
        else{
          // navigate to employer
          if(!true){    // data
            // navigate to employer profile
            navigate('/employer/profile');
          }
          else{
            // navigate to employer onboarding
            navigate('/employer/onboarding');
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
