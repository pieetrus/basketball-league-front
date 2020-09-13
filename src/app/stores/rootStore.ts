import PlayerStore from "./playerStore";
import UserStore from "./userStore";
import { createContext } from "react";
import { configure } from "mobx";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";
import TeamStore from "./teamStore";
import DivisionStore from "./divisionStore";
import MatchStore from "./matchStore";
import SeasonStore from "./seasonStore";
import StatsStore from "./statsStore";

configure({ enforceActions: "always" });

export class RootStore {
  playerStore: PlayerStore;
  userStore: UserStore;
  commonStore: CommonStore;
  modalStore: ModalStore;
  profileStore: ProfileStore;
  teamStore: TeamStore;
  divisionStore: DivisionStore;
  matchStore: MatchStore;
  seasonStore: SeasonStore;
  statsStore: StatsStore;

  constructor() {
    this.playerStore = new PlayerStore(this);
    this.userStore = new UserStore(this);
    this.commonStore = new CommonStore(this);
    this.modalStore = new ModalStore(this);
    this.profileStore = new ProfileStore(this);
    this.teamStore = new TeamStore(this);
    this.divisionStore = new DivisionStore(this);
    this.matchStore = new MatchStore(this);
    this.seasonStore = new SeasonStore(this);
    this.statsStore = new StatsStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
