import React from 'react'

function OtpPage() {
    return (
        <>
            <body className="app">
                <section className="login-content">
                    <div className="login-content-lt">
                        <div className="logo"><img src="images/logo.svg" alt="Rishabh Software" /></div>
                        <div className="logo-sm"><img src="images/logo-sm.svg" alt="Rishabh Software" /></div>
                    </div>
                    <div className="login-content-rt">
                        <div className="login-box">
                            <form className="login-form" action="#">
                                <img src="images/R-360Lite.svg" alt="R-360 Lite" className="r360-logo" />
                                <h3 className="login-head">OTP</h3>
                                <p className="login-text">We have send the Verification code to your mobile number.</p>
                                <div className="form-group">
                                    <label className="control-label">Enter here</label>
                                    <div className="otp-block">
                                        <input className="form-control" type="text" placeholder="" />
                                        <input className="form-control" type="text" placeholder="" />
                                        <input className="form-control" type="text" placeholder="" />
                                        <input className="form-control" type="text" placeholder="" />
                                    </div>
                                    {/* <!-- <div className="error-block">Error display here</div> --> */}
                                </div>
                                <div className="otp-request">Didn't receive code? <a href="#">Request again</a></div>
                                <div className="form-group btn-container">
                                    <button className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </body>
        </>
    )
}

export default OtpPage