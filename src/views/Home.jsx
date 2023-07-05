import React from "react";
import PermissionProvider from "../permissionProvider/permissionProvider";
import Restricted from "../permissionProvider/restricted";
import plotImg from "../images/test_plot.png";

const Home = (props) => {
  return (
    <PermissionProvider permissions={props.user.permissions}>
      <div>
        <h2>Home</h2>
        <div className="userContainer">
          {props.user.name === "" ? null : (
            <span>Howdy partner {props.user.name}! </span>
          )}
        </div>
        <br />
        <Restricted to="element.read">
          <div className="general-container" />
        </Restricted>
        <div className="action-container">
          <Restricted to="element.update">
            <div className="actions">
              <Restricted to="element.add">
                <button className="btn">ADD</button>
                <button className="btn">DELETE</button>
              </Restricted>
                <button className="btn">UPDATE</button>
              <button className="btn">CHANGE COLOR</button>
            </div>
          </Restricted>
          <Restricted to="element.metrics">
            <div className="actions">
              <button className="btn">BUTTON1</button>
              <button className="btn">BUTTON2</button>
              <button className="btn">BUTTON3</button>
            </div>
          </Restricted>
          <Restricted to="element.plot">
            <div className="contenr">
              <img src={plotImg} alt="plot.png" />
            </div>
          </Restricted>
        </div>
      </div>
    </PermissionProvider>
  );
};

export default Home;
