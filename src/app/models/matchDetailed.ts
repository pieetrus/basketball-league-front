import { ITeam } from "./team";

export interface IMatchDetailed {
  id?: number;
  division: string;
  startDate: Date;
  ended: boolean;
  attendance: number;
  started: boolean;
  teamHomePts: number;
  teamGuestPts: number;
  teamHomeJerseyColor: string;
  teamGuestJerseyColor: string;
  teamHome: ITeam;
  teamGuest: ITeam;
  lastIncidentMinutes: string;
  lastIncidentSeconds: string;
  lastIncidentQuater: number;
}

export interface IMatchDetailedSquads {
  id?: number;
  division: string;
  teamHome: ITeam;
  teamGuest: ITeam;
  teamHomePlayers: IPlayerShortInfo[];
  teamGuestPlayers: IPlayerShortInfo[];
  playersInGameIds: Number[];
  attendance: number;
  startDate: Date;
  ended: boolean;
  started: boolean;
  teamHomePts: number;
  teamGuestPts: number;
  teamHomeJerseyColor: string;
  teamGuestJerseyColor: string;
  lastIncidentMinutes: string;
  lastIncidentSeconds: string;
  lastIncidentQuater: number;
}

export interface IPlayerShortInfo {
  id?: number; // playerSeasonId
  playerId?: number; // playerId
  name: string;
  surname: string;
  jerseyNr: string;
  position: string;
  height: number;
  isGuest: boolean;
}
