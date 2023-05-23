import { CalendarCardstore } from "./calendarStore";
import { LoginStore } from "./loginStore";

export interface IRootStore {
  loginStore: LoginStore;
  calendercardStore:CalendarCardstore
}

export class RootStore implements IRootStore {
  loginStore: LoginStore;
  calendercardStore:CalendarCardstore
  constructor() {
    this.loginStore = new LoginStore(this);
    this.calendercardStore= new CalendarCardstore(this)
  }
}