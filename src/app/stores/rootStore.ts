import PlayerStore from "./playerStore";
import UserStore from "./userStore";
import { createContext } from "react";
import { configure } from "mobx";
import CommonStore from "./commonStore";

configure({ enforceActions: "always" });

export class RootStore {
  playerStore: PlayerStore;
  userStore: UserStore;
  commonStore: CommonStore;

  constructor() {
    this.playerStore = new PlayerStore(this);
    this.userStore = new UserStore(this);
    this.commonStore = new CommonStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
