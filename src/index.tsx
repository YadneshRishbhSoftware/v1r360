import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./assets/css/main.css";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// import React, { FC, useState, useRef, useEffect } from "react";

// interface Props {}

// let currentOTPindex: number = 0;

// const OTPField: FC<Props> = (props): JSX.Element => {
//   const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));

//   const [activeOTPIndex, setactiveOTPIndex] = useState<number>(0);

//   const inputRef = useRef<HTMLInputElement>(null);

//   const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     const value = e.target.value;

//     const newOTP: string[] = [...otp];

//     newOTP[currentOTPindex] = value.substring(value.length - 1);

//     if (!value) {
//       setactiveOTPIndex(currentOTPindex - 1);
//     } else {
//       setactiveOTPIndex(currentOTPindex + 1);
//     } // const val= value.substring(value.length-1) // console.log(val)

//     setOtp(newOTP); //console.log(currentOTPindex, activeOTPIndex)
//   };

//   console.log(otp);

//   const handleOnKeyDown = (
//     e: React.KeyboardEvent<HTMLInputElement>,
//     index: number
//   ) => {
//     const val = e.key;

//     console.log(e.key);

//     currentOTPindex = index;

//     if (val === "Backspace") {
//       setactiveOTPIndex(currentOTPindex - 1);
//     }
//   };

//   useEffect(() => {
//     inputRef.current?.focus();
//   }, [activeOTPIndex]);

//   return (
//     <div className="h-screen flex justify-center items-center space-x-2">
//            {" "}
//       {otp.map((_, index) => {
//         return (
//           <React.Fragment key={index}>
//                        {" "}
//             <input
//               value={otp[index]}
//               ref={index === activeOTPIndex ? inputRef : null}
//               onChange={handleOnChange}
//               onKeyDown={(e) => handleOnKeyDown(e, index)}
//               type="number"
//               className="w-12 h-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl spin-button-none border-gray-400 focus:border-gray-700 focus:text-gray-700 text-gray-400 transition"
//             />
//                        {" "}
//             {index === otp.length - 1 ? null : (
//               <span className="w-2 py-0.5 bg-gray-400" />
//             )}
//                      {" "}
//           </React.Fragment>
//         );
//       })}
//          {" "}
//     </div>
//   );
// };

// export default OTPField;
