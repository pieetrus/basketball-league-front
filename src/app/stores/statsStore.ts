import { action, computed, observable, runInAction } from "mobx";
import { SyntheticEvent } from "react";
import { toast } from "react-toastify";
import agent from "../api/agent";
import { MatchDurationInSeconds } from "../common/global";
import { IIncident } from "../models/incident";
import {
  IMatchDetailedSquads,
  IPlayerShortInfo,
} from "../models/matchDetailed";
import { IShot } from "../models/shot";
import { ITeam } from "../models/team";
import { RootStore } from "./rootStore";

export default class StatsStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  @observable submitting = false;
  @observable target = 0;
  @observable loadingIncidents = false;
  @observable match: IMatchDetailedSquads | undefined;
  @observable timeInSeconds: number = MatchDurationInSeconds;
  @observable quater: number = 1;
  @observable teamHomePlayers: IPlayerShortInfo[] = [];
  @observable teamGuestPlayers: IPlayerShortInfo[] = [];
  @observable teamHomePts: number = 0;
  @observable teamGuestPts: number = 0;
  @observable teamHome: ITeam | null = null;
  @observable teamGuest: ITeam | null = null;
  @observable teamHomeJerseyColor: any;
  @observable teamGuestJerseyColor: any;
  @observable playerChosen: IPlayerShortInfo | undefined;
  @observable playerChosen2: IPlayerShortInfo | undefined;
  @observable teamHomeChosenPlayers: Number[] = []; // playerSeasonIds
  @observable teamGuestChosenPlayers: Number[] = []; // playerSeasonIds
  @observable incidentsRegistry = new Map();

  @computed get getChosenPlayerJerseyColor() {
    if (this.playerChosen?.isGuest) return this.teamGuestJerseyColor;
    else return this.teamHomeJerseyColor;
  }

  @computed get getChosenTeamHomePlayers() {
    let odp = this.rootStore.matchStore.selectedMatch?.teamHomePlayers.filter(
      (player) => this.teamHomeChosenPlayers.includes(player.id!)
    );
    return odp;
  }

  @computed get getChosenTeamGuestPlayers() {
    return this.rootStore.matchStore.selectedMatch?.teamGuestPlayers.filter(
      (player) => this.teamGuestChosenPlayers.includes(player.id!)
    );
  }

  @computed get getIncidents() {
    return this.incidentsOrderByTimeAndQuater();
  }

  incidentsOrderByTimeAndQuater() {
    let incidents: IIncident[] = Array.from(this.incidentsRegistry.values());

    return incidents.sort((a, b) => {
      let aMinutes = Number.parseInt(a.minutes);
      let bMinutes = Number.parseInt(b.minutes);
      let aSeconds = Number.parseInt(a.seconds);
      let bSeconds = Number.parseInt(b.seconds);
      if (a.quater === b.quater) {
        if (aMinutes === bMinutes) {
          if (aSeconds === bSeconds) {
            if (a.id! < b.id!) return 1;
            else return -1;
          } else if (aSeconds < bSeconds) return -1;
          else return 1;
        } else if (aMinutes < bMinutes) return -1;
        else return 1;
      } else if (a.quater < b.quater) return 1;
      else return -1;
    });
  }

  @action setTeamPoints(isGuest: boolean, deletion: boolean, pts: number) {
    if (deletion) {
      if (isGuest) this.teamGuestPts = this.teamGuestPts - pts;
      else this.teamHomePts = this.teamHomePts - pts;
    } else {
      if (isGuest) this.teamGuestPts = this.teamGuestPts + pts;
      else this.teamHomePts = this.teamHomePts + pts;
    }
  }

  @action setTeamPlayers = (
    teamHomePlayers: IPlayerShortInfo[],
    teamGuestPlayers: IPlayerShortInfo[]
  ) => {
    this.teamHomePlayers = teamHomePlayers;
    this.teamGuestPlayers = teamGuestPlayers;
  };

  @action setMatch = (match: IMatchDetailedSquads) => {
    this.match = match;
    this.teamHomePts = match.teamHomePts;
    this.teamGuestPts = match.teamGuestPts;
  };

  @action setTeams = (teamHome: ITeam, teamGuest: ITeam) => {
    this.teamHome = teamHome;
    this.teamGuest = teamGuest;
  };

  @action setPlayerChosen = (
    playerChosen: IPlayerShortInfo | undefined,
    isGuest: boolean
  ) => {
    if (playerChosen) playerChosen.isGuest = isGuest;
    this.playerChosen = playerChosen;
  };

  @action setPlayerChosen2 = (
    playerChosen2: IPlayerShortInfo | undefined,
    isGuest: boolean
  ) => {
    if (playerChosen2) playerChosen2.isGuest = isGuest;
    this.playerChosen2 = playerChosen2;
  };

  @action setTeamsJerseysColors = (
    teamHomeJerseyColor: String,
    teamGuestJerseyColor: String
  ) => {
    this.teamHomeJerseyColor = teamHomeJerseyColor;
    this.teamGuestJerseyColor = teamGuestJerseyColor;
  };

  @action setTeamsChosenPlayers = (
    teamHomeChosenPlayers: Number[],
    teamGuestChosenPlayers: Number[]
  ) => {
    this.teamHomeChosenPlayers = teamHomeChosenPlayers;
    this.teamGuestChosenPlayers = teamGuestChosenPlayers;
  };

  @action createShot = async (shot: IShot) => {
    this.submitting = true;
    try {
      let incidentId = await agent.Incidents.createShot(shot);
      runInAction("creating shot", () => {
        this.submitting = false;
        let incident: IIncident = {
          flagged: false,
          incidentType: 3,
          minutes: shot.minutes,
          quater: shot.quater,
          seconds: shot.seconds,
          shot,
          id: incidentId,
          isGuest: shot.isGuest,
        };
        this.incidentsRegistry.set(incident.id, incident);
      });
      if (shot.isAccurate) this.setTeamPoints(shot.isGuest, false, shot.value);
      return shot.id;
    } catch (error) {
      runInAction("create shot error", () => {
        this.submitting = false;
      });
      toast.error("Problem submitting data");
      console.log(error.response);
    }
  };

  @action loadIncidents = async () => {
    this.loadingIncidents = true;
    try {
      let incidents: IIncident[] = await agent.Incidents.list(this.match?.id!);
      runInAction("loading incidents", () => {
        incidents.map((incident) =>
          this.incidentsRegistry.set(incident.id, incident)
        );
        let lastIncident = incidents[0];
        if (lastIncident) {
          this.timeInSeconds =
            Number.parseInt(lastIncident?.minutes!) * 60 +
            Number.parseInt(lastIncident?.seconds!);
          this.quater = lastIncident.quater;
        }
        this.loadingIncidents = false;
      });
    } catch (error) {
      runInAction("loading incidents error", () => {
        this.loadingIncidents = false;
      });
      console.log(error.response);
    }
  };

  @action deleteIncident = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: number
  ) => {
    this.submitting = true;
    this.target = Number.parseInt(event.currentTarget.id);
    try {
      await agent.Incidents.delete(id);
      runInAction("deleteing incident", () => {
        let incident: IIncident = this.incidentsRegistry.get(id);
        this.setTeamPoints(incident.isGuest, true, incident.shot?.value!);
        this.incidentsRegistry.delete(id);
        this.submitting = false;
        this.target = 0;
      });
    } catch (error) {
      runInAction("deleteing incidents error", () => {
        this.submitting = false;
        this.target = 0;
      });
      console.log(error.response);
    }
  };
}
