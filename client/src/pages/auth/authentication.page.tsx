import { useState } from "react";
import RegisterPage from "./auth-components/register-page.component";
import LoginPage from "./auth-components/login-page.component";

const Auth = () => {
  const [signUp, setSignUp] = useState<boolean>(false);

  return (
    <>
      {signUp ? (
        <RegisterPage signUp={signUp} setSignUp={setSignUp} />
      ) : (
        <LoginPage signUp={signUp} setSignUp={setSignUp} />
      )}
    </>
  );
};

export default Auth;
