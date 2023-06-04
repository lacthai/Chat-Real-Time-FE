import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";

const Contacts = ({ contacts, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [searchContact, setSearchContact] = useState("");
  useEffect(() => {
    const currentUser = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
    };
    currentUser();
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container className="dark:bg-[#080420] bg-[#909090]">
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3 className="dark:text-white text-orange-300">PeaChat</h3>
          </div>
          <div className="searching">
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => {
                setSearchContact(e.target.value);
              }}
              className="dark:bg-[#787878] #D8D8D8 dark:text-white text-neutral-600"
            />
          </div>
          <div className="contacts">
            {contacts.filter((val)=> {
              if (searchContact === "") {
                return val;
              }
              else if (val.username.toLowerCase().includes(searchContact.toLowerCase())) {
                return val;
              }
            }).map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`dark:bg-[#ffffff34] bg-[#F5F5F5] min-h-[5rem] cursor-pointer w-[90%] rounded-[0.2rem] 
                              p-[0.4rem] flex gap-[1rem] items-center ease-in-out duration-[0.5s]  ${
                    index === currentSelected ? "dark:bg-[#9370DB] bg-[#ffdab9]" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                      className="h-[3rem]"
                    />
                  </div>
                  <div className="username">
                    <h3 className="dark:text-white text-black">{contact.username}</h3>
                    <h4>{}</h4>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user dark:bg-[#0d0d30] bg-[#D0D0D0]">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2 className="dark:text-white text-[#606060]">{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 10% 65% 15%;
  overflow: hidden;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      text-transform: uppercase;
    }
  }
  .searching {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin-bottom: 1rem;
    input {
      width: 90%;
      padding: 0.5rem;
      border-radius: 3px;
      opacity: 0.7;
    }
    input:focus {
      opacity: 1;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    
  }
  .current-user {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

export default Contacts;
