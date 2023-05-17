import React from "react";
import logo from "../assets/images/logo.svg";
import logo_sm from "../assets/images/logo-sm.svg";
import Lite from "../assets/images/R-360Lite.svg";

function ForgotPassword() {
  return (
    <body className="app">
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
            <form className="login-form" action="#">
              <img src={Lite} alt="R-360 Lite" className="r360-logo" />
              <h3 className="login-head">Forgot Password?</h3>
              <p className="login-text">Enter the email below to continue.</p>
              <div className="form-group">
                <label className="control-label">Email</label>
                <div className="input-addon">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Robert@rishabhsoft.com"
                    autoFocus
                  />
                  <div className="icon-before">
                    <i className="icon-email"></i>
                  </div>
                  <div className="icon-after icon-green">
                    <i className="icon-check"></i>
                  </div>
                </div>
                {/* <!-- <div className="error-block">Error display here</div> --> */}
              </div>

              <div className="form-group btn-container">
                <button className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </body>
  );
}

export default ForgotPassword;
