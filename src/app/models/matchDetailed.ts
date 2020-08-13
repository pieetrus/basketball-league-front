import { ITeam } from "./team";

export interface IMatchDetailed {
  id?: number;
  division: string;
  teamHome: string;
  teamGuest: string;
  startDate: Date;
  ended: boolean;
  attendance: number;
}

export interface IMatchDetailedSquads {
  id?: number;
  division: string;
  teamHome: ITeam;
  teamGuest: ITeam;
  teamHomePlayers: IPlayerShortInfo[];
  teamGuestPlayers: IPlayerShortInfo[];
  attendance: number;
  startDate: Date;
  ended: boolean;
}

export interface IPlayerShortInfo {
  id?: number; // playerMatchId
  name: string;
  surname: string;
  jerseyNr: string;
  position: string;
  height: number;
}
