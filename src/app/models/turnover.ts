import { ISteal } from "./steal";

export interface ITurnover {
  id?: number;
  matchId: number;
  minutes: string;
  seconds: string;
  quater: number;
  flagged: boolean; // not in use yet
  isGuest: boolean;
  playerId: number;
  playerStealId?: number;
  turnoverType: number;
  steal?: ISteal;
}
