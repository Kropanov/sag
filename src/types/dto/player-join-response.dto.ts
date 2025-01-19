import { PlayerDTO } from '@dto';

export type PlayerJoinResponseDTO = {
  clientId: string;
  player: PlayerDTO;
};
