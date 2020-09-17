import { IFoul } from "./foul";
import { IShot } from "./shot";
import { ITimeout } from "./timeout";
import { ITurnover } from "./turnover";

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
  foul?: IFoul;
  //   substitution: IFoul;
  timeout?: ITimeout;
  turnover?: ITurnover;
  //   jumpBall: IFoul;
  //   rebound: IFoul;
  //   jumpBall: IFoul;
}
