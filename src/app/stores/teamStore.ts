import { observable, computed, action, runInAction, reaction } from "mobx";
import agent from "../api/agent";
import { RootStore } from "./rootStore";
import { ITeam } from "../models/team";
import { toast } from "react-toastify";
import { SyntheticEvent } from "react";

export default class TeamStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    reaction(
      () => this.predicate.keys(),
      () => {
        this.teamsRegistry.clear();
        this.loadTeams();
      }
    );
  }

  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = 0;
  @observable teamsRegistry = new Map();
  @observable team: ITeam | null = null;
  @observable uploadingLogo = false;
  @observable predicate = new Map(); // route params

  @computed get options() {
    let options = this.teamsByName.map((team) => ({
      key: team.shortName,
      text: team.name,
      value: team.id,
    }));
    return options;
  }

  @computed get teamsByName() {
    return this.sortTeamsByName(Array.from(this.teamsRegistry.values()));
  }

  sortTeamsByName(teams: ITeam[]) {
    const sortedTeams = teams.sort((a, b) => {
      if (a.name.toUpperCase() < b.name.toUpperCase()) return -1;
      if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
      return 0;
    });
    return sortedTeams;
  }

  @action loadTeams = async () => {
    this.loadingInitial = true;
    try {
      const teams = await agent.Teams.list();
      runInAction("loading teams", () => {
        teams.forEach((team) => {
          this.teamsRegistry.set(team.id, team);
          this.loadingInitial = false;
        });
      });
    } catch (error) {
      runInAction("loading teams error", () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };
  @action loadTeam = async (id: number) => {
    let team = this.getTeam(id);
    if (team) {
      this.team = team;
      return team;
    } else {
      this.loadingInitial = true;
      try {
        team = await agent.Teams.details(id);
        runInAction("loading team", () => {
          this.team = team;
          this.loadingInitial = false;
        });
        return team;
      } catch (error) {
        runInAction("load team error", () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };

  @action clearTeam = () => {
    this.team = null;
  };

  getTeam = (id: number) => {
    return this.teamsRegistry.get(id);
  };

  @action createTeam = async (team: ITeam) => {
    this.submitting = true;
    try {
      team.id = await agent.Teams.create(team);
      runInAction("creating team", () => {
        this.teamsRegistry.set(team.id, team);
        this.submitting = false;
      });
      return team.id;
    } catch (error) {
      runInAction("create team error", () => {
        this.submitting = false;
      });
      toast.error("Problem submitting data");
      console.log(error.response);
    }
  };

  @action editTeam = async (team: ITeam) => {
    this.submitting = true;
    try {
      await agent.Teams.update(team);
      runInAction("editing team", () => {
        this.teamsRegistry.set(team.id, team);
        this.team = team;
        this.submitting = false;
      });
    } catch (error) {
      runInAction("editing team error", () => {
        this.submitting = false;
      });
      toast.error("Problem submitting data");
      console.log(error.response);
    }
  };

  @action deleteTeam = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: number
  ) => {
    this.submitting = true;
    this.target = Number.parseInt(event.currentTarget.name);
    try {
      await agent.Players.delete(id);
      runInAction("deleting team", () => {
        this.teamsRegistry.delete(id);
        this.submitting = false;
        this.target = 0;
      });
    } catch (error) {
      runInAction("delete team error", () => {
        this.submitting = false;
        this.target = 0;
      });
      console.log(error);
    }
  };

  @action uploadLogo = async (file: Blob, teamId: number) => {
    this.uploadingLogo = true;
    try {
      await agent.Teams.uploadLogo(file, teamId);
      runInAction(() => {
        this.uploadingLogo = false;
      });
    } catch (error) {
      console.log(error);
      toast.error("Problem uploading logo");
      runInAction(() => {
        this.uploadingLogo = false;
      });
    }
  };
}
