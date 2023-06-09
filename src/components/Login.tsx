import React, { useState } from "react";
import logo from "../assets/images/logo.svg";
import logo_sm from "../assets/images/logo-sm.svg";
import Lite from "../assets/images/R-360Lite.svg";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../Hooks/useStore";
import { observer } from "mobx-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";
function Login() {
  const {
    rootStore: { loginStore },
  } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isToggled, setToggled] = useState(false);
  const [isLoader, setIsLoader] = useState(true);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>();

  const toggle = () => {
    setToggled(!isToggled);
  };
  var regEx = /^[\w-\.]+@(rishabhsoft.com)$/;
  const loginHandle = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const isUsernameValid = email.trim().length > 0 && regEx;
    const isPasswordValid = password.trim().length > 0;

    if (isUsernameValid && isPasswordValid) {
      // Submit the form
      await loginStore.fetchUserToken(email, password);

      if (loginStore?.userDetails?.status === "success") {
        navigate("/otpPin");
      } else if(loginStore?.userDetails?.status === "fail") {
        toast.error(loginStore?.userDetails?.data);
      }
    } else {
      setErrors({
        email: isUsernameValid ? undefined : "Username is required",
        password: isPasswordValid ? undefined : "Password is required",
      });
    }
  };
    setTimeout(()=> {
      setIsLoader(false)
    },3000)
 
  return (
    <>
      <body className="app">
        {isLoader ? <Loader /> : 
        <>
      <ToastContainer autoClose={1500}/>
        <section className="login-content">
          <div className="login-content-lt">
            <div className="logo">
              <img src={logo} alt="Rishabh Software" />
            </div>
            <div className="logo-sm">
              <img src={logo_sm} alt="Rishabh Software" />
            </div>
          </div>
          <div className="login-content-rt">
            <div className="login-box">
              <form className="login-form" action="#" onSubmit={loginHandle}>
                <img src={Lite} alt="R-360 Lite" className="r360-logo" />
                <h3 className="login-head">Login</h3>
                <p className="login-text">
                  Enter the details below to continue.
                </p>
                <div className="form-group">
                  <label className="control-label">Employee ID</label>
                  <div className="input-addon">
                    <input
                      className="form-control"
                      type="email"
                      //   value={email}
                      //   placeholder="2451"
                      //   required
                      //   defaultValue={email}
                      onChange={(e: any) => setEmail(e.target.value)}
                      autoFocus
                    />
                    <div className="icon-before">
                      <i className="icon-user"></i>
                    </div>
                    {email.match(regEx) ? (
                      <div className="icon-after icon-green">
                        <i className="icon-check"></i>
                      </div>
                    ) : (
                      <div className="icon-after icon-red">
                        <i className="icon-check"></i>
                      </div>
                    )}
                  </div>

                  {errors?.email && (
                    <div className="error-block">{errors?.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <label className="control-label">
                    Password<span className="extric">*</span>
                  </label>
                  <div className="input-addon">
                    <input
                      id="password-field"
                      className="form-control"
                      type={isToggled! ? "text" : "password"}
                      //   name="password"
                      onChange={(e: any) => setPassword(e.target.value)}
                    />
                    <div className="icon-before">
                      <i className="icon-lock"></i>
                    </div>
                    {/* <span
                      toggle="#password-field"
                      className="icon-eye-close field-icon toggle-password"
                    ></span> */}
                    <span
                      onClick={toggle}
                      className="icon-eye-close field-icon toggle-password"
                    ></span>
                  </div>
                </div>
                <div className="form-group">
                  <div className="utility">
                    <p>
                      <Link to="/forgotpassword" className="form-link">
                        Forgot Password?
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="form-group btn-container">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    // onClick={() => navigate("/calender")}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
        </>
}
      </body>
    </>
  );
}

export default observer(Login);
//https://r360-dev-services.rishabhsoft.com/api/login
