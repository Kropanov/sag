export type PlayerJoinRequestDTO = {
  userId: string;
  username: string;
  state: {
    position: {
      x: number;
      y: number;
    };
    health: number;
  };
};
