import { Container, Sprite } from 'pixi.js';
import { IScene } from '@interfaces';
import { GameManager } from '@core/Managers';
import { io } from 'socket.io-client';

export class SandboxScene extends Container implements IScene {
  private game: GameManager = new GameManager();
  private readonly background: Sprite;

  constructor() {
    super();

    const socket = io('http://localhost:5000', {
      transports: ['websocket'], // Ensure WebSocket transport
    });

    socket.on('connect', () => {
      console.log('Connected to server');
      socket.emit('findAllPlayers');
    });

    socket.on('message', (data) => {
      console.log('Server message:', data);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    this.background = Sprite.from('game_background');
    this.addChild(this.background);

    this.game.audio.stop();
  }

  update(_framesPassed: number): void {}

  resize(_screenWidth: number, _screenHeight: number): void {}
}
