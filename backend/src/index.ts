import { WebSocketServer, WebSocket } from "ws";
import { UserManager } from "./userManager";

const wss = new WebSocketServer({ port: 3000 });
const userManager = UserManager.geInstance();
// with the help of this global variable we fix identify sender and receiver

// let senderSocket: null | WebSocket = null
// let receiverSocket: null | WebSocket = null

wss.on('connection', (ws) => {
    ws.on("error", console.error);

    ws.on('message', (data: any) => {
        const message = JSON.parse(data)
        console.log(message);

        //   here before those three message we need to identify as sender and receiver 
        /*
        *  We need to support three messages here 
        * Create offer 
        * Create answer 
        * add ice candidates
        */
        if (message.type === "sender") {
            // senderSocket = ws;
            userManager.addSender(ws)
            console.log("sender-set");

        } else if (message.type === "receiver") {
            // receiverSocket = ws;
            userManager.addReceiver(ws);
            console.log("receiver-set");

        } else if (message.type === "createOffer") {
            if (ws !== userManager.senderSocket) {
                return;
            }
            userManager.receiverSocket?.send(JSON.stringify({ type: "createOffer", sdp: message.sdp }))
            console.log("offer created");

        } else if (message.type === "createAnswer") {
            if (ws !== userManager.receiverSocket) {
                return;
            }
            userManager.senderSocket?.send(JSON.stringify({ type: "createAnswer", sdp: message.sdp }))
            console.log("answer created");

        } else if (message.type === "iceCandidate") {
            if (ws === userManager.senderSocket) {
                userManager.receiverSocket?.send(JSON.stringify({ type: "iceCandidate", candidate: message.candidate }))
            } else if (ws === userManager.receiverSocket) {
                userManager.senderSocket?.send(JSON.stringify({ type: "iceCandidate", candidate: message.candidate }))
            }
        }
    });
})