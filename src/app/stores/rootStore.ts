import PlayerStore from "./playerStore";
import UserStore from "./userStore";
import { createContext } from "react";

export class RootStore {
  playerStore: PlayerStore;
  userStore: UserStore;

  constructor() {
    this.playerStore = new PlayerStore(this);
    this.userStore = new UserStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
