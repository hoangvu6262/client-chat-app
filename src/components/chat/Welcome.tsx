import React, { useState, useEffect } from "react";
import Robot from "../../assets/img/robot.gif";

const Welcome: React.FC = (): JSX.Element => {
  const [userName, setUserName] = useState<string>("");
  //   useEffect(() => {
  //     async () => {
  //       setUserName(
  //         await JSON.parse(
  //           localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  //         ).username
  //       );
  //     };
  //   }, []);
  return (
    <div className="welcome">
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </div>
  );
};

export default Welcome;
