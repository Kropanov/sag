import { PlayerStateDTO } from '@dto';

export type PlayerJoinRequestDTO = {
  userId: string;
  username: string;
  state: PlayerStateDTO;
};
