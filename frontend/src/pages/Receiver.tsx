import { useEffect, useRef } from "react"

function Receiver() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000")
    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "receiver" }))
    }

    let pc: RTCPeerConnection | null;
    socket.onmessage = async (event: MessageEvent) => {
      const message = JSON.parse(event.data)
      if (message.type === "createOffer") {
        
        //create anwer
        pc = new RTCPeerConnection();
        await pc.setRemoteDescription(message.sdp);
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer)
        console.log(pc.localDescription);
        socket.send(JSON.stringify({ type: "createAnswer", sdp: pc.localDescription }))

        pc.onicecandidate = (event) => {
          console.log(event);
          if (event.candidate) {
            socket.send(JSON.stringify({ type: "iceCandidate", candidate: event.candidate }))
          }
        }

        pc.ontrack = (event) => {
          console.log("ontrack event");
          // temp create elemet better way is use use ref
          const video = document.createElement('video');
          document.body.appendChild(video);
          video.srcObject = new MediaStream([event.track])
          video.play()
        }

        
      } else if (message.type === "iceCandidate") {
        //add the ice candidate
        if (pc) {
          pc.addIceCandidate(message.candidate)
          console.log("ice candidate added to receiver");
        }
      }
    }
    return ()=>{
      socket.close()
    }
  }, [])


  return (
    <div>
      {/* <video ref={videoRef}></video> */}
    </div>
  )
}

export default Receiver