import { IDivision } from "./division";

export interface ISeason {
  id?: number | undefined;
  name: string;
  startDate: Date | null;
  endDate: Date | null;
  divisions: IDivision[];
  divisionsId?: number[];
}

export class SeasonValues implements ISeason {
  id?: number;
  name: string = "";
  startDate: Date | null = null;
  endDate: Date | null = null;
  divisions: IDivision[] = [];
  divisionIds?: number[] = [];

  constructor(init?: ISeason) {
    Object.assign(this, init);
  }
}
