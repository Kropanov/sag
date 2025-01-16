import { io, Socket } from 'socket.io-client';

export abstract class BaseSocketService {
  protected socket: Socket;

  constructor(uri: string) {
    this.socket = io(uri, {
      transports: ['websocket'],
    });
  }

  // FIXME: type
  protected connect(clbs: { onConnect: () => {}; onDisconnect: () => {}; onConnectError: () => {} }): void {
    this.setupBaseListeners(clbs);
  }

  protected setupBaseListeners(clbs: { onConnect: () => {}; onDisconnect: () => {}; onConnectError: () => {} }): void {
    this.socket.on('connect', () => {
      console.log('Connected to server');
      clbs.onConnect();
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
      clbs.onDisconnect();
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      clbs.onConnectError();
    });
  }

  public disconnect(): void {
    this.socket.disconnect();
  }

  public isConnected(): boolean {
    return this.socket.connected;
  }
}
