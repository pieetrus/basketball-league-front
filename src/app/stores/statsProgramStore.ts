import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { action, computed, observable, runInAction } from "mobx";
import { SyntheticEvent } from "react";
import { toast } from "react-toastify";
import agent from "../api/agent";
import { IncidentType, MatchDurationInSeconds } from "../common/global";
import { IFoul } from "../models/foul";
import { IIncident } from "../models/incident";
import {
  IMatchDetailedSquads,
  IPlayerShortInfo,
} from "../models/matchDetailed";
import { IShot } from "../models/shot";
import { IStartMatchModel } from "../models/startMatchModel";
import { ITeam } from "../models/team";
import { ITimeout } from "../models/timeout";
import { ITurnover } from "../models/turnover";
import { RootStore } from "./rootStore";

export default class StatsProgramStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  @observable submitting = false;
  @observable target = 0;
  @observable loadingIncidents = false;
  @observable loadingMatch = false;
  @observable match: IMatchDetailedSquads | undefined;
  @observable editableActionLog = false;
  @observable timeInSeconds: number = MatchDurationInSeconds;
  @observable timeLeft: number = this.timeInSeconds;
  @observable minutesLeft: number = Math.floor(this.timeLeft / 60);
  @observable secondsLeft: number = this.timeLeft % 60;
  @observable quater: number = 1;
  @observable quaterEnded = false;
  @observable teamHomePts: number = 0;
  @observable teamGuestPts: number = 0;
  @observable teamHome: ITeam | null = null;
  @observable teamGuest: ITeam | null = null;
  @observable teamHomeJerseyColor: any;
  @observable teamGuestJerseyColor: any;
  @observable playerChosen: IPlayerShortInfo | undefined;
  @observable playerChosen2: IPlayerShortInfo | undefined;
  @observable playerChosen3: IPlayerShortInfo | undefined;
  @observable teamChosen: ITeam | undefined;
  @observable teamHomeFouls: number = 0;
  @observable teamGuestFouls: number = 0;
  @observable teamHomeTimeoutsUsed: number = 0;
  @observable teamGuestTimeoutsUsed: number = 0;
  @observable teamHomeChosenPlayers: Number[] = []; // playerSeasonIds
  @observable teamGuestChosenPlayers: Number[] = []; // playerSeasonIds
  @observable incidentsRegistry = new Map();
  @observable tempIncident: IIncident | undefined;
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
      (
        isAccurate,
        isGuest,
        value,
        matchId,
        quater,
        minutes,
        seconds,
        incidentId
      ) => {
        runInAction(() => {
          if (isAccurate) this.setTeamPoints(isGuest, false, value);
          if (this.tempIncident) {
            this.tempIncident!.id = incidentId;
            this.incidentsRegistry.set(
              this.tempIncident?.id,
              this.tempIncident
            );
          }
        });
      }
    );
  };

  @action stopHubConnection = () => {
    this.hubConnection?.stop();
  };
  @action createShot = async (shot: IShot) => {
    this.submitting = true;
    try {
      this.submitting = false;
      let incident: IIncident = {
        flagged: false,
        incidentType: IncidentType.SHOT,
        minutes: shot.minutes,
        quater: shot.quater,
        seconds: shot.seconds,
        shot,
        isGuest: shot.isGuest,
        matchId: shot.matchId,
      };
      this.tempIncident = Object.assign({}, incident);
      await this.hubConnection!.invoke("SendShot", shot).catch((err) =>
        console.log(err)
      );
    } catch (error) {
      runInAction("create shot error", () => {
        this.submitting = false;
        toast.error("Problem submitting data");
        console.log(error);
      });
    }
  };

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

  @action setMatch = (match: IMatchDetailedSquads) => {
    this.match = match;
    this.teamHomePts = match.teamHomePts;
    this.teamGuestPts = match.teamGuestPts;
  };

  @action setEditableActionLog = (editable: boolean) => {
    this.editableActionLog = editable;
  };

  @action setTeams = (teamHome: ITeam, teamGuest: ITeam) => {
    this.teamHome = teamHome;
    this.teamGuest = teamGuest;
  };

  @action setTeamChosen = (teamChosen: ITeam) => {
    this.teamChosen = teamChosen;
  };

  @action setQuaterEnded = (ended: boolean) => {
    this.quaterEnded = ended;
  };

  @action setTimeLeft = (seconds: number) => {
    this.timeLeft = seconds;
  };
  @action setSecondsLeft = (seconds: number) => {
    this.secondsLeft = seconds;
  };
  @action setMinutesLeft = (minutes: number) => {
    this.minutesLeft = minutes;
  };
  @action setNextQuater = () => {
    this.quater = this.quater + 1;
    this.quaterEnded = false;
    this.setTimeLeft(this.timeInSeconds);
    this.setMinutesLeft(Math.floor(this.timeInSeconds / 60));
    this.setSecondsLeft(this.timeInSeconds % 60);
    this.setTeamFoulsAndTimeouts();
  };

  @action setTeamFoulsAndTimeouts = () => {
    if (this.quater === 1) {
      this.teamHomeFouls = this.match?.teamHome.fouls1Qtr!;
      this.teamHomeTimeoutsUsed = this.match?.teamHome.timeouts1Half!;
      this.teamGuestFouls = this.match?.teamGuest.fouls1Qtr!;
      this.teamGuestTimeoutsUsed = this.match?.teamGuest.timeouts1Half!;
    }
    if (this.quater === 2) {
      this.teamHomeFouls = this.match?.teamHome.fouls2Qtr!;
      this.teamHomeTimeoutsUsed = this.match?.teamHome.timeouts1Half!;
      this.teamGuestFouls = this.match?.teamGuest.fouls2Qtr!;
      this.teamGuestTimeoutsUsed = this.match?.teamGuest.timeouts1Half!;
    }
    if (this.quater === 3) {
      this.teamHomeFouls = this.match?.teamHome.fouls3Qtr!;
      this.teamHomeTimeoutsUsed = this.match?.teamHome.timeouts1Half!;
      this.teamGuestFouls = this.match?.teamGuest.fouls3Qtr!;
      this.teamGuestTimeoutsUsed = this.match?.teamGuest.timeouts2Half!;
    }
    if (this.quater === 4) {
      this.teamHomeFouls = this.match?.teamHome.fouls4Qtr!;
      this.teamHomeTimeoutsUsed = this.match?.teamHome.timeouts1Half!;
      this.teamGuestFouls = this.match?.teamGuest.fouls4Qtr!;
      this.teamGuestTimeoutsUsed = this.match?.teamGuest.timeouts2Half!;
    }
  };

  // @action updateTimeoutsAfterDeletion = (xd : number) => {

  // };

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

  @action setPlayerChosen3 = (
    playerChosen3: IPlayerShortInfo | undefined,
    isGuest: boolean
  ) => {
    if (playerChosen3) playerChosen3.isGuest = isGuest;
    this.playerChosen3 = playerChosen3;
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

  @action setPlayersInGameFromMatchModel = () => {
    let teamHomePlayersInGame = this.match?.teamHomePlayers.filter((player) => {
      return this.match?.playersInGameIds.includes(player.id!);
    });
    let teamGuestPlayersInGame = this.match?.teamGuestPlayers.filter(
      (player) => {
        return this.match?.playersInGameIds.includes(player.id!);
      }
    );
    let homePlayers: Number[] = [];
    let guestPlayers: Number[] = [];
    teamHomePlayersInGame?.map((player) => {
      homePlayers.push(player.id!);
    });
    teamGuestPlayersInGame?.map((player) => {
      guestPlayers.push(player.id!);
    });
    this.teamHomeChosenPlayers = homePlayers;
    this.teamGuestChosenPlayers = guestPlayers;
  };

  @action loadMatch = async (id: number) => {
    this.loadingMatch = true;
    try {
      let match = await agent.Matches.detailsDetailed(id);
      runInAction("loading match", () => {
        this.match = match;
        this.setTeamsJerseysColors(
          match.teamHomeJerseyColor,
          match.teamGuestJerseyColor
        );
        this.loadingMatch = false;
      });
    } catch (error) {
      runInAction("loading match error", () => {
        this.loadingMatch = false;
      });
      toast.error("Problem submitting data");
      console.log(error.response);
    }
  };

  @action startMatch = async () => {
    this.submitting = true;
    try {
      let model: IStartMatchModel = {
        id: this.match?.id,
        teamGuestJerseyColor: this.teamHomeJerseyColor,
        teamHomeJerseyColor: this.teamGuestJerseyColor,
        teamGuestPlayerSeasonIds: this.teamGuestChosenPlayers,
        teamHomePlayerSeasonIds: this.teamHomeChosenPlayers,
      };
      await agent.Matches.start(model);
      runInAction("starting match", () => {
        this.submitting = false;
      });
    } catch (error) {
      runInAction("starting match error", () => {
        this.submitting = false;
      });
      toast.error("Problem submitting data");
      console.log(error.response);
    }
  };

  @action endMatch = async () => {
    this.submitting = true;
    try {
      await agent.Matches.end(this.match?.id!);
      runInAction("ending match", () => {
        this.submitting = false;
      });
    } catch (error) {
      runInAction("ending match error", () => {
        this.submitting = false;
      });
      toast.error("Problem submitting data");
      console.log(error.response);
    }
  };

  @action createFoul = async (foul: IFoul) => {
    this.submitting = true;
    try {
      let incidentId = await agent.Incidents.createFoul(foul);
      runInAction("creating foul", () => {
        this.submitting = false;
        let incident: IIncident = {
          flagged: false,
          incidentType: IncidentType.FOUL,
          minutes: foul.minutes,
          quater: foul.quater,
          seconds: foul.seconds,
          foul,
          id: incidentId,
          isGuest: foul.isGuest,
          matchId: foul.matchId,
        };
        this.incidentsRegistry.set(incident.id, incident);
        if (foul.freeThrows)
          this.setTeamPoints(
            !foul.isGuest,
            false,
            foul.freeThrows.accurateShots
          );
        if (incident.isGuest) this.teamGuestFouls++;
        else this.teamHomeFouls++;
      });
    } catch (error) {
      runInAction("create foul error", () => {
        this.submitting = false;
      });
      toast.error("Problem submitting data");
      console.log(error.response);
    }
  };

  @action createTurnover = async (turnover: ITurnover) => {
    this.submitting = true;
    try {
      let incidentId = await agent.Incidents.createTurnover(turnover);
      runInAction("creating turnover", () => {
        this.submitting = false;
        let incident: IIncident = {
          flagged: false,
          incidentType: IncidentType.TURNOVER,
          minutes: turnover.minutes,
          quater: turnover.quater,
          seconds: turnover.seconds,
          turnover,
          id: incidentId,
          isGuest: turnover.isGuest,
          matchId: turnover.matchId,
        };
        this.incidentsRegistry.set(incident.id, incident);
      });
    } catch (error) {
      runInAction("create turnover error", () => {
        this.submitting = false;
      });
      toast.error("Problem submitting data");
      console.log(error.response);
    }
  };

  @action createTimeout = async (timeout: ITimeout) => {
    this.submitting = true;
    try {
      let incidentId = await agent.Incidents.createTimeout(timeout);
      runInAction("creating timeout", () => {
        this.submitting = false;
        let incident: IIncident = {
          flagged: false,
          incidentType: IncidentType.TIMEOUT,
          minutes: timeout.minutes,
          quater: timeout.quater,
          seconds: timeout.seconds,
          timeout,
          id: incidentId,
          isGuest: timeout.isGuest,
          matchId: timeout.matchId,
        };
        this.incidentsRegistry.set(incident.id, incident);
        if (incident.isGuest) this.teamGuestTimeoutsUsed++;
        else this.teamHomeTimeoutsUsed++;
        if (incident.isGuest)
          toast.success("Timeout for" + this.teamGuest?.name);
        else toast.success("Timeout for" + this.teamHome?.name);
      });
    } catch (error) {
      runInAction("create timeout error", () => {
        this.submitting = false;
      });
      toast.error(error.data.error);
    }
  };

  @action loadIncidents = async (matchId: number) => {
    this.loadingIncidents = true;
    try {
      let incidents: IIncident[] = await agent.Incidents.list(matchId);
      runInAction("loading incidents", () => {
        this.incidentsRegistry.clear();
        incidents.map((incident) =>
          this.incidentsRegistry.set(incident.id, incident)
        );
        let lastIncident = incidents[0];
        if (lastIncident) {
          this.timeLeft =
            Number.parseInt(lastIncident?.minutes!) * 60 +
            Number.parseInt(lastIncident?.seconds!);
          this.secondsLeft = Number.parseInt(lastIncident?.seconds!);
          this.minutesLeft = Number.parseInt(lastIncident?.minutes!);
          this.quater = lastIncident.quater;
          this.setTeamFoulsAndTimeouts();
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
        if (incident.incidentType === IncidentType.SHOT)
          this.setTeamPoints(incident.isGuest, true, incident.shot?.value!);
        if (incident.incidentType === IncidentType.TIMEOUT) {
          incident.isGuest
            ? (this.teamGuestTimeoutsUsed -= 1)
            : (this.teamHomeTimeoutsUsed -= 1);
        }
        if (incident.incidentType === IncidentType.FOUL) {
          incident.isGuest
            ? (this.teamGuestFouls -= 1)
            : (this.teamHomeFouls -= 1);
        }
        this.incidentsRegistry.delete(id);
        this.submitting = false;
        this.target = 0;
      });
    } catch (error) {
      runInAction("deleting incidents error", () => {
        this.submitting = false;
        this.target = 0;
      });
      console.log(error.response);
    }
  };
}
