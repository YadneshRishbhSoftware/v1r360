import axios from "axios";
import { action, computed, makeObservable, observable, toJS } from "mobx";
import { IRootStore } from "./RootStore";
import { NotificationManager } from "react-notifications";
import { IUserDetail } from "../helperInterface/IUserDetail";
import { CACHE_DYNAMIC_CONTENT } from "../App";
export interface Name {
  firstname: string;
  lastname: string;
}
export interface Token {
  token: string;
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

  async fetchUserToken(
    userName: string | undefined = undefined,
    password: string | undefined = undefined
  ) {
    const userdata = {
      user_name: userName,
      user_password: password,
    };

    const tokenRes = await axios.post(
      "https://r360-dev-services.rishabhsoft.com/api/core/login",
      userdata
    );
    this.userDetails = tokenRes.data;
    let promise = {};
    try {
      var dataObj = tokenRes.data.data;
      localStorage.setItem("token", dataObj?.token);
      const isLoggedIn = {
        isLoggedIn: true,
      };

      let credentials = {};
      promise = new Promise(function (resolve, reject) {
        const jsonResponse = new Response(JSON.stringify(isLoggedIn), {
          headers: {
            "content-type": "application/json",
          },
        });

        credentials = {
          user: dataObj.user.email,
          authToken: dataObj.token,
          name: dataObj.user.name,
        };
        const credentials_jsonResponse = new Response(
          JSON.stringify(credentials),
          {
            headers: {
              "content-type": "application/json",
            },
          }
        );
        // const holidays = Object.values(dataObj["holidays"]);
        // const holidays_jsonResponse = new Response(
        //   JSON.stringify(holidays),
        //   {
        //     headers: {
        //       "content-type": "application/json",
        //     },
        //   }
        // );

        // dispatch(setUserData({ ...credentials }));
        // dispatch(setLoading(false));
        // dispatch(setHolidays(holidays));
        caches
          .open(CACHE_DYNAMIC_CONTENT)
          .then((cache) => {
            cache.put("isLoggedIn", jsonResponse);
            cache.put("credentials", credentials_jsonResponse);
            // cache.put("holidays", holidays_jsonResponse);
            resolve("Success!");
          })
          .catch((err) => {
            NotificationManager.error("catches open time error !.!");
          });
      });
      // }else{
      //   console.log("ddd")
      // }
    } catch (e) {
      console.log(e);
    }
  }

  get getUserDetails() {
    return this.userDetails;
  }
}
