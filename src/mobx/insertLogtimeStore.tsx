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
    console.log("data",data)
    const getLogsTime = await axios.post(
      `https://r360-dev-services.rishabhsoft.com/api/lite/InsertLogTime`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(data, "getdata");
    this.userInsertLogtime = getLogsTime.data;
  }
}
