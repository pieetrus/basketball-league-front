import { action, computed, observable } from "mobx";
import { IPlayerShortInfo } from "../models/matchDetailed";
import { ITeam } from "../models/team";
import { RootStore } from "./rootStore";

export default class StatsStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    // reaction(
    //   () => this.predicate.keys(),
    //   () => {
    //     this.teamsRegistry.clear();
    //     this.loadTeams();
    //   }
    // );
  }

  @observable teamHomePlayers: IPlayerShortInfo[] = [];
  @observable teamGuestPlayers: IPlayerShortInfo[] = [];
  @observable teamHome: ITeam | null = null;
  @observable teamGuest: ITeam | null = null;
  @observable teamHomeJerseyColor: any;
  @observable teamGuestJerseyColor: any;
  @observable playerChosen: IPlayerShortInfo | undefined;
  @observable teamHomeChosenPlayers: Number[] = []; // playerSeasonIds
  @observable teamGuestChosenPlayers: Number[] = []; // playerSeasonIds

  @computed get getChosenPlayerJerseyColor() {
    if (this.playerChosen?.isGuest) return this.teamGuestJerseyColor;
    else return this.teamHomeJerseyColor;
  }

  @action setTeamPlayers = (
    teamHomePlayers: IPlayerShortInfo[],
    teamGuestPlayers: IPlayerShortInfo[]
  ) => {
    this.teamHomePlayers = teamHomePlayers;
    this.teamGuestPlayers = teamGuestPlayers;
  };

  @action setTeams = (teamHome: ITeam, teamGuest: ITeam) => {
    this.teamHome = teamHome;
    this.teamGuest = teamGuest;
  };

  @action setplayerChosen = (
    playerChosen: IPlayerShortInfo | undefined,
    isGuest: boolean
  ) => {
    if (playerChosen) playerChosen.isGuest = isGuest;
    this.playerChosen = playerChosen;
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

  //   @observable loadingInitial = false;
  //   @observable loadingInitialSeason = false;
  //   @observable submitting = false;
  //   @observable target = 0;
  //   @observable teamsRegistry = new Map();
  //   @observable teamsSeasonRegistry = new Map();
  //   @observable chosenTeamOptions: ITeam[] = [];
  //   @observable team: ITeam | null = null;
  //   @observable uploadingLogo = false;
  //   @observable predicate = new Map(); // route params

  //   @action setPredicate = (predicate: string, value: string = "") => {
  //     if (predicate !== "all") this.predicate.set(predicate, value);
  //   };

  //   @action clearPredicate = () => {
  //     this.predicate.clear();
  //   };

  //   @computed get axiosParams() {
  //     const params = new URLSearchParams();
  //     this.predicate.forEach((value, key) => {
  //       params.append(key, value);
  //     });
  //     return params;
  //   }

  //   @computed get options() {
  //     let options = this.teamsByName?.map((team) => ({
  //       key: team.name,
  //       text: team.name,
  //       value: team.id,
  //     }));
  //     return options;
  //   }

  //   @computed get teamSeasonOptions() {
  //     let options = this.teamsSeasonByName?.map((team) => ({
  //       key: team.name,
  //       text: team.name,
  //       value: team.id,
  //     }));
  //     return options;
  //   }

  //   @computed get optionsExludingSelected() {
  //     let toRemove = this.chosenTeamOptions;

  //     let filteredTeams = this.filterTeams(this.teamsByName, toRemove);

  //     let options = filteredTeams.map((team) => ({
  //       key: team.name,
  //       text: team.name,
  //       value: team.id,
  //     }));
  //     return options;
  //   }

  //   filterTeams(filteredArray: ITeam[], toRemove: ITeam[]) {
  //     for (var i = filteredArray.length - 1; i >= 0; i--) {
  //       for (var j = 0; j < toRemove.length; j++) {
  //         if (filteredArray[i] && filteredArray[i].name === toRemove[j].name) {
  //           filteredArray.splice(i, 1);
  //         }
  //       }
  //     }
  //     return filteredArray;
  //   }

  //   @computed get teamsByName() {
  //     return this.sortTeamsByName(Array.from(this.teamsRegistry.values()));
  //   }

  //   @computed get teamsSeasonByName() {
  //     return this.sortTeamsByName(Array.from(this.teamsSeasonRegistry.values()));
  //   }

  //   sortTeamsByName(teams: ITeam[]) {
  //     const sortedTeams = teams.sort((a, b) => {
  //       if (a.name.toUpperCase() < b.name.toUpperCase()) return -1;
  //       if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
  //       return 0;
  //     });
  //     return sortedTeams;
  //   }

  //   @action loadTeams = async () => {
  //     this.loadingInitial = true;
  //     try {
  //       const teams = await agent.Teams.list();
  //       runInAction("loading teams", () => {
  //         teams.forEach((team) => {
  //           this.teamsRegistry.set(team.id, team);
  //         });
  //         this.loadingInitial = false;
  //       });
  //     } catch (error) {
  //       runInAction("loading teams error", () => {
  //         this.loadingInitial = false;
  //       });
  //       console.log(error);
  //     }
  //   };

  //   @action loadTeamsSeason = async () => {
  //     this.teamsSeasonRegistry.clear();
  //     this.loadingInitialSeason = true;
  //     try {
  //       const teams = await agent.Teams.listSeason(this.axiosParams);
  //       runInAction("loading teamsSeason", () => {
  //         this.chosenTeamOptions = teams;
  //         teams.forEach((team) => {
  //           this.teamsSeasonRegistry.set(team.id, team);
  //         });
  //         this.loadingInitialSeason = false;
  //       });
  //     } catch (error) {
  //       runInAction("loading teamsSeason error", () => {
  //         this.loadingInitialSeason = false;
  //       });
  //       console.log(error);
  //     }
  //   };

  //   @action loadTeam = async (id: number) => {
  //     let team = this.getTeam(id);
  //     if (team) {
  //       this.team = team;
  //       return team;
  //     } else {
  //       this.loadingInitial = true;
  //       try {
  //         team = await agent.Teams.details(id);
  //         runInAction("loading team", () => {
  //           this.team = team;
  //           this.loadingInitial = false;
  //         });
  //         return team;
  //       } catch (error) {
  //         runInAction("load team error", () => {
  //           this.loadingInitial = false;
  //         });
  //         console.log(error);
  //       }
  //     }
  //   };

  //   @action setChosenTeams = (chosenTeams: ITeam[]) => {
  //     this.chosenTeamOptions = chosenTeams;
  //   };

  //   @action clearTeam = () => {
  //     this.team = null;
  //   };

  //   getTeam = (id: number) => {
  //     return this.teamsRegistry.get(id);
  //   };

  //   @action createTeam = async (team: ITeam) => {
  //     this.submitting = true;
  //     try {
  //       team.id = await agent.Teams.create(team);
  //       runInAction("creating team", () => {
  //         this.teamsRegistry.set(team.id, team);
  //         this.submitting = false;
  //       });
  //       return team.id;
  //     } catch (error) {
  //       runInAction("create team error", () => {
  //         this.submitting = false;
  //       });
  //       toast.error("Problem submitting data");
  //       console.log(error.response);
  //     }
  //   };

  //   @action createTeamSeason = async (teamSeason: ITeamSeason) => {
  //     this.submitting = true;
  //     try {
  //       teamSeason.id = await agent.Teams.createTeamSeason(teamSeason);
  //       runInAction("creating teamSeason", () => {
  //         this.teamsSeasonRegistry.set(teamSeason.id, teamSeason);
  //         this.submitting = false;
  //         this.loadTeamsSeason();
  //       });
  //       return teamSeason.id;
  //     } catch (error) {
  //       runInAction("create teamSeason error", () => {
  //         this.submitting = false;
  //       });
  //       toast.error("Problem submitting data");
  //       console.log(error.response);
  //     }
  //   };

  //   @action editTeam = async (team: ITeam) => {
  //     this.submitting = true;
  //     try {
  //       await agent.Teams.update(team);
  //       runInAction("editing team", () => {
  //         this.teamsRegistry.set(team.id, team);
  //         this.team = team;
  //         this.submitting = false;
  //       });
  //     } catch (error) {
  //       runInAction("editing team error", () => {
  //         this.submitting = false;
  //       });
  //       toast.error("Problem submitting data");
  //       console.log(error.response);
  //     }
  //   };

  //   @action deleteTeam = async (
  //     event: SyntheticEvent<HTMLButtonElement>,
  //     id: number
  //   ) => {
  //     this.submitting = true;
  //     this.target = Number.parseInt(event.currentTarget.name);
  //     try {
  //       await agent.Teams.delete(id);
  //       runInAction("deleting team", () => {
  //         this.teamsRegistry.delete(id);
  //         this.submitting = false;
  //         this.target = 0;
  //       });
  //     } catch (error) {
  //       runInAction("delete team error", () => {
  //         this.submitting = false;
  //         this.target = 0;
  //       });
  //       console.log(error);
  //     }
  //   };

  //   @action deleteTeamSeason = async (
  //     event: SyntheticEvent<HTMLButtonElement>,
  //     id: number
  //   ) => {
  //     this.submitting = true;
  //     this.target = Number.parseInt(event.currentTarget.name);
  //     try {
  //       await agent.Teams.deleteTeamSeason(id);
  //       runInAction("deleting teamSeason", () => {
  //         this.teamsSeasonRegistry.delete(id);
  //         this.submitting = false;
  //         this.target = 0;
  //       });
  //     } catch (error) {
  //       runInAction("delete teamSeason error", () => {
  //         this.submitting = false;
  //         this.target = 0;
  //       });
  //       console.log(error);
  //     }
  //   };

  //   @action uploadLogo = async (file: Blob, teamId: number) => {
  //     this.uploadingLogo = true;
  //     try {
  //       await agent.Teams.uploadLogo(file, teamId);
  //       runInAction(() => {
  //         this.uploadingLogo = false;
  //       });
  //     } catch (error) {
  //       console.log(error);
  //       toast.error("Problem uploading logo");
  //       runInAction(() => {
  //         this.uploadingLogo = false;
  //       });
  //     }
  //   };
}
