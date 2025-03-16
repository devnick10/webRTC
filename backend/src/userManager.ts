import { WebSocket } from "ws";



export class UserManager {
    public senderSocket: null | WebSocket;
    public receiverSocket: null | WebSocket;
    private static instance: UserManager;
    private constructor() {
        this.senderSocket = null;
        this.receiverSocket = null;
    }

    static geInstance() {
        if (!this.instance) {
            this.instance = new UserManager();
        }
        return this.instance
    }

    addSender(ws: WebSocket) {
        this.senderSocket = ws;
    }

    addReceiver(ws: WebSocket) {
        this.receiverSocket = ws;
    }
}