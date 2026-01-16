type MessageHandler = (data: any) => void;

export class WebSocketService {
  private socket: WebSocket | null = null;

  connect(url: string, onMessage: MessageHandler) {
    this.socket = new WebSocket(url);

    this.socket.onopen = () => console.log("WebSocket connected");
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };
    this.socket.onclose = () => console.log("WebSocket disconnected");
    this.socket.onerror = (error) => console.error("WebSocket error:", error);
  }

  send(data: any) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    }
  }

  disconnect() {
    this.socket?.close();
  }
}

export const websocketService = new WebSocketService();