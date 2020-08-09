export interface IMatchDetailed {
  id?: number;
  division: string;
  teamHome: string;
  teamGuest: string;
  startDate: Date;
  ended: boolean;
  attendance: number;
}
