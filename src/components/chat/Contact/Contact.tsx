import React, { useState } from "react";
import "./styles.scss";
import { UserButton } from "@clerk/clerk-react";

type Props = {
  contacts: IUser[];
  changeChat: (contact: IUser) => void;
};

const Contact: React.FC<Props> = ({
  contacts = [],
  changeChat,
}): JSX.Element => {
  const [currentUserName, setCurrentUserName] = useState<string | null>(null);
  const [currentUserImage, setCurrentUserImage] = useState<string | null>(null);
  const [currentSelected, setCurrentSelected] = useState<number | null>(null);

  const changeCurrentChat = (index: number, contact: IUser) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <div className="contact-container">
      <div className="brand">
        <img
          src="https://images.ctfassets.net/hrltx12pl8hq/3j5RylRv1ZdswxcBaMi0y7/b84fa97296bd2350db6ea194c0dce7db/Music_Icon.jpg"
          alt="logo"
        />
        <h3>snappy</h3>
      </div>
      <div className="contacts">
        {contacts.map((contact, index) => {
          return (
            <div
              key={contact._id}
              className={`contact ${
                index === currentSelected ? "selected" : ""
              }`}
              onClick={() => changeCurrentChat(index, contact)}
            >
              <div className="avatar">
                <img
                  src="https://images.ctfassets.net/hrltx12pl8hq/3j5RylRv1ZdswxcBaMi0y7/b84fa97296bd2350db6ea194c0dce7db/Music_Icon.jpg"
                  alt=""
                />
              </div>
              <div className="username">
                <h3>{contact.username}</h3>
              </div>
            </div>
          );
        })}
      </div>
      <div className="current-user">
        {/* <div className="avatar">
          <img
            src="https://images.ctfassets.net/hrltx12pl8hq/3j5RylRv1ZdswxcBaMi0y7/b84fa97296bd2350db6ea194c0dce7db/Music_Icon.jpg"
            alt="avatar"
          />
        </div>
        <div className="username">
          <h2>{currentUserName}</h2>
        </div> */}
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Contact;
