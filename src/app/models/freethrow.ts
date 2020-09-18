import { IAssist } from "./assist";
import { IFoul } from "./foul";
import { IPlayer } from "./player";
import { IRebound } from "./rebound";

export interface IFreeThrow {
  id?: number;
  foulId?: number;
  playerShooterId?: number;
  accurateShots: number;
  attempts: number;
  foul?: IFoul;
  assist?: IAssist;
  rebound?: IRebound;
}
