import { Container, Sprite } from 'pixi.js';
import { IScene } from '@interfaces';
import { GameManager } from '@core/Managers';
import { io, Socket } from 'socket.io-client';
import { Backpack, Player } from '@core/Entities';

export class SandboxScene extends Container implements IScene {
  private game: GameManager = new GameManager();
  private readonly background: Sprite;
  private readonly player: Player;
  private readonly backpack: Backpack;
  private readonly enemies: any = [];

  private players = new Map<string, Player>();

  private floorBounds = { left: 0, right: 0, top: 0, bottom: 0 };

  private socket: Socket;

  constructor() {
    super();

    this.backpack = new Backpack();
    this.player = new Player('bunny', 100, 100, this.backpack);
    this.player.sprite.zIndex = 2;
    this.addChild(this.player.sprite);

    // this.addChild(this.player.sprite);
    this.updateFloorBounds();

    const uri = import.meta.env.VITE_WEBSOCKET_BASE_URL || 'http://localhost:5000';

    this.socket = io(uri, {
      transports: ['websocket'], // Ensure WebSocket transport
    });

    console.log('Userdata:', this.game.user.userId, this.game.user.username);

    this.socket.on('connect', () => {
      console.log('Connected to server');

      this.socket.emit('findAllPlayers', {}, (value: any) => {
        console.log('findAllPlayers', value);
        for (const data of value) {
          if (this.game.user.userId === data.id) {
            return;
          }

          const backpack = new Backpack();
          const player = new Player('bunny', data.state.position.x, data.state.position.y, backpack);
          this.addChild(player.sprite);

          this.players.set(data.clientId, player);
        }
      });

      this.socket.emit('joined', { id: this.game.user.userId }, (value: any) => {
        // this.player
        console.log('!!!', value);
      });
    });

    this.socket.on('message', (message) => {
      switch (message.type) {
        case 'new_player':
          this.createNewPlayer(message.data);
          break;
        case 'move':
          this.movePlayer(message.data);
          break;
      }
    });

    this.socket.on('disconnect', () => {
      this.socket.send('leave', this.game.user.userId);
    });

    this.background = Sprite.from('game_background');
    this.addChild(this.background);
    this.background.zIndex = 0;

    this.game.audio.stop();

    this.game.hud.showHUD();
  }

  private movePlayer(data: any) {
    const player = this.players.get(data.clientId);
    if (player && data.player.id !== this.game.user.userId) {
      console.log(data.player.id, data.player.state.position.y);

      player.sprite.x = data.player.state.position.x;
      player.sprite.y = data.player.state.position.y;
    }
  }

  createNewPlayer(_data: any) {
    // if (this.players.includes(data.playerId)) {
    //   return;
    // }

    if (this.game.user.userId === _data.player.id) {
      return;
    }

    const backpack = new Backpack();
    const player = new Player('bunny', this.player.prevX, this.player.prevY, backpack);
    this.addChild(player.sprite);

    this.players.set(_data.clientId, player);

    console.log('!!!!!!!!!', this.players);
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

  // private moveCurrentPlayer(x: number, y: number) {
  //   const player = this.players.get(this.game.user.userId ?? '');
  //   player?.move(x, y);
  //   this.socket.emit('move', { id: this.game.user.userId, x: player?.sprite.x, y: player?.sprite.y });
  // }

  private handleInput() {}

  update(_framesPassed: number): void {
    this.handleInput();

    this.player.loop(_framesPassed, this.enemies, this.floorBounds, this.socket);
  }

  resize(_screenWidth: number, _screenHeight: number): void {
    this.updateFloorBounds(_screenWidth, _screenHeight);
  }
}
