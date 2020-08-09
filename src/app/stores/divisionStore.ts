import { observable, computed, action, runInAction } from "mobx";
import agent from "../api/agent";
import { RootStore } from "./rootStore";
import { IDivision } from "../models/division";

export default class DivisionStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable divisions: IDivision[] | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = 0;

  @computed get options() {
    let options = this.divisions?.map((division) => ({
      key: division.shortName,
      text: division.name,
      value: division.id,
    }));
    return options;
  }

  @action loadDivisions = async () => {
    this.loadingInitial = true;
    try {
      const divisions = await agent.Divisions.list();
      runInAction("loading divisions", () => {
        this.divisions = divisions;
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("loading divisions error", () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };
}
