import { IPlayer } from "./player";

export interface IAssist {
  id?: number;
  shotId?: number;
  playerId: number;
  freeThrowId?: number;
  player?: IPlayer;
}
