import axios from "axios";
import { action, computed, makeObservable, observable } from "mobx";
import { IRootStore } from "./RootStore";
import { InsertLogtime } from "../helperInterface/InsertLoginterface";

export class InsertlogTime {
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
    date: string | undefined,
    projectId: number | undefined,
    taskId: string | undefined,
    hours: string | undefined,
    description: string | undefined
  ) {
    const token: any = localStorage.getItem("token");
    const getData = {
        date:date,
        project_id:projectId,
        task_id:taskId,
        hours:hours,
        description:description
    }
    const getLogsTime = await axios.post(
      `https://r360-dev-services.rishabhsoft.com/api/lite/InsertLogTime`,
      getData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(getData, "getdata");
    this.userInsertLogtime = getLogsTime.data;
  }
}
