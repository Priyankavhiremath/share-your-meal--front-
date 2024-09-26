import React, { useEffect } from "react";
import BuddySelector from "../components/BuddySelector";
import { useHistory } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import { countries } from "country-data";
import ChatWindow from "./ChatWindow";
import Footer from "./Footer"
import "../styles/SelectionPage.css"

const SelectionPage = ({
  me,
  buddy,
  invitingBuddy,
  connected,
  userVideo,
  connectedUsers,
  handleInviteBuddy,
  acceptedCall,
  incomingCall,
  acceptCall,
  rejectCall,
  userRejectsCall,
  iWasRejected,
  onLogout,
  message,
  messages,
  handleNewMessage,
  setMessage
}) => {
  const history = useHistory(); 
  let buddyName=""
  let buddyNameArray = connectedUsers.filter(user=>user.id===buddy);
  if (buddyNameArray.length >=1) {buddyName=buddyNameArray[0].name}

  useEffect(() => {
    if (acceptedCall) {
      history.push("/call");
    }
  }, [history, acceptedCall]);

  console.log({ vid: userVideo?.current?.srcObject });

  return (
    <div>
      <div className="main-div">
        
        {connected && (
          <div>
            <Container fluid className="selectAndChat">
              <Row className="justify-content-between">
                <Col className="buddySelection" lg={8}>
                  <h1 className="pt-4">Hello {me.name}</h1>
                  <p>
                    You are now online and available for calls. You can call a mealbuddy
                    from the list below or{" "}
                    <Button className="roundButton" onClick={onLogout}>
                      Disconnect
                    </Button>
                    <br />
                  </p>
                  <div className="videoSection shadow-lg my-5" >
                  <video
                    style={{
                      width: "15rem",
                      height: "15rem",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "0.2rem solid white",
                      transform: "rotateY(180deg)",
                      WebkitTransform: "rotateY(180deg)",
                    }}
                    playsInline
                    muted
                    ref={userVideo}
                    autoPlay
                    name="userVideo"
                    ></video>

                    { incomingCall && !acceptedCall && !userRejectsCall && (
                      <div>
                        <h4>
                          {incomingCall.caller.name} <br />
                          from{" "}
                          {countries[incomingCall.caller.country] &&
                            countries[incomingCall.caller.country].name}
                          <br />
                          speaking{" "}
                          {incomingCall.caller.language &&
                            incomingCall.caller.language.map((lang) => lang.label + ", ")}
                          <br />
                          is trying to call you!
                        </h4>
                        <Button className="acceptButton shadow" onClick={() => acceptCall()}>
                          Yes please!
                        </Button>
                        <br />
                        <br />
                        <Button className="rejectButton shadow" onClick={()=> rejectCall()}>Sorry, no</Button>
                      </div>
                    )}
                    {/* { invitingBuddy && buddy && (
                      <div>
                        <h4>Waiting for {buddyName}</h4>
                        <Button 
                        className="roundButton" 
                        onClick={()=>cancelCall()}
                        >Cancel</Button>
                      </div>
                      )} */}
                    { iWasRejected && buddyName && (
                      <h4>Sorry, {buddyName} has no time</h4>
                    )}
                    </div>
                  
                    {!acceptedCall && (
                        <BuddySelector
                            connectedUsers={connectedUsers}
                            me={me}
                            handleInviteBuddy={handleInviteBuddy}
                            invitingBuddy={invitingBuddy}
                            buddy={buddy}
                        />
                    )}
              </Col>
              <Col className="chatContainer" lg={4}>
                {me && (
                <ChatWindow
                  messages={messages}
                  message={message}
                  setMessage={setMessage}
                  onNewMessage={handleNewMessage}
                  connectedUsers={connectedUsers}
                />
                )}
              </Col>
            </Row>
          </Container>
          </div>
        )}
      </div>
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default SelectionPage;
