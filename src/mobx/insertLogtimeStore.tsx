import axios from "axios";
import { action, makeObservable, observable } from "mobx";
import { IRootStore } from "./RootStore";
import { InsertLogtime } from "../helperInterface/InsertLoginterface";

export class InsertlogTime {
  fetchCalendeUpdatedetail(arg0: string, projectId: number | undefined, taskId: string | undefined, formattedTime: string, descriptionComment: string | undefined) {
    throw new Error("Method not implemented.");
  }
  rootStore: IRootStore;
  userInsertLogtime: InsertLogtime | undefined;
  constructor(rootStore: IRootStore) {
    makeObservable(this, {
      userInsertLogtime: observable,
      fetchInsertData: action,
    });
    this.rootStore = rootStore;
  }
  async fetchInsertData(
    data: any
  ) {
    const token: any = localStorage.getItem("token");
    // const getData = {
    //     date:date,
    //     project_id:projectId,
    //     task_id:taskId,
    //     hours:hours,
    //     description:description
    // }
    console.log("data",data)
    const getLogsTime = await axios.post(
      `https://r360-dev-services.rishabhsoft.com/api/lite/InsertLogTime`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(data, "getdata");
    this.userInsertLogtime = getLogsTime.data;
  }

  // async fetchUpdateData(
  //   date: string | undefined,
  //   projectId: number | undefined,
  //   taskId: string | undefined,
  //   hours: string | undefined,
  //   description: string | undefined,
  //   logId: string | undefined
  // ) {
  //   console.log("log_id",logId)
  //   const token: any = localStorage.getItem("token");
  //   const getData = {
  //       date:date,
  //       project_id:projectId,
  //       task_id:taskId,
  //       hours:hours,
  //       description:description,
  //       log_id:logId
  //   }
  //   const getLogsTime = await axios.post(
  //     `https://r360-dev-services.rishabhsoft.com/api/lite/InsertLogTime`,
  //     getData,
  //     { headers: { Authorization: `Bearer ${token}` } }
  //   );
  //   console.log(getData, "getdata1");
  //   this.userInsertLogtime = getLogsTime.data;
  // }
}
