import { IPlayerShortInfo } from "./matchDetailed";

export interface IPlayerMatch {
  id: number;
  playerSeasonId: number;
  matchId: number;
  isGuest: boolean;
  pts: number;
  fga: number;
  fgm: number;
  fg3a: number;
  fg3m: number;
  fg2a: number;
  fg2m: number;
  fta: number;
  ftm: number;
  trb: number;
  orb: number;
  drb: number;
  ast: number;
  stl: number;
  blk: number;
  tov: number;
  fouls: number;
  offFouls: number;
  player: IPlayerShortInfo;
}
