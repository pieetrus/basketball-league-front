import { observable, action, runInAction, computed } from "mobx";
import agent from "../api/agent";
import { RootStore } from "./rootStore";
import { IMatch } from "../models/match";
import { toast } from "react-toastify";
import { IMatchDetailed, IMatchDetailedSquads } from "../models/matchDetailed";
import { SyntheticEvent } from "react";

export default class MatchStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  // @observable matches: IMatch[] | null = null;
  @observable matchesRegistry = new Map();
  @observable matchesDetailedRegistry = new Map();
  @observable loadingInitial = false;
  @observable loading = false;
  @observable startDate = "";
  @observable division = null;
  @observable submitting = false;
  @observable target = 0;
  @observable selectedMatch: IMatchDetailedSquads | null = null;

  @computed get matchesDetailedByDate() {
    let temp: IMatchDetailed[] = Array.from(
      this.matchesDetailedRegistry.values()
    );
    return temp;
  }

  @action loadMatches = async () => {
    this.loadingInitial = true;
    try {
      const matches = await agent.Matches.list();
      runInAction("loading matches", () => {
        matches.forEach((match) => {
          match.startDate = new Date(match.startDate!);
          this.matchesRegistry.set(match.id, match);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("loading matches error", () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action loadMatchesDetailed = async () => {
    this.loadingInitial = true;
    try {
      const matches = await agent.Matches.listDetailed();
      runInAction("loading matches detailed", () => {
        matches.forEach((match) => {
          this.matchesDetailedRegistry.set(match.id, match);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("loading matches detailed error", () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action createMatch = async (match: IMatch) => {
    this.submitting = true;
    try {
      match.id = await agent.Matches.create(match);
      runInAction("creating player", () => {
        this.matchesRegistry.set(match.id, match);
        this.submitting = false;
      });
      return match.id;
    } catch (error) {
      runInAction("create player error", () => {
        this.submitting = false;
      });
      toast.error("problem submitting data");
      console.log(error.response);
    }
  };

  @action setSelectedMatch = async (id: number) => {
    this.loading = true;
    try {
      let match = await agent.Matches.detailsDetailed(id);
      runInAction("loading match detailed", () => {
        this.selectedMatch = match;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  };

  @action deleteMatch = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: number
  ) => {
    this.submitting = true;
    this.target = Number.parseInt(event.currentTarget.name);
    try {
      await agent.Matches.delete(id);
      runInAction("deleting match", () => {
        this.matchesRegistry.delete(id);
        this.matchesDetailedRegistry.delete(id);
        this.submitting = false;
        this.target = 0;
      });
    } catch (error) {
      runInAction("delete match error", () => {
        this.submitting = false;
        this.target = 0;
      });
      console.log(error);
    }
  };
}
