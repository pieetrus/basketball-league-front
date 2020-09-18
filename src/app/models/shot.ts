import { IAssist } from "./assist";
import { IRebound } from "./rebound";

export interface IShot {
  id?: number;
  matchId: number;
  playerId: number; // player
  minutes: string;
  seconds: string;
  quater: number;
  flagged: boolean; // not in use yet
  shotType: number;
  isAccurate: boolean;
  isFastAttack: boolean; // not in use yet
  value: number;
  playerAssistId?: number;
  isGuest: boolean;
  reboundType?: number;
  playerReboundId?: number;
  teamReboundId?: number;
  rebound?: IRebound;
  assist?: IAssist;
}
