import { Container, Sprite } from 'pixi.js';
import { IScene } from '@interfaces';
import { GameManager } from '@core/Managers';
import { io, Socket } from 'socket.io-client';
import { Backpack, Player } from '@core/Entities';
import { PlayerEvents, PlayerResponseEvents } from '@enums';
import { GetAllPlayersResponseDTO, PlayerJoinRequestDTO, PlayerJoinResponseDTO } from '@dto';

export class SandboxScene extends Container implements IScene {
  private game: GameManager = new GameManager();
  private readonly background: Sprite;
  private readonly player: Player;
  private readonly backpack: Backpack;
  private readonly enemies: any = [];

  private players = new Map<string, Player>();

  private floorBounds = { left: 0, right: 0, top: 0, bottom: 0 };

  private readonly socket: Socket;

  constructor() {
    super();

    this.backpack = new Backpack();
    this.player = new Player('bunny', 100, 100, this.backpack);
    this.player.sprite.zIndex = 2;
    this.addChild(this.player.sprite);

    // this.addChild(this.player.sprite);
    this.updateFloorBounds();

    this.game.keyboard.onKeyDown(this.handleKeyDown.bind(this));
    this.game.keyboard.onKeyUp(this.handleKeyUp.bind(this));

    const uri = import.meta.env.VITE_WEBSOCKET_BASE_URL || 'http://localhost:5000';

    this.socket = io(uri, {
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      console.log('Connected to server');

      this.socket.emit(PlayerEvents.GET_ALL, {}, (players: GetAllPlayersResponseDTO) => {
        for (const data of players) {
          const { clientId, player } = data;

          if (player.userId === this.game.user.userId) {
            return;
          }

          const backpack = new Backpack();
          const newPlayer = new Player('bunny', player.state.position.x, player.state.position.y, backpack);

          this.addChild(newPlayer.sprite);

          this.players.set(clientId, newPlayer);
        }
      });

      const player: PlayerJoinRequestDTO = {
        userId: this.game.user.userId ?? '',
        username: this.game.user.username ?? '',
        state: {
          position: {
            x: this.player.prevX,
            y: this.player.prevY,
          },
          health: 100,
        },
      };

      this.socket.emit(PlayerEvents.JOIN, player);
    });

    this.socket.on('message', (message) => {
      console.log('message', message);
      switch (message.type) {
        case PlayerResponseEvents.JOINED:
          this.createNewPlayer(message.data);
          break;
        case PlayerResponseEvents.LEFT:
          this.onPlayerLeave(message.data);
          break;
        case PlayerResponseEvents.ACTION_PERFORMED:
          this.updatePlayerState(message.data);
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

  updatePlayerState(data: any) {
    const player = this.players.get(data.clientId);
    if (player) {
      player.updateState(data.action, data.keyCode);
    } else {
      this.player.updateState(data.action, data.keyCode);
    }
  }

  private handleKeyDown(keyCode: string): void {
    if (!this.game.keyboard.activeKeys.has(keyCode)) {
      this.socket.emit(PlayerEvents.ACTION, {
        action: 'keydown',
        keyCode,
        position: {
          x: this.player.prevX,
          y: this.player.prevY,
        },
      });
    }
  }

  private handleKeyUp(keyCode: string): void {
    if (this.game.keyboard.activeKeys.has(keyCode)) {
      this.socket.emit(PlayerEvents.ACTION, {
        action: 'keyup',
        keyCode,
        position: {
          x: this.player.prevX,
          y: this.player.prevY,
        },
      });
    }
  }

  onPlayerLeave(data: any) {
    const player = this.players.get(data.clientId);

    if (player) {
      this.removeChild(player.sprite);
    }

    this.players.delete(data.clientId);
  }

  createNewPlayer(data: PlayerJoinResponseDTO) {
    const { player, clientId } = data;

    if (this.game.user.userId === player.userId) {
      return;
    }

    const backpack = new Backpack();
    const newPlayer = new Player('bunny', player.state.position.x, player.state.position.y, backpack);
    this.addChild(newPlayer.sprite);

    this.players.set(clientId, newPlayer);
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
    this.player.loop(_framesPassed, this.enemies, this.floorBounds);

    for (let player of this.players.values()) {
      player.loop(_framesPassed, this.enemies, this.floorBounds);
    }
  }

  resize(_screenWidth: number, _screenHeight: number): void {
    this.updateFloorBounds(_screenWidth, _screenHeight);
  }
}
