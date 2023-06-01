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
  const {
    rootStore: { calendercardStore, userAddTaskStore, insertLogTime },
  } = useStore();
  const [selectedDate, setSelactedDate] = useState<any>(new Date());
  const [projectId, setProjectId] = useState<string | undefined>();
  const [taskArr, setTaskArr] = useState<any>([]);
  const [taskId, setTaskId] = useState<string>();
  const [logId, setLogId] = useState<string>();
  const [minute, setMinute] = useState<number>();
  const [hour, setHour] = useState<string>("");
  // const [dataObj, setdatObj] = useState<any>({});
  const [isLeave, setisLeave] = useState<boolean>(false);
  const [isEdit, setisEdit] = useState<boolean>(false);
  // const [loading ,setLoading] = useState(false)
  const [descriptionComment, setDescriptionComment] = useState<
    string | undefined
  >("");
 console.log("testing")
  // console.log(userAddTaskStore?.getAddTasklist?.Project_task, "leave--->");
  const getDate = async (e: any) => {
    await calendercardStore.fetchcalenderCardData(
      moment(e.start).format("DD/MMMM/YYYY")
    );
    setSelactedDate(e.start);
  };

  const userAddTask = () => {
    resetForm()
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
  }, [ navigate]);

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
  function resetForm (){
    setProjectId("")
    setTaskId("")
    setMinute(0)
    setHour("")
    setDescriptionComment("")
  }
  const submitInsertLogTimeForm = async () => {

    if (!projectId) {
      toast.error("Please Enter Troject Name");
    } else if (!taskId) {
      toast.error("Please Enter Task Name");
    } else if (!isLeave &&  (!hour && !minute)) {
      toast.error("Please Enter Time ");
    } else if (Number(hour) && Number(hour) >= 16) {
      toast.error("Please enter hours less than 16");
    } else if (Number(minute) && Number(minute) >= 59 && minute === null) {
      toast.error("Please enter minute less than 59");
    } else if (Number(hour) <= -1) {
      toast.error("Please enter positive number in hrs");
    } else if (Number(minute) <= -1) {
      toast.error("Please enter Positive number in min");
    } else if (!descriptionComment) {
      toast.error("please enter description");
    } else {
      const formattedTime = `${hour}:${minute ? minute : "00"}`;
      // setdatObj({
      //       date:moment(selectedDate).format("DD/MMMM/YYYY"),
      //       project_id:projectId,
      //       task_id:taskId,
      //       hours:formattedTime,
      //       description:descriptionComment
      //   } )
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
      if(isEdit){
        toast.success("Updated SuccesFully")
        calendercardStore.fetchcalenderCardData(
          moment(selectedDate).format("DD/MMMM/YYYY")
        );
        setisEdit(false)
      }else{
        toast.success("Added SuccesFully")
        calendercardStore.fetchcalenderCardData(
          moment(selectedDate).format("DD/MMMM/YYYY")
        );
      }
      resetForm()
    }
  };

  const editTask = async (e, data: any) => {
    console.log("data?.total_hours?.toString().split('.')[0]",data?.total_hours?.toString().split('.'))
    setisEdit(true);
    setProjectId(data?.project_id);
    setTaskId(data?.task_id);
    console.log(hour,minute, "hour")
    setHour(data?.total_hours?.toString().split('.')[0]);
    setMinute((data?.total_hours?.toString().split('.')[1])/100*60);
    setDescriptionComment(data?.descriptionComment);
    setLogId(data?.log_id.toString());
    // const formattedTime = `${hour}:${minute}`;
  };

  const deleteTask = async (data: any) => {
    try {
      await calendercardStore.fetchDeletetask(data?.log_id.toString());
      console.log(calendercardStore?.deleteuserTask, "KKK");
      await calendercardStore.fetchcalenderCardData(
        moment(selectedDate).format("DD/MMMM/YYYY")
      );
      if (calendercardStore?.deleteuserTask?.status === "Success") {
        toast.success("Task Delete Successfully");
      }

    } catch {
      toast.error("someting went wrong");
    }
  };


  const DayHours= Number(calendercardStore?.calenderDateDetails?.month?.logTimeTotal.toFixed(2));
  const remHours= 480-DayHours*60
  const dayHours=(calendercardStore?.calenderDateDetails?.month?.logTimeTotal)?.toFixed(2);
  const decimalIndex =Number(dayHours?.toString().indexOf("."));
  const decimal =Math.trunc((Number(dayHours?.toString().substring(decimalIndex+1))*60)/100);
  const decimalPart=('0'+decimal.toString()).slice(-2)
  const integer= Math.trunc(Number(dayHours));
  const integerPart=('0'+integer).slice(-2)
  const totalMin=integer*60+decimal
  const remTime= 480-totalMin;
  const remHour=Math.trunc(Number((remTime/60)));
  const remMin= (remTime%60).toString()
  const value=('0'+remMin).slice(-2)


  return (
    <>
      <body className="app">
        <ToastContainer />
        <main className="loader">
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
                Leave Hrs: <span>{calendercardStore?.calenderDateDetails?.month?.logTimeTotalLeave.toFixed(2)} Hrs. </span> | Actual Hrs: <span>{calendercardStore?.calenderDateDetails?.month?.logTimeTotal.toFixed(2)} Hrs.</span>{" "}
                | Total Hrs: <span>{calendercardStore?.calenderDateDetails?.month?.total_month_hrs.toFixed(2)} Hrs.</span>
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
                  <span>{moment(selectedDate).format("dddd")}</span> {moment(selectedDate).format("Do MMMM, YYYY")}
                  </div>
                  <div className="info-txt">
                    <ul>
                      <li>
                        Hours entered for the day:  <span>{integerPart}:{decimalPart} hours </span>
                      </li>
                      <li>
                        Hours remaining: {totalMin>=480?<span> 00:00 hours </span>:<span> {remHour}:{value} hours </span>}
                      </li>
                    </ul>
                  </div>
             {/* --------------------- Print List logDetails --------------- */}
                  <div className="booked-meal-wrapper">
                    {calendercardStore?.calenderDateDetails?.logTimes?.slice().reverse().map(
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
                                  Time: {data?.total_hours} hour{" "}
                                  {/* {data?.total_hours} min */}
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
                                    onClick={() => deleteTask(data)}
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
                          // onChange={(e:any) => setSelectLeave(...selectLeave,[fullDay:e.target.value])}
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
                            onChange={(e) => setHour(e.target.value)}
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
                            value={Math.trunc(Number(minute))}
                            maxLength={2}
                            onChange={(e) => setMinute(Number(e.target.value))}
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
      </body>
    </>
  );
}
export default observer(CalendarCard);
