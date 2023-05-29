import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStore } from "../Hooks/useStore";
import { observer } from "mobx-react";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const localizer = momentLocalizer(moment);

function CalendarCard() {
  const navigate = useNavigate();
  const [selectedDate, setSelactedDate] = useState<any>(new Date());
  const [projectId, setProjectId] = useState<number | undefined>(0);
  const [taskArr, setTaskArr] = useState<any>([]);
  const [taskId, setTaskId] = useState<string>();
  const [timeHours, setTimehours] = useState<string>();
  const [timeMinute, setTimeminute] = useState<number | undefined>(0);
  const [isLeave, setisLeave] = useState<boolean>(false);
  const [descriptionComment, setDescriptionComment] = useState<
    string | undefined
  >("");
  const {
    rootStore: { calendercardStore, userAddTaskStore, insertLogTime },
  } = useStore();
  console.log(userAddTaskStore?.getAddTasklist?.Project_task, "leave--->");
  const getDate = async (e: any) => {
    await calendercardStore.fetchcalenderCardData(
      moment(e.start).format("DD/MMMM/YYYY")
    );
    setSelactedDate(e.start);
  };

  const userAddTask = () => {
    userAddTaskStore.fetchcalenderCardData(
      moment(selectedDate).format("DD/MMMM/YYYY")
    );
  };
  useEffect(() => {
    console.debug("adhfd");
    const tempArr = userAddTaskStore?.getAddTasklist?.filter((item: any) => {
      return item.project_id === Number(projectId);
    });
    setTaskArr(
      Object.values(tempArr?.[0] ? tempArr?.[0].project_task?.[0] : [])
    );
  }, [projectId]);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/calender");
    } else {
      navigate("/");
    }
  }, [navigate]);

  const setHours = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimehours(e.target.value);
  };
  const gettaskID = (e) => {
    setTaskId(e.target.value);
    if (e.target.value === ("21395" || "18962")) {
      setisLeave(true);
    } else {
      setisLeave(false);
    }
  };
  const submitInsertLogTimeForm = () => {
    if (!projectId) {
      toast.error("please entert project Name");
    } else if (!taskId) {
      toast.error("please entert Task Name");
    } else if (!isLeave && !timeHours) {
      toast.error("please enter time");
    } else if (!descriptionComment) {
      toast.error("please enter description");
    } else if (timeHours && timeHours >= "16") {
      toast.error("Pleasr enter hours less than 16");
    }
    insertLogTime?.fetchInsertData(
      moment(selectedDate).format("DD/MMMM/YYYY"),
      projectId,
      taskId,
      timeHours,
      descriptionComment
    );
  };
  return (
    <>
      <body className="app">
        <ToastContainer />
        <main>
          <header>
            <div className="header">
              <div className="header-nav">
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  href="#"
                  aria-label="Settings"
                  className="btn-head"
                  data-toggle="modal"
                  data-target="#navModal"
                  onClick={() => localStorage.clear()}
                >
                  <i className="icon-setting"></i>
                </a>
                <a href="#" aria-label="Notifications" className="btn-head">
                  <i className="icon-bell"></i>
                </a>
              </div>
              <div className="header-info-block">
                <div className="header-info">
                  <h3>Hello,</h3>
                  <h3 className="mb-2">Robert</h3>
                  <p>Add your hours</p>
                </div>
                <div className="info-btn">
                  <button className="btn btn-md btn-outline borRad-16">
                    <i className="icon-plus"></i> Add
                  </button>
                </div>
              </div>
            </div>
          </header>

          <div className="main-wrapper">
            <div className="main-content">
              <div className="month-status">
                Leave Hrs: <span>16Hrs.</span> | Actual Hrs: <span>0Hrs.</span>{" "}
                | Total Hrs: <span>184Hrs.</span>
              </div>
              <div className="calendar-wrapper">
                <div className="calendar-block">
                  <div className="d-calendar">
                    <form action="#">
                      <div
                        id="inline_cal"
                        style={{ height: "70vh", cursor: "pointer" }}
                      >
                        <Calendar
                          selectable
                          localizer={localizer}
                          views={["month"]}
                          onSelectSlot={getDate}

                          //    events={myEventsList}
                          //    startAccessor="start"
                          //    endAccessor="end"
                          //    style={{ height: 500 }}
                        />
                      </div>
                    </form>
                  </div>
                  {/* <button className="btn btn-primary d-btn" data-toggle="modal" data-target="#bookMealModal">Quick Book a Meal</button>  */}
                </div>
                <div className="booked-meal">
                  <div className="d-date">
                    <span>Thursday</span> 30th March, 2023
                  </div>
                  <div className="info-txt">
                    <ul>
                      <li>
                        Hours entered for the day: <span>04:00 hours </span>
                      </li>
                      <li>
                        Hours remaining: <span>04:00 hours </span>
                      </li>
                    </ul>
                  </div>

                  <div className="booked-meal-wrapper">
                    {calendercardStore?.calenderDateDetails?.logTimes?.map(
                      (data: any, id) => {
                        return (
                          <div className="booked-meal-block" key={id}>
                            <div className="booked-meal-tp">
                              <div className="booked-meal-tp-lt">
                                <div className="task-title">
                                  Project Name: {data.project.name}
                                </div>
                                <div className="task-info">
                                  Task: {data.task.name}
                                </div>
                                <div className="task-spent-time">
                                  Time: 2 Hrs. 20mins
                                </div>
                                <div className="task-description"></div>
                              </div>
                              {data?.editable === true ? (
                                <div
                                  className="booked-meal-tp-rt"
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal"
                                >
                                  <button className="btn-head">
                                    <i className="icon-edit"></i>
                                  </button>
                                  <button className="btn-head">
                                    <i className="icon-trash"></i>
                                  </button>
                                </div>
                              ) : (
                                <div className="task-status booked-meal-tp-rt">
                                  <i className="icon-check"></i>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
              <div className="m-btn">
                <button
                  type="button"
                  className="btn btn-primary m-auto"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={userAddTask}
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </main>
        {/* <!-- Start Book meal Modal --> */}

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="myModalLabel2"
        >
          <div
            className="modal-dialog modal-dialog-centered"
            tabIndex={-1}
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <div className="back-btn-block justify-content-between">
                  <div className="d-flex align-items-center justify-content-start">
                    {/* <button
                      type="button"
                      className="close i-prev"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                    </button> */}
                    <h4 className="modal-title" id="exampleModal">
                      View / Update Time
                    </h4>
                  </div>
                  <div className="d-flex align-items-center justify-content-end">
                    <button
                      type="button"
                      className="close i-close ml-15"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Project</label>
                  <select
                    className="form-control"
                    id="exampleSelect1"
                    value={userAddTaskStore?.getAddTasklist?.project_id}
                    onChange={(e: any) => setProjectId(e.target.value)}
                  >
                    <option>Select Project</option>
                    {userAddTaskStore?.getAddTasklist?.map((option: any) => (
                      <option
                        key={option?.project_id}
                        value={option?.project_id}
                      >
                        {option?.project_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Task </label>
                  <select
                    className="form-control"
                    id="exampleSelect1"
                    onChange={gettaskID}
                    disabled={!projectId ? true : false}
                  >
                    <option>Select Task</option>
                    {taskArr?.map(
                      (option: any) => (
                        console.log("option", option),
                        (
                          <option value={option?.task_id}>
                            {option?.task_name}
                          </option>
                        )
                      )
                    )}
                  </select>
                </div>
                {/* <div className="form-group mb-0">
                  <label>Enter Time</label>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input
                          disabled={!projectId ? true : false}
                          className="form-control"
                          placeholder="HH"
                          type="number"
                          min={0}
                          step="1"
                          max={16}
                          maxLength={2}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setTimehours(Number(e.target.value))
                          }
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input
                          disabled={!projectId ? true : false}
                          type="number"
                          className="form-control"
                          placeholder="MM"
                          min={0}
                          // step="1"
                          max={59}
                          maxLength={2}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setTimeminute(Number(e.target.value))
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div> */}
                {isLeave ? (
                  <div className="form-group custom-radio">
                    <label>Select Leave Type</label>
                    <div className="radio-col">
                      <div className="radio-block">
                        <input
                          type="radio"
                          id="test1"
                          name="radio-group"
                          checked
                        />
                        <label htmlFor="test1" className="mr-0">
                          Full Day
                        </label>
                      </div>
                      <div className="radio-block">
                        <input
                          type="radio"
                          id="test2"
                          name="radio-group"
                          checked
                        />
                        <label htmlFor="test2" className="mr-0">
                          Half Day
                        </label>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="form-group mb-0">
                    <label>Enter Time</label>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <input
                            disabled={!projectId ? true : false}
                            className="form-control"
                            placeholder="HH"
                            type="number"
                            min={0}
                            step="1"
                            max="16"
                            maxLength={2}
                            onChange={setHours}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <input
                            disabled={!projectId ? true : false}
                            type="number"
                            className="form-control"
                            placeholder="MM"
                            min={0}
                            // step="1"
                            max={59}
                            maxLength={2}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              setTimeminute(Number(e.target.value))
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="form-group">
                  <label>Your Comments</label>
                  <textarea
                    disabled={!projectId ? true : false}
                    className="form-control"
                    id=""
                    rows={5}
                    onChange={(e) => setDescriptionComment(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-primary w-100 m-0"
                  type="submit"
                  onClick={submitInsertLogTimeForm}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>

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
                <div className="modal-body mb-4">
                  <div className="notification-wrapper">
                    <div className="notification-block">
                      <h4>Lorem Ipsum which looks reasonable</h4>
                      <p className="txt-sm">January 25, 2023</p>
                      <p>
                        Lorem ipsum is a placeholder text commonly used to
                        demonstrate visual form of a document.
                      </p>
                    </div>
                    <div className="notification-block">
                      <h4>Lorem Ipsum which looks reasonable</h4>
                      <p className="txt-sm">January 25, 2023</p>
                      <p>
                        Lorem ipsum is a placeholder text commonly used to
                        demonstrate visual form of a document.
                      </p>
                    </div>
                    <div className="notification-block">
                      <h4>Lorem Ipsum which looks reasonable</h4>
                      <p className="txt-sm">January 25, 2023</p>
                      <p>
                        Lorem ipsum is a placeholder text commonly used to
                        demonstrate visual form of a document.
                      </p>
                    </div>
                    <div className="notification-block">
                      <h4>Lorem Ipsum which looks reasonable</h4>
                      <p className="txt-sm">January 25, 2023</p>
                      <p>
                        Lorem ipsum is a placeholder text commonly used to
                        demonstrate visual form of a document.
                      </p>
                    </div>
                    <div className="notification-block">
                      <h4>Lorem Ipsum which looks reasonable</h4>
                      <p className="txt-sm">January 25, 2023</p>
                      <p>
                        Lorem ipsum is a placeholder text commonly used to
                        demonstrate visual form of a document.
                      </p>
                    </div>
                    <div className="notification-block">
                      <h4>Lorem Ipsum which looks reasonable</h4>
                      <p className="txt-sm">January 25, 2023</p>
                      <p>
                        Lorem ipsum is a placeholder text commonly used to
                        demonstrate visual form of a document.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal left-m fade"
            id="changePassModal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="myModalLabel2"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
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
                      Change Password
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
                <div className="modal-body">
                  <div className="change-password-block">
                    <div className="form-group">
                      <label>Current Password</label>
                      <input
                        className="form-control"
                        type="password"
                        placeholder="Enter"
                      />
                    </div>
                    <div className="form-group">
                      <label>New Password</label>
                      <input
                        className="form-control"
                        type="password"
                        placeholder="Enter"
                      />
                    </div>
                    <div className="form-group">
                      <label>Confirm Password</label>
                      <input
                        className="form-control"
                        type="password"
                        placeholder="Enter"
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    data-dismiss="modal"
                  >
                    Updated Password
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal left-m fade"
            id="aboutusModal"
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
                      About us
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
                <div className="modal-body mb-4">
                  <div className="txt-wrapper">
                    <p>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore
                      magna aliquyam erat, sed diam voluptua. At vero eos et
                      accusam et justo duo dolores et ea rebum. Stet clita kasd
                      gubergren, no sea takimata sanctus est Lorem ipsum dolor
                      sit amet. Lorem ipsum dolor sit amet, consetetur
                      sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                      ut labore et dolore magna aliquyam erat, sed diam
                      voluptua. At vero eos et accusam et justo duo dolores et
                      ea rebum. Stet clita kasd gubergren, no sea takimata
                      sanctus est Lorem ipsum dolor sit amet.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore
                      magna aliquyam erat, sed diam voluptua. At vero eos et
                      accusam et justo duo dolores et ea rebum. Stet clita kasd
                      gubergren, no sea takimata sanctus est Lorem ipsum dolor
                      sit amet. Lorem ipsum dolor sit amet, consetetur
                      sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                      ut labore et dolore magna aliquyam erat, sed diam
                      voluptua. At vero eos et accusam et justo duo dolores et
                      ea rebum. Stet clita kasd gubergren, no sea takimata
                      sanctus est Lorem ipsum dolor sit amet.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore
                      magna aliquyam erat, sed diam voluptua. At vero eos et
                      accusam et justo duo dolores et ea rebum. Stet clita kasd
                      gubergren, no sea takimata sanctus est Lorem ipsum dolor
                      sit amet. Lorem ipsum dolor sit amet, consetetur
                      sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                      ut labore et dolore magna aliquyam erat, sed diam
                      voluptua. At vero eos et accusam et justo duo dolores et
                      ea rebum. Stet clita kasd gubergren, no sea takimata
                      sanctus est Lorem ipsum dolor sit amet.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal left-m fade"
            id="TnCModal"
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
                      Terms & Conditions
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
                <div className="modal-body mb-4">
                  <div className="txt-wrapper">
                    <p>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore
                      magna aliquyam erat, sed diam voluptua. At vero eos et
                      accusam et justo duo dolores et ea rebum. Stet clita kasd
                      gubergren, no sea takimata sanctus est Lorem ipsum dolor
                      sit amet. Lorem ipsum dolor sit amet, consetetur
                      sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                      ut labore et dolore magna aliquyam erat, sed diam
                      voluptua. At vero eos et accusam et justo duo dolores et
                      ea rebum. Stet clita kasd gubergren, no sea takimata
                      sanctus est Lorem ipsum dolor sit amet.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore
                      magna aliquyam erat, sed diam voluptua. At vero eos et
                      accusam et justo duo dolores et ea rebum. Stet clita kasd
                      gubergren, no sea takimata sanctus est Lorem ipsum dolor
                      sit amet. Lorem ipsum dolor sit amet, consetetur
                      sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                      ut labore et dolore magna aliquyam erat, sed diam
                      voluptua. At vero eos et accusam et justo duo dolores et
                      ea rebum. Stet clita kasd gubergren, no sea takimata
                      sanctus est Lorem ipsum dolor sit amet.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore
                      magna aliquyam erat, sed diam voluptua. At vero eos et
                      accusam et justo duo dolores et ea rebum. Stet clita kasd
                      gubergren, no sea takimata sanctus est Lorem ipsum dolor
                      sit amet. Lorem ipsum dolor sit amet, consetetur
                      sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                      ut labore et dolore magna aliquyam erat, sed diam
                      voluptua. At vero eos et accusam et justo duo dolores et
                      ea rebum. Stet clita kasd gubergren, no sea takimata
                      sanctus est Lorem ipsum dolor sit amet.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal left-m fade"
            id="privacyPolicyModal"
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
                      Privacy Policy
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
                <div className="modal-body mb-4">
                  <div className="txt-wrapper">
                    <p>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore
                      magna aliquyam erat, sed diam voluptua. At vero eos et
                      accusam et justo duo dolores et ea rebum. Stet clita kasd
                      gubergren, no sea takimata sanctus est Lorem ipsum dolor
                      sit amet. Lorem ipsum dolor sit amet, consetetur
                      sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                      ut labore et dolore magna aliquyam erat, sed diam
                      voluptua. At vero eos et accusam et justo duo dolores et
                      ea rebum. Stet clita kasd gubergren, no sea takimata
                      sanctus est Lorem ipsum dolor sit amet.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore
                      magna aliquyam erat, sed diam voluptua. At vero eos et
                      accusam et justo duo dolores et ea rebum. Stet clita kasd
                      gubergren, no sea takimata sanctus est Lorem ipsum dolor
                      sit amet. Lorem ipsum dolor sit amet, consetetur
                      sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                      ut labore et dolore magna aliquyam erat, sed diam
                      voluptua. At vero eos et accusam et justo duo dolores et
                      ea rebum. Stet clita kasd gubergren, no sea takimata
                      sanctus est Lorem ipsum dolor sit amet.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore
                      magna aliquyam erat, sed diam voluptua. At vero eos et
                      accusam et justo duo dolores et ea rebum. Stet clita kasd
                      gubergren, no sea takimata sanctus est Lorem ipsum dolor
                      sit amet. Lorem ipsum dolor sit amet, consetetur
                      sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                      ut labore et dolore magna aliquyam erat, sed diam
                      voluptua. At vero eos et accusam et justo duo dolores et
                      ea rebum. Stet clita kasd gubergren, no sea takimata
                      sanctus est Lorem ipsum dolor sit amet.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="scanCodeModal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div
              className="modal-dialog modal-dialog-centered code-wrapper modal-md"
              role="document"
            >
              <div className="modal-content code-wrapper">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Scan Code
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body text-center">
                  <div className="code-block">
                    <div className="code-img">
                      <img src="images/code.svg" alt="" />
                    </div>
                    <p>Is this whom you mean?</p>
                    <h3>Robert Ronald</h3>
                    <h4>2810</h4>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-lg borRad-19"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-lg borRad-19"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="redeemedModal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div
              className="modal-dialog modal-dialog-centered modal-sm status-modal"
              role="document"
            >
              <div className="modal-content status-modal">
                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="coupon-status">
                    <img
                      src="images/successfully.svg"
                      alt="Booked Successfully"
                    />
                    <h5>Coupon Redeemed Successfully</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="notRedeemedModal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div
              className="modal-dialog modal-dialog-centered modal-sm status-modal"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="coupon-status">
                    <img src="images/not-booked.svg" alt="Not Booked" />
                    <h5>Meal is Not Booked</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <div className="back-btn-block justify-content-between">
                  <div className="d-flex align-items-center justify-content-start">
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
                      View / Update Time
                    </h4>
                  </div>
                  <div className="d-flex align-items-center justify-content-end">
                    <button
                      type="button"
                      className="close i-close ml-15"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Project</label>
                  <select className="form-control" id="exampleSelect1">
                    <option>Select Project</option>
                    <option>Option 2 </option>
                    <option>Option 3</option>
                    <option>Option 4</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Task</label>
                  <select className="form-control" id="exampleSelect1">
                    <option>Select Task</option>
                    <option>Option 2 </option>
                    <option>Option 3</option>
                    <option>Option 4</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="control-label">Select Days</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="01-01-2023, 02-01-2023, 03-01-2023......"
                      id="demoDate"
                    />
                    <div className="input-group-append">
                      <span className="input-group-text bg-transparent" id="">
                        <i className="icon-calendar"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="form-group mb-0">
                  <label>Enter Time</label>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input
                          className="form-control"
                          placeholder="HH"
                          type="number"
                          min="0"
                          step="1"
                          maxLength={2}
                          id="hour"
                          //   onChange={inputhandleChange("hour")}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="MM"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group custom-radio">
                  <label>Select Leave Type</label>
                  <div className="radio-col">
                    <div className="radio-block">
                      <input
                        type="radio"
                        id="test1"
                        name="radio-group"
                        checked
                      />
                      <label htmlFor="test1" className="mr-0">
                        Full Day
                      </label>
                    </div>
                    <div className="radio-block">
                      <input
                        type="radio"
                        id="test2"
                        name="radio-group"
                        checked
                      />
                      <label htmlFor="test2" className="mr-0">
                        Half Day
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Your Comments</label>
                  <textarea className="form-control" id="" rows={5}></textarea>
                </div>
                <div className="form-group mb-0 mt-3">
                  <label className="custom-checkbox mb-0">
                    <span className="checkbox__title">Remember Me</span>
                    <input className="checkbox__input" type="checkbox" />
                    <span className="checkbox__checkmark"></span>
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary w-100 m-0" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </body>
    </>
  );
}
export default observer(CalendarCard);
