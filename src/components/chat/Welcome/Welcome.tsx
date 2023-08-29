import React from "react";
import Robot from "../../../assets/img/robot.gif";

type Props = {
  username?: string;
};

const Welcome: React.FC<Props> = ({ username }): JSX.Element => {
  return (
    <div className="welcome">
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{username}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </div>
  );
};

export default Welcome;
