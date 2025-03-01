import { Container, Sprite } from 'pixi.js';
import { IScene, ItemProps } from '@interfaces';
import { GameManager } from '@core/Managers';
import { io, Socket } from 'socket.io-client';
import { Backpack, Material, Player } from '@core/Entities';
import { ItemRarity, ItemType, PlayerEvents, PlayerResponseEvents } from '@enums';
import {
  GetAllPlayersResponseDTO,
  PlayerActionPerformedResponseDTO,
  PlayerJoinRequestDTO,
  PlayerJoinResponseDTO,
  PlayerLeaveResponseDTO,
} from '@dto';

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

    const itemProps: ItemProps = {
      name: 'item',
      amount: 4,
      asset: 'bread',
      type: ItemType.Material,
      cost: 20,
      description: '',
      rarity: ItemRarity.Common,
    };

    const itemProps1: ItemProps = {
      name: 'item',
      amount: 2,
      asset: 'evil_eye_1',
      type: ItemType.Material,
      cost: 20,
      description: '',
      rarity: ItemRarity.Common,
    };

    const itemProps2: ItemProps = {
      name: 'item',
      amount: 4,
      asset: 'evil_eye_2',
      type: ItemType.Material,
      cost: 20,
      description: '',
      rarity: ItemRarity.Common,
    };

    const itemProps3: ItemProps = {
      name: 'garbage',
      amount: 4,
      asset: 'garbage',
      type: ItemType.Material,
      cost: 20,
      description: '',
      rarity: ItemRarity.Common,
    };

    const item = new Material(itemProps);
    const item1 = new Material(itemProps1);
    const item2 = new Material(itemProps2);

    const item3 = new Material(itemProps3);

    this.backpack = new Backpack();
    this.backpack.push(item);
    this.backpack.push(item1);
    this.backpack.push(item2);
    this.backpack.push(item3);

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

      // TODO: create a method for this code
      if (this.players.size !== 0) {
        for (let clientId of this.players.keys()) {
          const player = this.players.get(clientId);
          if (player) {
            this.removeChild(player.sprite);
          }

          this.players.delete(clientId);
        }
      }

      this.socket.emit(PlayerEvents.GET_ALL, {}, (players: GetAllPlayersResponseDTO) => {
        players.forEach((player) => {
          this.onCreatePlayer(player);
        });
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
          this.onCreatePlayer(message.data);
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
      console.log('Player disconnected');
    });

    this.background = Sprite.from('game_background');
    this.addChild(this.background);
    this.background.zIndex = 0;

    this.game.audio.stop();

    this.game.hud.showHUD();
  }

  updatePlayerState(data: PlayerActionPerformedResponseDTO) {
    const { action, keyCode, clientId } = data;
    const player = this.players.get(clientId);
    if (player) {
      player.updateState(action, keyCode);
    } else {
      this.player.updateState(action, keyCode);
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

  onPlayerLeave(data: PlayerLeaveResponseDTO) {
    const player = this.players.get(data.clientId);

    if (player) {
      this.removeChild(player.sprite);
    }

    this.players.delete(data.clientId);
  }

  onCreatePlayer(data: PlayerJoinResponseDTO) {
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
