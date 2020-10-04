import { observable, computed, action, runInAction, reaction } from "mobx";
import agent from "../api/agent";
import { RootStore } from "./rootStore";
import { toast } from "react-toastify";
import { SyntheticEvent } from "react";
import { ISeason } from "../models/season";

export default class SeasonStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    reaction(
      () => this.predicate.keys(),
      () => {
        this.seasonsRegistry.clear();
        this.loadSeasons();
      }
    );
  }

  @observable loadingInitial = false;
  @observable saving = false;
  @observable deleting = false;
  @observable target = 0;
  @observable seasonsRegistry = new Map();
  @observable season: ISeason | null = null;
  @observable predicate = new Map(); // route params

  @computed get options() {
    let options = this.seasonsByDate.map((season: ISeason) => ({
      key: season.id,
      text: season.name,
      value: season.id,
    }));
    return options;
  }

  @computed get seasonsByDate() {
    return this.sortSeasonsByDate(Array.from(this.seasonsRegistry.values()));
  }

  sortSeasonsByDate(seasons: ISeason[]) {
    const sortedTeams = seasons.sort((a, b) => {
      return (
        new Date(b.startDate!).getTime() - new Date(a.startDate!).getTime()
      );
    });
    return sortedTeams;
  }

  @action loadSeasons = async () => {
    this.loadingInitial = true;
    try {
      const seasons = await agent.Seasons.list();
      runInAction("loading seasons", () => {
        this.seasonsRegistry.clear();
        seasons.forEach((season) => {
          season.startDate = new Date(season.startDate!);
          season.endDate = new Date(season.endDate!);
          this.seasonsRegistry.set(season.id, season);
        });
        let lastSeasonId = seasons.pop()?.id?.toString();
        this.rootStore.teamStore.clearPredicate();
        this.rootStore.playerStore.setPredicate("", "", true);
        this.rootStore.playerStore.setPredicate("seasonId", lastSeasonId);
        this.rootStore.teamStore.setPredicate("seasonId", lastSeasonId);
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("loading seasons error", () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };
  @action loadSeason = async (id: number) => {
    let season = this.getSeason(id);
    if (season) {
      season.startDate = new Date(season.startDate!);
      season.endDate = new Date(season.endDate!);
      this.season = season;
      return season;
    } else {
      this.loadingInitial = true;
      try {
        season = await agent.Seasons.details(id);
        runInAction("loading season", () => {
          this.season = season;
          this.loadingInitial = false;
        });
        return season;
      } catch (error) {
        runInAction("load season error", () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };

  @action clearSeason = () => {
    this.season = null;
  };

  getSeason = (id: number) => {
    return this.seasonsRegistry.get(id);
  };

  @action createSeason = async (season: ISeason) => {
    this.saving = true;
    try {
      season.id = await agent.Seasons.create(season);
      runInAction("creating season", () => {
        // this.seasonsRegistry.set(season.id, season);
        this.saving = false;
      });
      return season.id;
    } catch (error) {
      runInAction("create season error", () => {
        this.saving = false;
      });
      toast.error("Problem submitting data");
      console.log(error.response);
    }
  };

  @action editSeason = async (season: ISeason) => {
    this.saving = true;
    try {
      await agent.Seasons.update(season);
      runInAction("editing season", () => {
        this.seasonsRegistry.set(season.id, season);
        this.season = season;
        this.saving = false;
      });
    } catch (error) {
      runInAction("editing season error", () => {
        this.saving = false;
      });
      toast.error("Problem submitting data");
      console.log(error.response);
    }
  };

  @action deleteSeason = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: number
  ) => {
    this.deleting = true;
    this.target = Number.parseInt(event.currentTarget.name);
    try {
      await agent.Seasons.delete(id);
      runInAction("deleting season", () => {
        this.seasonsRegistry.delete(id);
        this.deleting = false;
        this.target = 0;
      });
      toast.info("Successfully deleted");
    } catch (error) {
      runInAction("delete season error", () => {
        this.deleting = false;
        this.target = 0;
      });
      console.log(error);
    }
  };
}
