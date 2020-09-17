import { IShot } from "./shot";

export interface IIncident {
  id?: number;
  matchId?: number;
  minutes: string;
  seconds: string;
  incidentType: number;
  quater: number;
  flagged: boolean;
  isGuest: boolean;
  shot?: IShot;
  //   foul: IFoul;
  //   substitution: IFoul;
  //   timeout: IFoul;
  //   turnover: IFoul;
  //   jumpBall: IFoul;
  //   rebound: IFoul;
  //   jumpBall: IFoul;
}
