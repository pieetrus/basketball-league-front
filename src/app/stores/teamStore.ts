import { observable, computed, action, runInAction } from "mobx";
import agent from "../api/agent";
import { RootStore } from "./rootStore";
import { ITeam } from "../models/team";

export default class TeamStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable teams: ITeam[] | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = 0;

  @computed get options() {
    let options = this.teams?.map((team) => ({
      key: team.shortName,
      text: team.name,
      value: team.id,
    }));
    return options;
  }

  @action loadTeams = async () => {
    this.loadingInitial = true;
    try {
      const teams = await agent.Teams.list();
      runInAction("loading teams", () => {
        this.teams = teams;
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("loading teams error", () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };
}
