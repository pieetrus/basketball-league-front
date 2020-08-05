export interface ITeamSeason {
  id?: number;
  season: string;
  division: string;
  coachName: string;
  capitainName: string;
  rankingPoints: number;
}

export class ITeamSeasonFormValues implements ITeamSeason {
  id?: number = 0;
  season: string = "";
  division: string = "";
  coachName: string = "";
  capitainName: string = "";
  rankingPoints: number = 0;

  constructor(init?: ITeamSeason) {
    Object.assign(this, init);
  }
}
