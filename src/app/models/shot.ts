export interface IShot {
  id?: number;
  matchId: number;
  playerId: number; // player
  minutes: string;
  seconds: string;
  quater: number;
  flagged: boolean; // not in use yet
  shotType: number;
  isAccurate: boolean;
  isFastAttack: boolean; // not in use yet
  value: number;
  PlayerAssistId: number;
}

// export class ShotFormValues implements IShot {
//   id?: number = undefined;
//   name: string = "";
//   shortName: string = "";
//   logoUrl: string = "";

//   constructor(init?: IShot) {
//     Object.assign(this, init);
//   }
// }
