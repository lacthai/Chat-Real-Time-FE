import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import { BsFillSunFill, BsMoonStarsFill } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import useDarkMode from "../components/useDarkMode";
import Logout from "../components/Logout";

const Chat = () => {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const [showSetting, setShowSetting] = useState(false);

  const handleSetting = () => {
    setShowSetting(!showSetting);
  }

  useEffect(() => {
    const currentUser = async () => {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/login");
      } else {
        setCurrentUser(
          await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
          )
        );
      }
    };
    currentUser();
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    fetchData();
  }, [currentUser]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
      <Container className="dark:bg-[#131324] bg-[#fff8dc]">
        <div className="button_setting dark:bg-[thistle] dark:text-[plum] bg-[#181818] text-[#505050]" onClick={handleSetting}>
          <AiFillSetting size={"2rem"}/>
        {isDarkMode ? (
        <div className={`change-mode_Sun ${showSetting ? "active" : ""}`} onClick={() => toggleDarkMode(isDarkMode)}>
          <BsFillSunFill size={"2rem"} color="#f0c35c"/>
        </div>
        ) : (
          <div className={`change-mode_Dark ${showSetting ? "active" : ""}`} onClick={() => toggleDarkMode(isDarkMode)}>
          <BsMoonStarsFill size={"2rem"} color="#8A2BE2"/>
        </div>
        )}
        <div className={`button_logout ${showSetting ? "active" : ""}`} >
          <Logout/>
        </div>
        </div>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  position: relative;
  .button_setting {
    position: absolute;
    right: 0;
    bottom: 0;
    margin: 20px;
    heigth: 60px;
    width: 60px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    aligh-items: center;
    padding: 12px;
    cursor: pointer;
  }
  .change-mode_Sun {
    display: none;
  }
  .change-mode_Sun.active {
    display: flex;
    justify-content: center;
    aligh-items: center;
    position: absolute;
    right: 5px;
    bottom: 75px;
    background: #f8e5b9;
    heigth: 50px;
    width: 50px;
    border-radius: 50%;
    padding: 9px;
    cursor: pointer;
    box-shadow: #fdf6e8 0px 2px 8px 0px;
    z-index: 1000;
  }
  .change-mode_Dark {
    display:none
  }
  .change-mode_Dark.active {
    position: absolute;
    right: 5px;
    bottom: 75px;
    background: #9370DB;
    heigth: 50px;
    width: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    aligh-items: center;
    padding: 9px;
    cursor: pointer;
    box-shadow: #4B0082 0px 2px 8px 0px;
    z-index: 1000;
  }
  .button_logout {
    display: none;
  }
  .button_logout.active {
    display: block;
    position: absolute;
    right: 5px;
    bottom: 140px;
  }
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    border-radius: 25px;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
