export interface ITeam {
  id?: number;
  name: string;
  shortName: string;
  logoUrl: string;
  fouls1Qtr?: number;
  fouls2Qtr?: number;
  fouls3Qtr?: number;
  fouls4Qtr?: number;
  timeouts1Half?: number;
  timeouts2Half?: number;
}

export class TeamFormValues implements ITeam {
  id?: number = undefined;
  name: string = "";
  shortName: string = "";
  logoUrl: string = "";

  constructor(init?: ITeam) {
    Object.assign(this, init);
  }
}
