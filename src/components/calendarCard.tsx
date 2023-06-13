import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStore } from "../Hooks/useStore";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/style.css";
import { CACHE_DYNAMIC_CONTENT } from "../App";
import Loader from "./Loader";
const localizer = momentLocalizer(moment);

function CalendarCard() {
  const navigate = useNavigate();
  const {
    rootStore: {
      calendercardStore,
      userAddTaskStore,
      insertLogTime,
      loginStore,
    },
  } = useStore();
  const [selectedDate, setSelactedDate] = useState<any>(new Date());
  const [projectId, setProjectId] = useState<string | undefined>();
  const [taskArr, setTaskArr] = useState<any>([]);
  const [taskId, setTaskId] = useState<string>();
  const [logId, setLogId] = useState<string>();
  const [minute, setMinute] = useState<number>();
  const [hour, setHour] = useState<number>();
  const [isLeave, setisLeave] = useState<boolean>(false);
  const [isEdit, setisEdit] = useState<boolean>(false);
  const [errorHandlehour, setErrorHour] = useState("");
  const [errorHandleminute, setErrorhandleminute] = useState("");

  const [descriptionComment, setDescriptionComment] = useState<
    string | undefined
  >("");
  const [loader, setLoader] = useState<boolean>(true);

  const getDate = async (e: any) => {
    await calendercardStore.fetchcalenderCardData(
      moment(e.start).format("DD/MMMM/YYYY")
    );
    setSelactedDate(e.start);
  };

  const userAddTask = () => {
    resetForm();
    userAddTaskStore.fetchcalenderCardData(
      moment(selectedDate).format("DD/MMMM/YYYY")
    );
  };
  useEffect(() => {
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
    setTimeout(() => {
      setLoader(false);
    }, 3000);

    calendercardStore.fetchcalenderCardData(
      moment(selectedDate).format("DD/MMMM/YYYY")
    );
    userAddTaskStore.fetchcalenderCardData(
      moment(selectedDate).format("DD/MMMM/YYYY")
    );
  }, [navigate]);

  const gettaskID = (e: any) => {
    setTaskId(e.target.value);
    const name = taskArr.filter((item: any) => {
      return item.task_id == e.target.value;
    });
    if (name[0].task_name === "Leave") {
      setisLeave(true);
    } else {
      setisLeave(false);
    }
    calendercardStore.fetchcalenderCardData(
      moment(new Date()).format("DD/MMMM/YYYY")
    );
  };
  function resetForm() {
    setProjectId("");
    setTaskId("");
    setMinute(0);
    setHour(0);
    setDescriptionComment("");
    setisLeave(false);
  }
  const submitInsertLogTimeForm = async () => {
    if (!projectId) {
      toast.error("please entert project Name");
    } else if (!taskId) {
      toast.error("please entert Task Name");
    } else if (!isLeave && !hour && !minute) {
      toast.error("please enter time ");
    } else if (!descriptionComment) {
      toast.error("please enter description");
    } else {
      var formattedTime;
      if (
        calendercardStore?.calenderDateDetails?.day?.total_day_hours ===
          "8.5" &&
        isLeave
      ) {
        formattedTime = hour?.toString().replace(".", ":");
      } else {
        formattedTime = `${hour}:${minute ? minute : "00"}`;
      }
      var temObj = {};
      isEdit
        ? (temObj = {
            date: moment(selectedDate).format("DD/MMMM/YYYY"),
            project_id: projectId,
            task_id: taskId,
            hours: formattedTime,
            description: descriptionComment,
            log_id: logId,
          })
        : (temObj = {
            date: moment(selectedDate).format("DD/MMMM/YYYY"),
            project_id: projectId,
            task_id: taskId,
            hours: formattedTime,
            description: descriptionComment,
          });
      await insertLogTime?.fetchInsertData(temObj);
      if (isLeave) {
        toast.success("You apply for Leave");

        calendercardStore.fetchcalenderCardData(
          moment(selectedDate).format("DD/MMMM/YYYY")
        );
      } else if (isEdit) {
        toast.success("Task Updated successfully");
        calendercardStore.fetchcalenderCardData(
          moment(selectedDate).format("DD/MMMM/YYYY")
        );
        setisEdit(false);
      } else {
         toast.success("Task Add successfully");
        calendercardStore.fetchcalenderCardData(
          moment(selectedDate).format("DD/MMMM/YYYY")
        );
      }
      resetForm();
    }
  };

  const handleHour = (e) => {
    if (e.target.value >= 16) {
      setMinute(0);
    }
    setHour(Number(Number(e.target.value) > 16 ? 0 : e.target.value));
    if (e.target.value > 16) {
      setErrorHour("Maximum value of hour should be 16");
    } else {
      setErrorHour("");
    }
  };

  const handleMinute = (e) => {
    setMinute(Number(Number(e.target.value) > 59 ? 0 : e.target.value));
    if (e.target.value > 59) {
      setErrorhandleminute("Maximum value of minute should be 59");
    } else {
      setErrorhandleminute("");
    }
  };
  const editTask = async (e, data: any) => {
    setisEdit(true);
    setProjectId(data?.project_id);
    setTaskId(data?.task_id);
    setHour(data?.total_hours?.toString().split(":")[0]);
    setMinute(
      data?.total_hours?.toString().split(":")[1]
        ? data?.total_hours?.toString().split(":")[1]
        : 0
    );
    setDescriptionComment(data?.description);
    setLogId(data?.log_id.toString());
  };

  const deleteTask = async () => {
    await calendercardStore.fetchDeletetask(logId);
    if (calendercardStore?.deleteuserTask?.status == "Success") {
      toast.success("Task Delete Successfully");
      await calendercardStore.fetchcalenderCardData(
        moment(selectedDate).format("DD/MMMM/YYYY")
      );
    }
  };

  const dayHours = calendercardStore?.calenderDateDetails?.day?.logTimeTotalDay;
  const decimalIndex = Number(dayHours?.toString()?.indexOf(":"));
  const decimal = Number(dayHours?.toString()?.substring(decimalIndex + 1));
  const decimalPart = ("0" + decimal.toString()).slice(-2);
  const integerPart = Number(dayHours?.toString().substring(0, decimalIndex));
  const totalMin = integerPart * 60 + Number(decimalPart);
  const remTime =
    calendercardStore?.calenderDateDetails?.day?.total_day_hours === "8.5"
      ? 990 - totalMin
      : 960 - totalMin;
  const remHour = Math.trunc(Number(remTime / 60));
  const remMin = (remTime % 60).toString();
  const value = ("0" + remMin).slice(-2);

  //--------LogOut Function -----------
  function clearCache() {
    localStorage.clear();
    caches.open(CACHE_DYNAMIC_CONTENT).then((cache) => {
      cache.delete("isLoggedIn");
      cache.delete("credentials");
      cache.delete("pinValue");
      navigate("/");
    });
  }
  return (
    <>
      <body className="app">
        <ToastContainer autoClose={1500} />
        {loader ? (
          <Loader></Loader>
        ) : (
          <>
            <main className="loader">
              <header>
                <div className="header">
                  <div className="header-nav">
                    <a
                      href="#"
                      aria-label="Settings"
                      className="btn-head"
                      data-bs-toggle="modal"
                      data-bs-target="#navModal"
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
                      <h3 className="mb-2">
                        {loginStore?.userDetails?.data?.user?.name}
                      </h3>
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
              {/* <Sidebar open={open}/> */}
              <div className="main-wrapper">
                <div className="main-content">
                  <div className="month-status">
                    Leave Hrs:{" "}
                    <span>
                      {
                        calendercardStore?.calenderDateDetails?.month
                          ?.logTimeTotalLeave
                      }{" "}
                      Hrs.{" "}
                    </span>{" "}
                    | Actual Hrs:{" "}
                    <span>
                      {
                        calendercardStore?.calenderDateDetails?.month
                          ?.logTimeTotal
                      }{" "}
                      Hrs.
                    </span>{" "}
                    | Total Hrs:{" "}
                    <span>
                      {
                        calendercardStore?.calenderDateDetails?.month
                          ?.total_month_hrs
                      }{" "}
                      Hrs.
                    </span>
                  </div>
                  <div className="calendar-wrapper">
                    <div className="calendar-block">
                      <div className="d-calendar">
                        <form action="#">
                          {/* <div
                        id="inline  " 
                        style={{ height: "70vh", cursor: "pointer" }}
                      > */}
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
                          {/* </div> */}
                        </form>
                      </div>
                    </div>
                    <div className="booked-meal">
                      <div className="d-date">
                        <span>
                          {" "}
                          {moment(selectedDate).format("DD MMMM YYYY")}
                        </span>
                      </div>
                      <div className="info-txt">
                        <ul>
                          <li>
                            <span> Hours entered for the day: </span>{" "}
                            <span>
                              {" "}
                              {
                                calendercardStore?.calenderDateDetails?.day
                                  ?.logTimeTotalDay
                              }{" "}
                              hours{" "}
                            </span>
                          </li>
                          <li>
                            <span>Hours remaining: </span>{" "}
                            {totalMin >= 960 ? (
                              <span> hours </span>
                            ) : (
                              <span>
                                {" "}
                                {remHour}:{value} hours{" "}
                              </span>
                            )}
                          </li>
                        </ul>
                      </div>
                      {/* --------------------- Print List logDetails --------------- */}
                      <div className="booked-meal-wrapper">
                        {calendercardStore?.calenderDateDetails?.logTimes
                          ?.slice()
                          .reverse()
                          .map((data: any, id) => {
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
                                    <div className="task-info">
                                      Description: {data?.description}
                                    </div>
                                    <div className="task-spent-time">
                                      Time:{" "}
                                      {
                                        data?.total_hours
                                          ?.toString()
                                          .split(":")[0]
                                      }{" "}
                                      hour{" "}
                                      {
                                        data?.total_hours
                                          ?.toString()
                                          .split(":")[1]
                                      }{" "}
                                      mins
                                    </div>
                                    <div className="task-description"></div>
                                  </div>
                                  {data?.editable === true ? (
                                    <>
                                      <div
                                        className="booked-meal-tp-rt"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                      >
                                        {data.task.name === "Leave" ? (
                                          ""
                                        ) : (
                                          <button
                                            className="btn-head"
                                            onClick={(e: any) =>
                                              editTask(e, data)
                                            }
                                          >
                                            <i className="icon-edit"></i>
                                          </button>
                                        )}
                                      </div>
                                      <button
                                        className="btn-head"
                                        onClick={() => setLogId(data?.log_id)}
                                        data-bs-toggle="modal"
                                        data-bs-target="#deleteModal"
                                      >
                                        <i className="icon-trash"></i>
                                      </button>
                                    </>
                                  ) : (
                                    <div className="task-status booked-meal-tp-rt">
                                      <i className="icon-check"></i>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                  <div className="m-btn">
                    <button
                      type="button"
                      className="btn btn-primary m-auto btn-bt"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={userAddTask}
                      disabled={
                        calendercardStore?.calenderDateDetails?.day
                          ?.total_day_leave_hours === "8:5"
                          ? true
                          : false
                      }
                    >
                      Add Task
                    </button>
                  </div>
                </div>
              </div>
            </main>
            {/* <!-- Add Task --> */}

            <div
              className="modal fade"
              id="exampleModal"
              tabIndex={-1}
              role="dialog"
              aria-labelledby="myModalLabel2"
            >
              <div
                className="modal-dialog modal-dialog-centered lite-modal"
                tabIndex={-1}
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <div className="back-btn-block justify-content-between w-100">
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
                          data-bs-dismiss="modal"
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
                        value={projectId}
                        onChange={(e: any) => (
                          setProjectId(e.target.value), setisLeave(false)
                        )}
                      >
                        <option>Select Project</option>
                        {userAddTaskStore?.getAddTasklist?.map(
                          (option: any) => (
                            <option
                              key={option?.project_id}
                              value={option?.project_id}
                            >
                              {option?.project_name}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Task </label>
                      <select
                        className="form-control"
                        id="exampleSelect1"
                        onChange={gettaskID}
                        disabled={!projectId ? true : false}
                        value={taskId}
                      >
                        <option>Select Task</option>
                        {taskArr?.map((option: any) => (
                          <option value={option?.task_id}>
                            {option?.task_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {isLeave === true ? (
                      <div className="form-group custom-radio">
                        <label>Select Leave Type</label>
                        <div className="radio-col">
                          <div className="radio-block">
                            <input
                              type="radio"
                              id="test1"
                              name="radio-group"
                              // checked={hour && hour > "4"}
                              value={8}
                              onChange={() =>
                                calendercardStore?.calenderDateDetails?.day
                                  ?.total_day_hours === "8:30"
                                  ? setHour(8.5)
                                  : setHour(8)
                              }
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
                              // checked={hour && hour < 4}
                              value={4}
                              onChange={() =>
                                calendercardStore?.calenderDateDetails?.day
                                  ?.total_day_hours === "8:30"
                                  ? setHour(4.5)
                                  : setHour(4)
                              }
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
                                value={hour}
                                onChange={handleHour}
                              />
                              <span style={{ color: "red" }}>
                                {errorHandlehour}
                              </span>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group">
                              <input
                                disabled={
                                  !projectId || (hour && hour >= 16)
                                    ? true
                                    : false
                                }
                                type="number"
                                className="form-control"
                                placeholder="MM"
                                min={0}
                                max={59}
                                value={Math.trunc(Number(minute))}
                                maxLength={2}
                                onChange={handleMinute}
                              />
                              <span style={{ color: "red" }}>
                                {errorHandleminute}
                              </span>
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
                        value={descriptionComment}
                      ></textarea>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-primary w-100 m-0"
                      type="submit"
                      onClick={submitInsertLogTimeForm}
                      data-bs-dismiss="modal"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* delete modal */}
            {/* {isDeleteModal ? 
        <div id="custom-modal-container">
          <div id="custom-modal">
            <span id="custom-modal-message"></span>
            <div>
              <button id="custom-modal-button-positive"></button>
              <button id="custom-modal-button-negative"></button>
            </div>
          </div>
        </div> :""} */}

            <div
              className="modal fade"
              id="deleteModal"
              tabIndex={-1}
              role="dialog"
              aria-labelledby="deleteModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog lite-modal">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Confirm Delete
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <span
                        aria-hidden="true"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        &times;
                      </span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p>Are you sure you want to delete?</p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      id="close-modal"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={deleteTask}
                    >
                      Confirm
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
                        data-bs-dismiss="modal"
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
                    <div
                      className="logout-block"
                      data-bs-dismiss="modal"
                      onClick={clearCache}
                    >
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
            </div>
          </>
        )}
      </body>
    </>
  );
}
export default observer(CalendarCard);
