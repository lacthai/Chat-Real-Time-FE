import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";

const Logout = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    const id = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    )._id;
    const data = await axios.get(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };
  return (
    <Button onClick={handleClick} className="dark:bg-[#ff7366] bg-black dark:shadow-indigo-500/50 shadow-cyan-500/50">
      <BiPowerOff />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  heigth: 50px;
  width: 50px;
  border-radius: 50%;
  padding: 9px;
  border: none;
  cursor: pointer;
  svg {
    font-size: 2rem;
    color: #ebe7ff;
  }
`;

export default Logout;