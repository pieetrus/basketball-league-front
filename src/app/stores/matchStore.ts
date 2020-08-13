import { observable, action, runInAction } from "mobx";
import agent from "../api/agent";
import { RootStore } from "./rootStore";
import { IMatch } from "../models/match";
import { toast } from "react-toastify";
import { IMatchDetailed, IMatchDetailedSquads } from "../models/matchDetailed";

export default class MatchStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable matches: IMatch[] | null = null;
  @observable matchesDetailed: IMatchDetailed[] | null = null;
  @observable loadingInitial = false;
  @observable loading = false;
  @observable startDate = "";
  @observable division = null;
  @observable submitting = false;
  @observable target = 0;
  @observable selectedMatch: IMatchDetailedSquads | null = null;

  @action loadMatches = async () => {
    this.loadingInitial = true;
    try {
      const matches = await agent.Matches.list();
      runInAction("loading matches", () => {
        this.matches = matches;
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
        this.matchesDetailed = matches;
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
        this.matches?.push(match);
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
}
