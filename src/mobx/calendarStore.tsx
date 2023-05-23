import axios from "axios";
import { action, computed, makeObservable, observable } from "mobx";
import { IRootStore } from "./RootStore";
import { Root } from "../helperInterface/calendercardInterface";

export interface DateSelectInterface {
    startDate: Date;
    endData: Date;
    value: Date;
    onSelect: (date: Date) => void;
    token:String
  }

  // export interface Calendarcard {
  //   log_id: Number;
  //   project : {
  //     id: Number;
  //     name: string;
  //   };
  //   task : {
  //     id: Number;
  //     name: string;
  //   };
  //   task_id: number;
  //   project_id: number;
  //   logTimeTotal: number
  //   logTimeTotalLeave: number
  // }

export class CalendarCardstore {
  rootStore: IRootStore;
  calenderDateDetails: Root | undefined;
  constructor(rootStore: IRootStore) {
    makeObservable(this, {
      calenderDateDetails: observable,
      fetchcalenderCardData: action,
      getCalendercarddetails: computed,
    });
    this.rootStore = rootStore;
  }
  async fetchcalenderCardData(date : string) {
    const getDatedata = {
        date:date,
    }
    const token :any = localStorage.getItem("token");
    console.log(token,"local")
    const getLogsTime = await axios.post(
      `https://r360-dev-services.rishabhsoft.com/api/lite/MyLogTime`,getDatedata,
      { headers: {"Authorization" : `Bearer ${token}`} }
    ); 
    console.log(getLogsTime,"getLogsTime");
    this.calenderDateDetails = getLogsTime.data;
  }

  get getCalendercarddetails() {
    return this.calenderDateDetails;
  }
}
