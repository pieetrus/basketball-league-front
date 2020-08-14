export interface IDivision {
  id?: number;
  name: string;
  shortName: string;
}

export class DivisionFormValues implements IDivision {
  id?: number = undefined;
  name: string = " ";
  shortName: string = " ";

  constructor(init?: IDivision) {
    Object.assign(this, init);
  }
}
