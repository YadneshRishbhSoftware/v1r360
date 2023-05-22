import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { CACHE_DYNAMIC_CONTENT } from "../App";
function OtpPage() {

  const [setpin, setSetpin] = useState({
    four: "",
    three: "",
    two: "",
    one: "",
  });
  const one = React.useRef<HTMLInputElement>();
  const two = React.useRef<HTMLInputElement>();
  const three = React.useRef<HTMLInputElement>();
  const four = React.useRef<HTMLInputElement>();
  const done = React.useRef<HTMLInputElement>();
  useEffect(() => {
    var pinValue;
    if ("caches" in window) {
      caches.match("/pinValue").then((response) => {
        if (response) {
          response.json().then(result => {
            console.log(result,"response")
            if (result.pinValue) {
              pinValue = result.pinValue;
            }
          });
        }
      });
  
      caches.match("/credentials").then((response) => {
        if (response) {
            console.log(response,"PPPP")
          caches.match("/isLoggedIn").then((response) => {
            if (!response) {
              navigate("/");
            }
          });
        } else {
          navigate("/");
        }
      });
    }
  }, []);
  const [enableDoneButton, setEnableDoneButton] = useState(true);
  const navigate = useNavigate();
  const inputChangedHandler = (event: React.ChangeEvent<HTMLInputElement>, inputId) => {
    const _setpin = { ...setpin };
    _setpin[inputId] = event.target.value;
    setSetpin(_setpin);
    if (_setpin[inputId].length >= 1) {
      switch (inputId) {
        case "four":
            setEnableDoneButton(false);
          setSetpin({ ..._setpin, three: "" });
          break;
        case "three":
            setEnableDoneButton(false);
          setSetpin({ ..._setpin, two: "" });
          break;
        case "two":
            setEnableDoneButton(false);
          setSetpin({ ..._setpin, one: "" });
          break;
        case "one":
            setEnableDoneButton(true);
          break;
        default:
          return;
      }
    }
  };
  const setPinClick = (e) => {
    e.preventDefault()
    const pinValue = setpin.four + setpin.three + setpin.two + setpin.one;
    console.log(pinValue,"pinValue")
    if ("caches" in window) {
      caches.match("/pinValue").then((response) => {
        if (response) {
          response.json().then(function updateFromCache(result) {
            if (result.pinValue !== pinValue) {
                console.log("result",result)
              toast.error("Please enter valid pin");
              return;
            } else {
              navigate("/calender");
            }
          });
        } else {
          const data = {
            pinValue: pinValue,
          };

          const jsonResponse = new Response(JSON.stringify(data), {
            headers: {
              "content-type": "application/json",
            },
          });

          caches.open(CACHE_DYNAMIC_CONTENT).then((cache) => {
            cache.put("pinValue", jsonResponse);
            navigate("/calender");
          });
        }
      });
    }
  };

  return (
    <>
      <body className="app">
      <ToastContainer />
        <section className="login-content">
          <div className="login-content-lt">
            <div className="logo">
              <img src="images/logo.svg" alt="Rishabh Software" />
            </div>
            <div className="logo-sm">
              <img src="images/logo-sm.svg" alt="Rishabh Software" />
            </div>
          </div>
          <div className="login-content-rt">
            <div className="login-box">
              <form className="login-form" action="#">
                <img
                  src="images/R-360Lite.svg"
                  alt="R-360 Lite"
                  className="r360-logo"
                />
                <h3 className="login-head">OTP</h3>
                <p className="login-text">
                  We have send the Verification code to your mobile number.
                </p>
                <div className="form-group">
                  <label className="control-label">Enter here</label>
                  <div className="otp-block">
                    <input
                      className="form-control"
                      maxLength={1}
                      type="text"
                      placeholder=""
                      onChange={(e) => inputChangedHandler(e, "four")}
                      // ref={four}
                    />
                    <input
                      className="form-control"
                      maxLength={1}
                      type="text"
                      placeholder=""
                      onChange={(e) => inputChangedHandler(e, "three")}
                      // ref={three}
                    />
                    <input
                      className="form-control"
                      maxLength={1}
                      type="text"
                      placeholder=""
                      onChange={(e) => inputChangedHandler(e, "two")}
                      // ref={two}
                    />
                    <input
                      className="form-control"
                      maxLength={1}
                      type="text"
                      placeholder=""
                      onChange={(e) => inputChangedHandler(e, "one")}
                      // ref={one}
                    />
                  </div>
                  {/* <!-- <div className="error-block">Error display here</div> --> */}
                </div>
                {/* <div className="otp-request">
                  Didn't receive code? <a href="#">Request again</a>
                </div> */}
                <div className="form-group btn-container">
                  <button className="btn btn-primary"
                   onClick={setPinClick}
                   disabled={!enableDoneButton}
                  //  ref={this.done}
                  >Submit</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </body>
    </>
  );
}

export default OtpPage;
