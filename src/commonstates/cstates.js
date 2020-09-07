import { atom } from "recoil";

export const loggedIn = atom({
  key: "loggedIn",
  default: window.localStorage.getItem("token") ? true : false
});
