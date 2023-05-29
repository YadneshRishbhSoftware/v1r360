import { CalendarCardstore } from "./calendarStore";
import { InsertlogTime } from "./insertLogtimeStore";
import { LoginStore } from "./loginStore";
import { UserAddTaskStore } from "./userAddTaskstore";


export interface IRootStore {
  loginStore: LoginStore;
  calendercardStore:CalendarCardstore;
  userAddTaskStore:UserAddTaskStore;
  insertLogTime:InsertlogTime
}

export class RootStore implements IRootStore {
  loginStore: LoginStore;
  calendercardStore:CalendarCardstore;
  userAddTaskStore:UserAddTaskStore;
  insertLogTime:InsertlogTime
  constructor() {
    this.loginStore = new LoginStore(this);
    this.calendercardStore= new CalendarCardstore(this)
    this.userAddTaskStore= new UserAddTaskStore(this)
    this.insertLogTime = new InsertlogTime(this)
  }
}