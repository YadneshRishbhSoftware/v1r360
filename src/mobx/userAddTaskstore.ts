import axios from "axios";
import { action, computed, makeObservable, observable } from "mobx";
import { IRootStore } from "./rootStore";
import { AddTask } from "../helperInterface/userAddTaskInterface";


export class UserAddTaskStore {
  rootStore: IRootStore;
  getAddTasklist: AddTask | any;
  constructor(rootStore: IRootStore) {
    makeObservable(this, {
      getAddTasklist: observable,
      fetchcalenderCardData: action,
    });
    this.rootStore = rootStore;
  }
  async fetchcalenderCardData(date : string) {
    const getDatedata = {
        date:date,
    }
    const token :any = localStorage.getItem("token");
    const getTasklist = await axios.post(
      `https://r360-dev-services.rishabhsoft.com/api/lite/MyProjects`,getDatedata,
      { headers: {"Authorization" : `Bearer ${token}`} }
    ); 
    console.log(getTasklist,"getLogsTime");
    this.getAddTasklist = getTasklist?.data
  }
}
