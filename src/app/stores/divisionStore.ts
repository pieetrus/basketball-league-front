import { observable, computed, action, runInAction, reaction } from "mobx";
import agent from "../api/agent";
import { RootStore } from "./rootStore";
import { toast } from "react-toastify";
import { SyntheticEvent } from "react";
import { IDivision } from "../models/division";

export default class DivisionStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    reaction(
      () => this.predicate.keys(),
      () => {
        this.divisionsRegistry.clear();
        this.loadDivisions();
      }
    );
  }

  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = 0;
  @observable divisionsRegistry = new Map();
  @observable division: IDivision | null = null;
  @observable predicate = new Map(); // route params

  @computed get options() {
    let options = this.divisionsByLevel?.map((division) => ({
      key: division.shortName,
      text: division.name,
      value: division.id,
    }));
    return options;
  }

  @computed get divisionsByLevel() {
    return this.sortDivisionsByLevel(
      Array.from(this.divisionsRegistry.values())
    );
  }

  sortDivisionsByLevel(seasons: IDivision[]) {
    const sortedTeams = seasons.sort((a, b) => {
      if (a.level < b.level) return -1;
      if (a.level > b.level) return 1;
      return 0;
    });
    return sortedTeams;
  }

  @action loadDivisions = async () => {
    this.loadingInitial = true;
    try {
      const seasons = await agent.Divisions.list();
      runInAction("loading divisions", () => {
        seasons.forEach((division) => {
          this.divisionsRegistry.set(division.id, division);
          this.loadingInitial = false;
        });
      });
    } catch (error) {
      runInAction("loading divisions error", () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };
  @action loadDivision = async (id: number) => {
    let division = this.getDivision(id);
    if (division) {
      this.division = division;
      return division;
    } else {
      this.loadingInitial = true;
      try {
        division = await agent.Divisions.details(id);
        runInAction("loading division", () => {
          this.division = division;
          this.loadingInitial = false;
        });
        return division;
      } catch (error) {
        runInAction("load division error", () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };

  @action clearDivision = () => {
    this.division = null;
  };

  getDivision = (id: number) => {
    return this.divisionsRegistry.get(id);
  };

  @action createDivision = async (division: IDivision) => {
    this.submitting = true;
    try {
      division.id = await agent.Divisions.create(division);
      runInAction("creating division", () => {
        this.divisionsRegistry.set(division.id, division);
        this.submitting = false;
      });
      return division.id;
    } catch (error) {
      runInAction("create division error", () => {
        this.submitting = false;
      });
      toast.error("Problem submitting data");
      console.log(error.response);
    }
  };

  @action editDivision = async (division: IDivision) => {
    this.submitting = true;
    try {
      await agent.Divisions.update(division);
      runInAction("editing division", () => {
        this.divisionsRegistry.set(division.id, division);
        this.division = division;
        this.submitting = false;
      });
    } catch (error) {
      runInAction("editing division error", () => {
        this.submitting = false;
      });
      toast.error("Problem submitting data");
      console.log(error.response);
    }
  };

  @action deleteDivision = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: number
  ) => {
    this.submitting = true;
    this.target = Number.parseInt(event.currentTarget.name);
    try {
      await agent.Divisions.delete(id);
      runInAction("deleting division", () => {
        this.divisionsRegistry.delete(id);
        this.submitting = false;
        this.target = 0;
      });
    } catch (error) {
      runInAction("delete division error", () => {
        this.submitting = false;
        this.target = 0;
      });
      console.log(error);
    }
  };
}
