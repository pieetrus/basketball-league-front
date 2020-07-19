import { observable, action, computed } from "mobx";
import { createContext } from "react";
import { IPlayer } from "../models/player";
import agent from "../api/agent";

class PlayerStore {
  @observable players: IPlayer[] = [];
  @observable selectedPlayer: IPlayer | undefined;
  @observable loadingInitial = false;
  @observable editMode = false;
  @observable submitting = false;

  // @computed get playersBySurname() {
  //   return this.players.sort((a, b) => {
  //     if (a.surname < b.surname) return -1;
  //     if (a.surname > b.surname) return 1;
  //     return 0;
  //   });
  // }

  @action loadPlayers = async () => {
    this.loadingInitial = true;
    try {
      const players = await agent.Players.list();
      players.forEach((player) => {
        player.birthdate = player.birthdate.split("T")[0];
        this.players.push(player);
      });
      this.loadingInitial = false;
    } catch (error) {
      console.log(error);
      this.loadingInitial = false;
    }
  };

  @action selectPlayer = (id: number) => {
    this.selectedPlayer = this.players.find((x) => x.id === id);
    this.editMode = false;
  };

  @action createPlayer = async (player: IPlayer) => {
    this.submitting = true;
    try {
      player.id = await agent.Players.create(player);
      this.players.push(player);
      this.editMode = false;
      this.submitting = false;
    } catch (error) {
      console.log(error);
      this.submitting = false;
    }
  };

  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedPlayer = undefined;
  };
}

export default createContext(new PlayerStore());
