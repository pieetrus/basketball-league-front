export interface ITeamSeason {
  id: number;
  seasonId: number;
  divisionId: number;
  coachId: number | null;
  capitainId: number | null;
  teamId: number | null;
  // rankingPoints: number;
}

export class TeamSeasonFormValues implements ITeamSeason {
  id: number = 0;
  seasonId: number = 0;
  divisionId: number = 0;
  coachId: number | null = null;
  capitainId: number | null = null;
  teamId: number | null = null;
  // rankingPoints: number = 0;

  constructor(init?: ITeamSeason) {
    Object.assign(this, init);
  }
}
