import React, { useEffect, useState } from "react";
import HangUp from "../images/hangup.png";
import ProgressBar from "react-bootstrap/ProgressBar";
import LastMinuteMessage from "./LastMinuteMessage";
import { Howl } from "howler";

const CallPage = ({ partnerVideo, userVideo, onCallOngoing, callOngoing, endCall }) => {
  const [callProgress, setCallProgress] = useState(0);
  const [isLastMinute, setIsLastMinute] = useState(false);
  const [areLastSeconds, setAreLastSeconds] = useState(false);
  
  const endSound = new Howl ({
    src: ['/sounds/endBellSoft.mp3'],
    volume: 0.4
  })

  useEffect(()=>{
    const interval = setInterval(()=>{
      setCallProgress((progress)=>progress+1);
    }, 1200); 
    return () => clearInterval(interval);
  },[]);
// set
  useEffect(()=>{
    if (callProgress === 50 )
    {setIsLastMinute(true);
    endSound.play();
    }
  }, [callProgress]);

//call automatic hang up
  useEffect(()=>{
    if (callProgress === 100)
    endCall();
  }, [callProgress]);
//fade out
  useEffect(()=>{
    if (callProgress === 96)
    {setAreLastSeconds(true)}
  }, [callProgress]);

  useEffect(() => {
    onCallOngoing();
  }, [onCallOngoing]);

  return (
    <div>
      
      <ProgressBar className="custom-progress" variant="warning" now={callProgress} />
      {areLastSeconds && (
        <div className="fadeCover" style={{
          width: "100%",
          height: "100vh",
          objectFit: "cover",
          position: "absolute",
          zIndex: 2,
        }}></div>
      )}
      <video
        style={{
          width: "15rem",
          height: "15rem",
          borderRadius: "50%",
          objectFit: "cover",
          border: "0.2rem solid white",
          transform: "rotateY(180deg)",
          WebkitTransform: "rotateY(180deg)",
          position: "absolute",
          top: 50,
          left: 20,
        }}
        playsInline
        muted
        ref={userVideo}
        autoPlay
        name="userVideo"
      ></video>
      { isLastMinute && (
        <div>
          <LastMinuteMessage />
        </div>
      )}
      
      <img
        src={HangUp}
        alt="End call"
        style={{
          position: "absolute",
          width: "4rem",
          bottom: 100,
          right: 10,
          zIndex: 1,
          filter: "invert(100%)",
          cursor: 'pointer'
        }}
        onClick={endCall}
      />
      <video
        style={{
          width: "100%",
          objectFit: "cover",
          height: "100vh",
          zIndex: -1,
        }}
        playsInline
        ref={partnerVideo}
        autoPlay
        name="partnerVideo"
      ></video>
      
    </div>
  );
};

export default CallPage;
