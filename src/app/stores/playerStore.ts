import { observable, action, computed, runInAction, reaction } from "mobx";
import { SyntheticEvent } from "react";
import { IPlayer } from "../models/player";
import agent from "../api/agent";
import { toast } from "react-toastify";
import { RootStore } from "./rootStore";
import { IPlayerSeason } from "../models/playerSeason";

export default class PlayerStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    reaction(
      () => this.predicate.keys(),
      () => {
        this.playersRegistry.clear();
        this.loadPlayers();
      }
    );
  }

  @observable playersRegistry = new Map();
  @observable playersSeasonRegistry = new Map();
  @observable player: IPlayer | null = null;
  @observable loadingInitial = false;
  @observable loadingInitialPlayerSeason = false;
  @observable submitting = false;
  @observable target = 0;
  @observable predicate = new Map(); // route params

  @action setPredicate = (
    predicate: string,
    value: string = "",
    clear: boolean = false
  ) => {
    if (clear) this.predicate.clear();
    if (predicate !== "all") this.predicate.set(predicate, value);
  };

  @computed get axiosParams() {
    const params = new URLSearchParams();
    this.predicate.forEach((value, key) => {
      params.append(key, value);
    });
    return params;
  }

  @computed get playersBySurname() {
    return this.groupPlayersBySurname(
      Array.from(this.playersRegistry.values())
    );
  }

  @computed get playersSeason() {
    let playersSeason: IPlayerSeason[] = Array.from(
      this.playersSeasonRegistry.values()
    );
    return playersSeason;
  }

  @computed get optionsExludingSelected() {
    let filteredPlayers = this.filterPlayers(
      Array.from(this.playersRegistry.values()),
      Array.from(this.playersSeasonRegistry.values())
    );

    let options = filteredPlayers.map((player) => ({
      key: player.id,
      text: player.name + " " + player.surname,
      value: player.id,
    }));
    return options;
  }

  filterPlayers(filteredArray: IPlayer[], toRemove: IPlayerSeason[]) {
    for (var i = filteredArray.length - 1; i >= 0; i--) {
      for (var j = 0; j < toRemove.length; j++) {
        if (filteredArray[i] && filteredArray[i].id === toRemove[j].playerId) {
          filteredArray.splice(i, 1);
        }
      }
    }
    return filteredArray;
  }

  groupPlayersBySurname(players: IPlayer[]) {
    const sortedPlayers = players.sort((a, b) => {
      if (a.surname.toUpperCase() < b.surname.toUpperCase()) return -1;
      if (a.surname.toUpperCase() > b.surname.toUpperCase()) return 1;
      return 0;
    });
    return Object.entries(
      sortedPlayers.reduce((players, player) => {
        const firstLetter = player.surname.charAt(0).toUpperCase();
        players[firstLetter] = players[firstLetter]
          ? [...players[firstLetter], player]
          : [player];
        return players;
      }, {} as { [key: string]: IPlayer[] })
    );
  }

  @action loadPlayers = async () => {
    this.loadingInitial = true;
    try {
      const players = await agent.Players.list(this.axiosParams);
      runInAction("loading players", () => {
        players.forEach((player) => {
          player.birthdate = new Date(player.birthdate!);
          this.playersRegistry.set(player.id, player);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("loading players error", () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action loadPlayersSeason = async () => {
    this.loadingInitial = true;
    this.playersSeasonRegistry.clear();
    try {
      const players = await agent.Players.listSeason(this.axiosParams);
      runInAction("loading playersSeason", () => {
        players.forEach((player) => {
          player.birthdate = new Date(player.birthdate!);
          this.playersSeasonRegistry.set(player.id, player);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("loading playersSeason error", () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action loadPlayerSeasonStats = async (playerId: number) => {
    this.loadingInitialPlayerSeason = true;
    this.playersSeasonRegistry.clear();
    try {
      const players = await agent.Players.listSeasonStats(playerId);
      runInAction("loading playersSeason", () => {
        players.forEach((player) => {
          player.birthdate = new Date(player.birthdate!);
          this.playersSeasonRegistry.set(player.id, player);
        });
        this.loadingInitialPlayerSeason = false;
      });
    } catch (error) {
      runInAction("loading playersSeason error", () => {
        this.loadingInitialPlayerSeason = false;
      });
      console.log(error);
    }
  };

  @action loadPlayer = async (id: number) => {
    let player = this.getPlayer(id);
    if (player) {
      this.player = player;
      return player;
    } else {
      this.loadingInitial = true;
      try {
        player = await agent.Players.details(id);
        runInAction("loading player", () => {
          player.birthdate = new Date(player.birthdate!);
          this.player = player;
          this.loadingInitial = false;
        });
        return player;
      } catch (error) {
        runInAction("load player error", () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };

  @action clearPlayer = () => {
    this.player = null;
  };

  getPlayer = (id: number) => {
    let player: IPlayer = this.playersRegistry.get(id);
    return player;
  };

  @action createPlayer = async (player: IPlayer) => {
    this.submitting = true;
    try {
      player.id = await agent.Players.create(player);
      runInAction("creating player", () => {
        this.playersRegistry.set(player.id, player);
        this.submitting = false;
      });
      return player.id;
    } catch (error) {
      runInAction("create player error", () => {
        this.submitting = false;
      });
      toast.error("Problem submitting data");
      console.log(error.response);
    }
  };

  @action createPlayerSeason = async (player: IPlayerSeason) => {
    this.submitting = true;
    try {
      player.id = await agent.Players.createPlayerSeason(player);
      runInAction("creating playerseason", () => {
        this.playersSeasonRegistry.set(player.id, player);
        this.submitting = false;
        this.loadPlayersSeason();
      });
      return player.id;
    } catch (error) {
      runInAction("create playerseason error", () => {
        this.submitting = false;
      });
      toast.error("Problem submitting data");
      console.log(error.response);
    }
  };

  @action editPlayer = async (player: IPlayer) => {
    this.submitting = true;
    try {
      await agent.Players.update(player);
      runInAction("editing player", () => {
        this.playersRegistry.set(player.id, player);
        this.player = player;
        this.submitting = false;
      });
    } catch (error) {
      runInAction("editing player error", () => {
        this.submitting = false;
      });
      toast.error("Problem submitting data");
      console.log(error.response);
    }
  };

  @action deletePlayer = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: number
  ) => {
    this.submitting = true;
    this.target = Number.parseInt(event.currentTarget.name);
    try {
      await agent.Players.delete(id);
      runInAction("deleting player", () => {
        this.playersRegistry.delete(id);
        this.submitting = false;
        this.target = 0;
      });
    } catch (error) {
      runInAction("delete player error", () => {
        this.submitting = false;
        this.target = 0;
      });
      console.log(error);
    }
  };

  @action deletePlayerSeason = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: number
  ) => {
    this.submitting = true;
    this.target = Number.parseInt(event.currentTarget.name);
    try {
      await agent.Players.deletePlayerSeason(id);
      runInAction("deleting playerSeason", () => {
        this.playersSeasonRegistry.delete(id);
        this.submitting = false;
        this.target = 0;
      });
    } catch (error) {
      runInAction("delete playerSeason error", () => {
        this.submitting = false;
        this.target = 0;
      });
      console.log(error);
    }
  };
}
