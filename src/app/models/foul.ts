import { IFreeThrow } from "./freethrow";

export interface IFoul {
  id?: number;
  matchId: number;
  minutes: string;
  seconds: string;
  quater: number;
  flagged: boolean; // not in use yet
  isGuest: boolean;
  playerWhoFouledId?: number;
  playerWhoWasFouledId?: number;
  playerAssistId?: number;
  playerReboundId?: number;
  teamReboundId?: number;
  coachId?: number;
  foulType: number;
  playerShooterId?: number;
  accurateShots?: number;
  attempts?: number;
  freeThrows?: IFreeThrow;
}
