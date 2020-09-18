import { IPlayer } from "./player";
import { ITeam } from "./team";

export interface IRebound {
  id?: number;
  reboundType: number;
  shotId?: number;
  freeThrowId?: number;
  playerId?: number;
  teamId?: number;
  player?: IPlayer;
  team?: ITeam;
  // freeThrow? : IFreeThrow;
}
