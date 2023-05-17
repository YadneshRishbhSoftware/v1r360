import axios from "axios";
import { action, computed, makeObservable, observable, toJS } from "mobx";
import { IRootStore } from "./RootStore";
// import { postFunction } from "../../components/common/AxiosInstance";
// import SecureLS from "secure-ls";
// import { Permissions } from "../../constants/PermissionConstant";
import { IUserDetail } from "../helperInterface/IUserDetail";
export interface Name {
  firstname: string;
  lastname: string;
}
export interface Token {
  token :string
}

export class LoginStore {
  rootStore: IRootStore;
  userDetails!: IUserDetail | any;
  constructor(rootStore: IRootStore) {
    makeObservable(this, {
      userDetails: observable,
      fetchUserToken: action,
      getUserDetails: computed,
    });
    this.rootStore = rootStore;
  }

  logout() {
    this.userDetails = null;
  }

  async fetchUserToken(userName: string | undefined = undefined, password: string | undefined = undefined) {
    const data = {
      user_name: userName,
      user_password: password,
    };

    const tokenRes = await axios.post<Token>("https://r360-dev-services.rishabhsoft.com/api/core/login", data);
    console.log(tokenRes)
    this.userDetails= tokenRes.data;
  }

  get getUserDetails() {
    return this.userDetails;
  }
}
