import { PlayerStateDTO } from '@dto';

export type PlayerDTO = {
  userId: string;
  username: string;
  state: PlayerStateDTO;
};
