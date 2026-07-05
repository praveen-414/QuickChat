import React from "react";
import SideBar from "../components/SideBar";
import MessageArea from "../components/MessageArea";


const HomePage = () => {
 
  return (
    <div className="flex">
      <SideBar />
      <MessageArea />
    </div>
  );
};

export default HomePage;
