import { Container, Sprite } from 'pixi.js';
import { IScene } from '@interfaces';
import { GameManager } from '@core/Managers';
import { io } from 'socket.io-client';
import { Backpack, Player } from '@core/Entities';

export class SandboxScene extends Container implements IScene {
  private game: GameManager = new GameManager();
  private readonly background: Sprite;
  private players: Player[] = [];
  private readonly player: Player;
  private readonly backpack: Backpack;
  private readonly enemies: any = [];

  private floorBounds = { left: 0, right: 0, top: 0, bottom: 0 };

  constructor() {
    super();

    this.backpack = new Backpack();
    this.player = new Player('bunny', 100, 100, this.backpack);
    console.log(this.players);
    this.addChild(this.player.sprite);
    this.updateFloorBounds();

    const uri = import.meta.env.VITE_WEBSOCKET_BASE_URL || 'http://localhost:5000';

    const socket = io(uri, {
      transports: ['websocket'], // Ensure WebSocket transport
    });

    console.log('Userdata:', this.game.user.userId, this.game.user.username);

    socket.on('connect', () => {
      console.log('Connected to server');
      socket.emit('joined', {}, (value: any) => {
        console.log(value);
      });
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

  private updateFloorBounds(_screenWidth?: number, _screenHeight?: number): void {
    const screenWidth = _screenWidth || this.game.size.getWidth();
    const screenHeight = _screenHeight || this.game.size.getHeight();

    this.floorBounds = {
      left: 0,
      right: screenWidth,
      top: 0,
      bottom: screenHeight,
    };
  }

  update(_framesPassed: number): void {
    this.player.update(_framesPassed, this.enemies, this.floorBounds);
  }

  resize(_screenWidth: number, _screenHeight: number): void {
    this.updateFloorBounds(_screenWidth, _screenHeight);
  }
}
