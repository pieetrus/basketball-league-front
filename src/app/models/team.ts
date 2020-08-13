export interface ITeam {
  id?: number;
  name: string;
  shortName: string;
  logoUrl: string;
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
