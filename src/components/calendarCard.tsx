import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStore } from "../Hooks/useStore";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const localizer = momentLocalizer(moment);

function CalendarCard() {
  const navigate = useNavigate();
  const {
    rootStore: { calendercardStore, userAddTaskStore, insertLogTime },
  } = useStore();
  const [selectedDate, setSelactedDate] = useState<any>(new Date());
  const [projectId, setProjectId] = useState<string | undefined>();
  const [taskArr, setTaskArr] = useState<any>([]);
  const [taskId, setTaskId] = useState<string>();
  const [logId, setLogId] = useState<string>();
  const [minute, setMinute] = useState<number>();
  const [hour, setHour] = useState<number>();
  const [isMinute, setIsMinute] = useState<boolean>(false);
  // const [dataObj, setdatObj] = useState<any>({});
  const [isLeave, setisLeave] = useState<boolean>(false);
  const [isEdit, setisEdit] = useState<boolean>(false);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  // const [loading ,setLoading] = useState(false)
  const [descriptionComment, setDescriptionComment] = useState<
    string | undefined
  >("");

  // console.log(userAddTaskStore?.getAddTasklist?.Project_task, "leave--->");
  const getDate = async (e: any) => {
    await calendercardStore.fetchcalenderCardData(
      moment(e.start).format("DD/MMMM/YYYY")
    );
    setSelactedDate(e.start);
  };

  console.log("isDeleteModal", isMinute);
  const userAddTask = () => {
    resetForm();
    userAddTaskStore.fetchcalenderCardData(
      moment(selectedDate).format("DD/MMMM/YYYY")
    );
  };
  useEffect(() => {
    console.log("1");
    const tempArr = userAddTaskStore?.getAddTasklist?.filter((item: any) => {
      return item.project_id === Number(projectId);
    });
    setTaskArr(
      Object.values(tempArr?.[0] ? tempArr?.[0].project_task?.[0] : [])
    );
  }, [projectId]);
  useEffect(() => {
    console.log("2");
    if (localStorage.getItem("token")) {
      navigate("/calender");
    } else {
      navigate("/");
    }
    calendercardStore.fetchcalenderCardData(
      moment(selectedDate).format("DD/MMMM/YYYY")
    );
    userAddTaskStore.fetchcalenderCardData(
      moment(selectedDate).format("DD/MMMM/YYYY")
    );
  }, [navigate]);

  const gettaskID = (e: any) => {
    console.log("3");
    setTaskId(e.target.value);
    const name = taskArr.filter((item: any) => {
      return item.task_id == e.target.value;
    });
    if (name[0].task_name === "Leave") {
      console.log("true");
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
    console.log("hours", hour, minute);
    if (!projectId) {
      toast.error("please entert project Name");
    } else if (!taskId) {
      toast.error("please entert Task Name");
    } else if (!isLeave && !hour && !minute) {
      toast.error("please enter time ");
    } else if (Number(hour) && Number(hour) >= 16) {
      toast.error("Pleas enter hours less than 16");
    } else if (Number(minute) && Number(minute) >= 59 && minute === null) {
      toast.error("Pleas enter minute less than 59");
    } else if (Number(hour) <= -1) {
      toast.error("Pleasr enter Positive number in hrs");
    } else if (Number(minute) <= -1) {
      toast.error("Pleasr enter Positive number in min");
    } else if (!descriptionComment) {
      toast.error("please enter description");
    } else {
      const formattedTime = `${hour}:${minute ? minute : "00"}`;
      console.log("formattedTime", formattedTime);
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
      if (isEdit) {
        toast.success("Task Updated successfully");
        calendercardStore.fetchcalenderCardData(
          moment(selectedDate).format("DD/MMMM/YYYY")
        );
        setisEdit(false);
      } else {
        toast.success("Task Added successfully");
        calendercardStore.fetchcalenderCardData(
          moment(selectedDate).format("DD/MMMM/YYYY")
        );
      }
      resetForm();
    }
  };

  const editTask = async (e, data: any) => {
    console.log(
      "data?.total_hours?.toString().split('.')[0]",
      data?.total_hours?.toString().split(".")
    );
    setisEdit(true);
    setProjectId(data?.project_id);
    setTaskId(data?.task_id);
    setHour(data?.total_hours?.toString().split(".")[0]);
    setMinute((data?.total_hours?.toString().split(".")[1] / 100) * 60);
    setDescriptionComment(data?.descriptionComment);
    setLogId(data?.log_id.toString());
    // const formattedTime = `${hour}:${minute}`;
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
  const DayHours = Number(
    calendercardStore?.calenderDateDetails?.month?.logTimeTotal.toFixed(2)
  );

  // const remHours = 480 - DayHours * 60;

  const dayHours = calendercardStore?.calenderDateDetails?.month?.logTimeTotal?.toFixed(2);
  const decimalIndex = Number(dayHours?.toString().indexOf("."));
  const decimal = Math.trunc(
    (Number(dayHours?.toString().substring(decimalIndex + 1)) * 60) / 100
  );
  const decimalPart = ("0" + decimal.toString()).slice(-2);
  const integer = Math.trunc(Number(dayHours));
  const integerPart = ("0" + integer).slice(-2);
  const totalMin = integer * 60 + decimal;
  const remTime = 480 - totalMin;
  const remHour = Math.trunc(Number(remTime / 60));
  const remMin = (remTime % 60).toString();
  const value = ("0" + remMin).slice(-2);
  return (
    <>
      <body className="app">
        <ToastContainer autoClose={1500}/>
        <main className="loader">
          <header>
            <div className="header">
              <div className="header-nav">
                <a
                  href="#"
                  aria-label="Settings"
                  className="btn-head"
                  // onClick={() => localStorage.clear()}
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
                Leave Hrs:{" "}
                <span>
                  {calendercardStore?.calenderDateDetails?.month?.logTimeTotalLeave.toFixed(
                    2
                  )}{" "}
                  Hrs.{" "}
                </span>{" "}
                | Actual Hrs:{" "}
                <span>
                  {calendercardStore?.calenderDateDetails?.month?.logTimeTotal.toFixed(
                    2
                  )}{" "}
                  Hrs.
                </span>{" "}
                | Total Hrs:{" "}
                <span>
                  {calendercardStore?.calenderDateDetails?.month?.total_month_hrs.toFixed(
                    2
                  )}{" "}
                  Hrs.
                </span>
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
                    <span> {moment(selectedDate).format("DD MMMM YYYY")}</span>
                  </div>
                  <div className="info-txt">
                    <ul>
                      <li>
                        Hours entered for the day:{" "}
                        <span>
                          {integerPart}:{decimalPart} hours{" "}
                        </span>
                      </li>
                      <li>
                        Hours remaining:{" "}
                        {totalMin >= 480 ? (
                          <span> 00:00 hours </span>
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
                                <div className="task-spent-time">
                                  Time:{" "}
                                  {data?.total_hours?.toString().split(".")[0]}{" "}
                                  hour{" "}
                                  {data?.total_hours?.toString().split(".")[1]
                                    ? (
                                        (data?.total_hours
                                          ?.toString()
                                          .split(".")[1] /
                                          100) *
                                        60
                                      ).toFixed()
                                    : 0}{" "}
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
                                    <button
                                      className="btn-head"
                                      onClick={(e: any) => editTask(e, data)}
                                    >
                                      <i className="icon-edit"></i>
                                    </button>
                                  </div>
                                  <button
                                    className="btn-head"
                                    onClick={() => (
                                      setIsDeleteModal(true),
                                      setLogId(data?.log_id)
                                    )}
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
        {/* <!-- Add Task --> */}

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
                      console.log("e.target.value", e.target.value),
                      setProjectId(e.target.value),
                      setisLeave(false)
                    )}
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
                          onChange={() => setHour(8)}
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
                          onChange={() => setHour(4)}
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
                            onChange={(e) =>
                              setHour(
                                Number(
                                  Number(e.target.value) >= 16
                                    ? 0
                                    : e.target.value
                                )
                              )
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
                            max={59}
                            value={Math.trunc(Number(minute))}
                            maxLength={2}
                            onChange={(e) =>
                              setMinute(
                                Number(
                                  Number(e.target.value) >= 59
                                    ? setIsMinute(true)
                                    : (e.target.value)
                                )
                              )
                            }
                          />
                        </div>
                      </div>
                      {isMinute ? <p style={{color:"red"}}>please enter valid value</p> : ""}
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
          <div className="modal-dialog">
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
      </body>
    </>
  );
}
export default observer(CalendarCard);
