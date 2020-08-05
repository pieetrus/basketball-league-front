export interface ITeam {
  id?: number;
  name: string;
  shortName: string;
}

export class TeamFormValues implements ITeam {
  id?: number = undefined;
  name: string = "";
  shortName: string = "";

  constructor(init?: ITeam) {
    Object.assign(this, init);
  }
}
