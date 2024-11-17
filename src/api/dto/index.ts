export type ItemDTO = {
  id: string;
  mappingId: string;
  quantity: number;
  position: number;
  playerId?: string;
  spaceshipId?: string;
  createdAt: string;
  updatedAt: string;
};

export type LoginRequestDTO = {
  email: string;
  password: string;
};

export type RegisterRequestDTO = {
  email: string;
  password: string;
};
