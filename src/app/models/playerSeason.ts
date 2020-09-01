import { ITeam } from "./team";

export interface IPlayerSeason {
  id?: number;
  playerId?: number;
  name: string;
  surname: string;
  position: string;
  birthdate: Date | null;
  height: string;
  teams?: ITeam[];
}

export class PlayerSeasonFormValues implements IPlayerSeason {
  id?: number = undefined;
  playerId?: number = undefined;
  name: string = "";
  surname: string = "";
  position: string = "";
  birthdate: Date | null = null;
  height: string = "";

  constructor(init?: IPlayerSeason) {
    Object.assign(this, init);
  }
}
