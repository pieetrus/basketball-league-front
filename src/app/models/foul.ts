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
  coachId?: number;
  foulType: number;
}
