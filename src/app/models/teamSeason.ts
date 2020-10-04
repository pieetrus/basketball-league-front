import { ITeam } from "./team";

export interface ITeamSeason {
  id: number;
  seasonId: number;
  divisionId: number;
  season: string;
  division: string;
  coachId: number | null;
  capitainId: number | null;
  teamId: number | null;
  rankingPoints: number;
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
  team: ITeam;
  wins: number;
  lost: number;
}
