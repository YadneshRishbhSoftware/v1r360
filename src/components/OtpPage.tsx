import React, {FC, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { CACHE_DYNAMIC_CONTENT } from "../App";

  interface Props {}
  let currentOTPindex:number=0;
  const OtpPage: FC<Props> = (props): JSX.Element => {
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));

  const [activeOTPIndex, setactiveOTPIndex] = useState<number>(0);
  const [enableDoneButton, setEnableDoneButton] = useState(false);
  const inputRef= useRef<HTMLInputElement>(null)
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
            else {
                 navigate("/otpPin");
               }
          });
        } 
      });
    }
  }, []);

  
  const navigate = useNavigate();
 
    const inputChangedHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value;
      const newOTP: string[] = [...otp];

      newOTP[currentOTPindex] = value.substring(value.length - 1);
      if (!value) {
        setactiveOTPIndex(currentOTPindex - 1)
      } else {
        setactiveOTPIndex(currentOTPindex + 1)
      }
      // const val= value.substring(value.length-1)   
      // console.log(val)
      setOtp(newOTP);
      //console.log(currentOTPindex, activeOTPIndex)    
      if(!newOTP[3]){
        setEnableDoneButton(false)
      }else{
        setEnableDoneButton(true)
      }
    };    
    

  const setPinClick = (e) => {
    e.preventDefault()
 
    const pinValue = otp[3] + otp[2] + otp[1] + otp[0];
    console.log(pinValue,"pinValue")
    if ("caches" in window) {
      caches.match("/pinValue").then((response) => {
        if (response) {
          response.json().then(function updateFromCache(result) {
            if (result.pinValue !== pinValue) {
              console.log("result",result)
              toast.error("Please enter valid pin");
              setTimeout(()=>{
                setOtp(new Array(4).fill(""))
              }, 6000)
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

    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      const val = e.key
      console.log(e.key)
      currentOTPindex = index
      if (val === "Backspace") {
        setactiveOTPIndex(currentOTPindex - 1)
      }

      if (val === "Backspace") {
        setactiveOTPIndex(currentOTPindex +1)
      }
    }

    useEffect(() => {
      inputRef.current?.focus()
    }, [activeOTPIndex])

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
                <div className="otp-block"  >
                  { otp.map((_, index) => {
                  return(
                    <div style={{margin:"8px"}} key={index}>
                      <input 
                       className="form-control"
                       value={otp[index]}
                       ref={index === activeOTPIndex ? inputRef : null}
                       onChange={inputChangedHandler}
                       onKeyDown={(e) => handleOnKeyDown(e, index)}
                       type="text"

                     />
                     </div>
                  )  
                  })  }
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
