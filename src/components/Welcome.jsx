import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Hello from "../assets/hello.gif";


const Welcome = () => {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const setName =  async () => {
        setUserName(
          await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
          ).username
        );
    }
    setName();
  }, []);
  return (
    <Container>
      <img src={Hello} alt="" />
      <h2>
        Welcome, <span className="dark:text-[#4e0eff] text-[#eedc82]">{userName}!</span>
      </h2>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
`;

export default Welcome;