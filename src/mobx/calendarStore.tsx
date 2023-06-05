import axios from "axios";
import { action, computed, makeObservable, observable } from "mobx";
import { IRootStore } from "./RootStore";
import { Root } from "../helperInterface/calendercardInterface";

// Delete task interface
export interface deleteuserTask {
  status: string;
  data: string;
}
export class CalendarCardstore {
  rootStore: IRootStore;
  calenderDateDetails: Root | undefined;
  deleteuserTask: deleteuserTask | undefined;
  constructor(rootStore: IRootStore) {
    makeObservable(this, {
      calenderDateDetails: observable,
      deleteuserTask: observable,
      fetchcalenderCardData: action,
      getCalendercarddetails: computed,
      fetchDeletetask: action,
      getDeleteTaks: computed,
    });
    this.rootStore = rootStore;
  }
  async fetchcalenderCardData(date: string) {
    const getDatedata = {
      date: date,
    };
    const token: any = localStorage.getItem("token");
    const getLogsTime = await axios.post(
      `https://r360-dev-services.rishabhsoft.com/api/lite/MyLogTime`,
      getDatedata,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    this.calenderDateDetails = getLogsTime.data;
  }

  async fetchDeletetask(logId: string | undefined) {
    const getlogId = {
      log_id: logId,
    };
    const token: any = localStorage.getItem("token");
    const deleteTask = await axios.post(
      `https://r360-dev-services.rishabhsoft.com/api/lite/DeleteLog`,
      getlogId,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    this.deleteuserTask = deleteTask.data;
  }
  get getCalendercarddetails() {
    return this.calenderDateDetails;
  }

  get getDeleteTaks() {
    return this.deleteuserTask;
  }
}
