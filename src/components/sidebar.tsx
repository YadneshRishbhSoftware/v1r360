import React from 'react'

function Sidebar() {
  return (
    <>
      <div
          className="modal left fade"
          id="navModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="myModalLabel2"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <div className="d-flex align-items-center justify-content-start">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">
                      <i className="icon-prev"></i>
                    </span>
                  </button>
                </div>
              </div>
              <div className="modal-body">
                <h3 className="bold mb-0">Robert Ronald</h3>
                <p className="emp-id">2810</p>
                <div className="nav-block">
                  <h6>General</h6>
                  <a href="#" className="nav-col">
                    <i className="nav-icon icon-settting2 setting"></i>
                    <span className="nav-label">Settings</span>
                    <i className="rt-icon icon-next"></i>
                  </a>
                  <a
                    href="#"
                    className="nav-col"
                    data-toggle="modal"
                    data-target="#notificationModal"
                    data-dismiss="modal"
                  >
                    <i className="nav-icon icon-notification notification"></i>
                    <span className="nav-label">Notifications</span>
                    <i className="rt-icon icon-next"></i>
                  </a>
                  <a
                    href="#"
                    className="nav-col"
                    data-toggle="modal"
                    data-target="#changePassModal"
                    data-dismiss="modal"
                  >
                    <i className="nav-icon icon-lock2 change-pass"></i>
                    <span className="nav-label">Change Password</span>
                    <i className="rt-icon icon-next"></i>
                  </a>
                </div>
                <div className="nav-block">
                  <h6>Personal</h6>
                  <a
                    href="#"
                    className="nav-col"
                    data-toggle="modal"
                    data-target="#aboutusModal"
                    data-dismiss="modal"
                  >
                    <i className="nav-icon icon-user2 aboutus"></i>
                    <span className="nav-label">About Us</span>
                    <i className="rt-icon icon-next"></i>
                  </a>
                  <a
                    href="#"
                    className="nav-col"
                    data-toggle="modal"
                    data-target="#TnCModal"
                    data-dismiss="modal"
                  >
                    <i className="nav-icon icon-document tnc"></i>
                    <span className="nav-label">Terms & Conditions</span>
                    <i className="rt-icon icon-next"></i>
                  </a>
                  <a
                    href="#"
                    className="nav-col"
                    data-toggle="modal"
                    data-target="#privacyPolicyModal"
                    data-dismiss="modal"
                  >
                    <i className="nav-icon icon-document privacy-policy"></i>
                    <span className="nav-label">privacy-policy</span>
                    <i className="rt-icon icon-next"></i>
                  </a>
                </div>
                <div className="logout-block">
                  <a href="#">Logout</a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal left-m fade"
            id="notificationModal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="myModalLabel2"
          >
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <div className="back-btn-block">
                    <button
                      type="button"
                      className="close i-prev"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">
                        <i className="icon-prev"></i>
                      </span>
                    </button>
                    <h4 className="modal-title" id="myModalLabel2">
                      Notifications
                    </h4>
                    <button
                      type="button"
                      className="close i-close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <Modal open={isDeleteModal} onClose={() => setIsDeleteModal(false)} center>
          <h3>Delete Task Entry</h3>
          <p>Are you sure about deleting this Entry?</p>
          <div className="form-group m-10">
            <button
              className="btn btn-sm	btn-danger sharp  m-r-10"
              onClick={() => setIsDeleteModal(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-sm	btn-primary sharp"
              onClick={deleteTask}
            >
              Confirm
            </button>
          </div>
        </Modal> */}
        </div>
    </>
  )
}

export default Sidebar
