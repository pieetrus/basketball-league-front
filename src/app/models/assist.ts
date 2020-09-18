import { IPlayer } from "./player";

export interface IAssist {
  id?: number;
  shotId?: number;
  playerId: number;
  teamId?: number;
  freeThrowId?: number;
  player?: IPlayer;
}
