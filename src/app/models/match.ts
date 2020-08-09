export interface IMatch {
  id?: number;
  divisionId: number;
  teamHomeId: number;
  teamGuestId: number;
  startDate: Date | null;
  ended: boolean;
}

export class MatchFormValues implements IMatch {
  id?: number = undefined;
  divisionId: number = 0;
  teamHomeId: number = 0;
  teamGuestId: number = 0;
  startDate: Date | null = null;
  ended: boolean = false;

  constructor(init?: IMatch) {
    Object.assign(this, init);
  }
}
