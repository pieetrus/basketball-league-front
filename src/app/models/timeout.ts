export interface ITimeout {
  id?: number;
  matchId: number;
  minutes: string;
  seconds: string;
  quater: number;
  flagged: boolean; // not in use yet
  isGuest: boolean;
  teamId: number;
}
