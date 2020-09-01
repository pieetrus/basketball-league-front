export interface IDivision {
  id?: number;
  name: string;
  shortName: string;
  level: number;
}

export class DivisionFormValues implements IDivision {
  id?: number = undefined;
  name: string = " ";
  shortName: string = " ";
  level: number = 0;

  constructor(init?: IDivision) {
    Object.assign(this, init);
  }
}
