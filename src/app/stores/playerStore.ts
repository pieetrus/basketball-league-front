import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IPlayer } from "../models/player";
import agent from "../api/agent";

configure({ enforceActions: "always" });

class PlayerStore {
  @observable playersRegistry = new Map();
  @observable players: IPlayer[] = [];
  @observable selectedPlayer: IPlayer | undefined;
  @observable loadingInitial = false;
  @observable editMode = false;
  @observable submitting = false;
  @observable target = 0;

  @computed get playersBySurname() {
    return Array.from(this.playersRegistry.values()).sort((a, b) => {
      if (a.surname < b.surname) return -1;
      if (a.surname > b.surname) return 1;
      return 0;
    });
  }

  @action loadPlayers = async () => {
    this.loadingInitial = true;
    try {
      const players = await agent.Players.list();
      runInAction("loading players", () => {
        players.forEach((player) => {
          player.birthdate = player.birthdate.split("T")[0];
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

  @action selectPlayer = (id: number) => {
    this.selectedPlayer = this.playersRegistry.get(id);
    this.editMode = false;
  };

  @action createPlayer = async (player: IPlayer) => {
    this.submitting = true;
    try {
      player.id = await agent.Players.create(player);
      runInAction("creating player", () => {
        this.playersRegistry.set(player.id, player);
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      runInAction("create player error", () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action editPlayer = async (player: IPlayer) => {
    this.submitting = true;
    try {
      await agent.Players.update(player);
      runInAction("editing player", () => {
        this.playersRegistry.set(player.id, player);
        this.selectedPlayer = player;
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      runInAction("editing player error", () => {
        this.submitting = false;
      });
      console.log(error);
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

  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedPlayer = undefined;
  };

  @action cancelSelectedPlayer = () => {
    this.selectedPlayer = undefined;
  };

  @action cancelOpenForm = () => {
    this.editMode = false;
  };

  @action openEditForm = (id: number) => {
    this.editMode = true;
    this.selectedPlayer = this.playersRegistry.get(id);
  };
}

export default createContext(new PlayerStore());
