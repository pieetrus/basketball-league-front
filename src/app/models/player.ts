import { ITeam } from "./team";

export interface IPlayer {
  id?: number;
  name: string;
  surname: string;
  position: string;
  birthdate: Date | null;
  height: string;
  teams?: ITeam[];
}

export class PlayerFormValues implements IPlayer {
  id?: number = undefined;
  name: string = "";
  surname: string = "";
  position: string = "";
  birthdate: Date | null = null;
  height: string = "";

  constructor(init?: IPlayer) {
    Object.assign(this, init);
  }
}
