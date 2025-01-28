import React from "react";
import Card from "./Card";
import Avatar from "./Avatar";
import contacts from "../contacts";

function createCard(contact) {
  return (
    <Card
      key={contact.id}
      name={contact.name}
      img={contact.imgURL}
      tel={contact.phone}
      email={contact.email}
      number = {contact.id}
    />
  );
}

function App() {
  return (
    <div>
      <h1 className="heading">My Contacts</h1>
      <Avatar img="https://www.pareeksamaj.com/images/photos/34310/large/40412483520171017233715.jpg" />
      {contacts.map(createCard)}
    </div>
  );
}

export default App;
