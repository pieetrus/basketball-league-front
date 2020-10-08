import { observable, action, runInAction, computed } from "mobx";
import agent from "../api/agent";
import { RootStore } from "./rootStore";
import { IMatch } from "../models/match";
import { toast } from "react-toastify";
import { IMatchDetailed, IMatchDetailedSquads } from "../models/matchDetailed";
import { SyntheticEvent } from "react";
import { IPlayerMatch } from "../models/playerMatch";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

export default class MatchStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  // @observable matches: IMatch[] | null = null;
  @observable matchesRegistry = new Map();
  @observable matchesDetailedRegistry = new Map();
  @observable homePlayerMatches: IPlayerMatch[] = [];
  @observable guestPlayerMatches: IPlayerMatch[] = [];
  @observable loadingInitial = false;
  @observable loadingPlayerMatches = false;
  @observable loading = false;
  @observable startDate = "";
  @observable division = null;
  @observable submitting = false;
  @observable target = 0;
  @observable selectedMatch: IMatchDetailedSquads | null = null;
  @observable.ref hubConnection: HubConnection | null = null;

  @action createHubConnection = () => {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:5000/incidentsHub", {
        accessTokenFactory: () => this.rootStore.commonStore.token!,
      })
      .configureLogging(LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log(this.hubConnection!.state))
      .catch((err) => {
        console.log(err);
      });

    this.hubConnection.on(
      "ReceiveShot",
      (isAccurate, isGuest, value, matchId, quater, minutes, seconds) => {
        runInAction(() => {
          let match: IMatchDetailed = this.matchesDetailedRegistry.get(matchId);
          match.lastIncidentQuater = quater;
          match.lastIncidentMinutes = minutes;
          match.lastIncidentSeconds = seconds;
          if (isAccurate) {
            if (isGuest) match.teamGuestPts = match.teamGuestPts + value;
            else match.teamHomePts = match.teamHomePts + value;
          }
        });
      }
    );
  };

  @action stopHubConnection = () => {
    this.hubConnection?.stop();
  };

  @computed get matchesDetailedByDate() {
    let temp: IMatchDetailed[] = Array.from(
      this.matchesDetailedRegistry.values()
    );
    return temp;
  }

  @action loadMatches = async () => {
    this.loadingInitial = true;
    try {
      let matches = await agent.Matches.list();
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

  @action loadPlayerMatches = async (matchId: number) => {
    this.loadingPlayerMatches = true;
    try {
      let players = await agent.PlayerMatches.list(matchId);
      runInAction("loading playermatches", () => {
        this.homePlayerMatches = players.filter((player) => {
          return !player.isGuest;
        });
        this.guestPlayerMatches = players.filter((player) => {
          return player.isGuest;
        });
        this.loadingPlayerMatches = false;
      });
    } catch (error) {
      runInAction("loading maplayermatchestches error", () => {
        this.loadingPlayerMatches = false;
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
      runInAction("loading match error", () => {
        this.loading = false;
      });
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
