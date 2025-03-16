import { useEffect, useState } from "react"

function Sender() {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000")
    socket.onopen = () => {
      setSocket(socket)
      socket.send(JSON.stringify({ type: "sender" }))
    }
        
    return ()=>{
      socket.close()
    }
  },[])

  async function StartSendingVideo() {
    if (!socket) return null
    const pc = new RTCPeerConnection();

    // create an offer 
    pc.onnegotiationneeded = async () => {
      const offer = await pc.createOffer(); //sdp
      await pc.setLocalDescription(offer);  
      socket?.send(JSON.stringify({ type: "createOffer", sdp: pc.localDescription }));
    }

    pc.onicecandidate = (event) => {
      console.log(event);
      if (event.candidate) {
        socket.send(JSON.stringify({ type: "iceCandidate", candidate: event.candidate }))
      }
    }

    socket.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data)
      if (data.type === "createAnswer") {
        pc.setRemoteDescription(data.sdp)
      } else if (data.type === "iceCandidate") {
        pc.addIceCandidate(data.candidate)
      }
    }

    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    pc.addTrack(stream.getVideoTracks()[0]) 
    const video = document.createElement('video')
    document.body.appendChild(video)
    video.srcObject = stream;
    video.play();
  }

  return (
    <div>
      <button onClick={StartSendingVideo}>Send Video</button>
    </div>
  )
}

export default Sender