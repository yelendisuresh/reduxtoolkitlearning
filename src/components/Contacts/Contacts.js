import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import "./Contacts.css";
import "../../store";
import { fetchContactsThunk, createContactThunk, updateContactThunk, removeContactThunk } from "../../thunks/contacts";

import { v1 as uuid } from "uuid";

function Contacts() {
  //get redux state
  let contacts = useSelector(state => state.contacts);

  //state
  let [ firstName, setFirstName ] = useState("");
  let [ lastName, setLastName]  = useState("");
  let [ email, setEmail ] = useState("");
  let [ phone, setPhone ] = useState("");

  let [ editId, setEditId ] = useState("");
  let [ editFirstName, setEditFirstName ] = useState("");
  let [ editLastName, setEditLastName ] = useState("");
  let [ editEmail, setEditEmail ] = useState("");
  let [ editPhone, setEditPhone ] = useState("");

  //create dispatch() function
  let dispatch = useDispatch();

  //useEffect: run on first render
  useEffect(() => {
    dispatch(fetchContactsThunk());
  }, [ dispatch ]);

  //onAddClick
  let onAddClick = () => {
    dispatch(createContactThunk({
      id: uuid(),
      firstName,
      lastName,
      email,
      phone
    }));

    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
  }

  //onDeleteClick
  let onDeleteClick = (contact) => {
    if (window.confirm("Are you sure to delete this contact?"))
    {
      dispatch(removeContactThunk(contact.id));
    }
  };

  //onEditClick
  let onEditClick = (contact) => {
    //set all values into edit state properties
    setEditId(contact.id);
    setEditFirstName(contact.firstName);
    setEditLastName(contact.lastName);
    setEditEmail(contact.email);
    setEditPhone(contact.phone);
  };


  //onUpdateClick
  let onUpdateClick = () => {
    //dispatch
    dispatch(updateContactThunk({
      id: editId,
      firstName: editFirstName,
      lastName: editLastName,
      email: editEmail,
      phone: editPhone
    }));
    setEditId("");
  };

  return (
    <div className="container">
      <h4 className="grid-header">
        Contacts
        {contacts.status === "pending"? <i className="fas fa-spinner fa-spin"></i>: ""}        
        &nbsp;&nbsp;
        <span className="text-red">{contacts.error?.message}</span>
      </h4>

      <div className="box">
        <details>
          <summary>New Contact</summary>

          <div className="form-group">
            <input type="text" placeholder="First Name" className="form-control" value={firstName} onChange={(event) => { setFirstName(event.target.value); }}/>
          </div>

          <div className="form-group">
            <input type="text" placeholder="Last Name" className="form-control" value={lastName} onChange={(event) => { setLastName(event.target.value); }} />
          </div>

          <div className="form-group">
            <input type="text" placeholder="Email" className="form-control" value={email} onChange={(event) => { setEmail(event.target.value); }} />
          </div>

          <div className="form-group">
            <input type="text" placeholder="Phone" className="form-control" value={phone} onChange={(event) => { setPhone(event.target.value); }} />
          </div>

          <button className="button button-green" onClick={onAddClick}>Save</button>
        </details>
      </div>

      <div className="grid-container">
        <table className="grid">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Options</th>
            </tr>
          </thead>

          <tbody>
            {contacts.data.map((contact, index) => <tr key={contact.id}>
              <td>{index + 1}</td>

              <td>
                {editId === contact.id?
                <input type="text" placeholder="First Name" className="form-control" value={editFirstName} onChange={(event) => {setEditFirstName(event.target.value); }}  />:
                <span>{contact.firstName}</span>}
              </td>

              <td>
                {editId === contact.id?
                <input type="text" placeholder="Last Name" className="form-control" value={editLastName} onChange={(event) => {setEditLastName(event.target.value); }}  />:
                <span>{contact.lastName}</span>}
              </td>

              <td>
                {editId === contact.id?
                <input type="text" placeholder="Email" className="form-control" value={editEmail} onChange={(event) => {setEditEmail(event.target.value); }}  />:
                <span>{contact.email}</span>}
              </td>

              <td>
                {editId === contact.id?
                <input type="text" placeholder="Phone" className="form-control" value={editPhone} onChange={(event) => {setEditPhone(event.target.value); }}  />:
                <span>{contact.phone}</span>}
              </td>

              <td>
                {editId === contact.id? <button className="button button-green" onClick={() => { onUpdateClick(); }}>Update</button> :
                <button className="button button-green" onClick={() => { onEditClick(contact); }}>Edit</button>}

                <button className="button button-red" onClick={() => { onDeleteClick(contact); }}>Delete</button>
              </td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Contacts;
