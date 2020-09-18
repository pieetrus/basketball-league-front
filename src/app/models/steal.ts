import { IPlayer } from "./player";

export interface ISteal {
  id?: number;
  turnoverId?: number;
  playerId: number;
  player?: IPlayer;
}
