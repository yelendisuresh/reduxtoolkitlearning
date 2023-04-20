import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let api = axios.create({
  baseURL: "http://localhost:7000"
});

export const fetchContactsThunk = createAsyncThunk(
  "contacts/fetch",
  async() => {
    let response = await api.get("/contacts");
    return response.data;
  }
);

//contacts/fetch/pending
//contacts/fetch/fulfilled
//contacts/fetch/rejected

export const createContactThunk = createAsyncThunk(
  "contacts/create",
  async(newContact) => {
    let response = await api({ 
      url: "/contacts",
      data: newContact,
      method: "POST"  });
    return response.data;
  }
);

//contacts/create/pending
//contacts/create/fulfilled
//contacts/create/rejected


export const updateContactThunk = createAsyncThunk(
  "contacts/update",
  async(modifiedContact) => {
    let response = await api({ 
      url: `/contacts/${modifiedContact.id}`,
      data: modifiedContact,
      method: "PUT"  });
    return response.data;
  }
);

//contacts/update/pending
//contacts/update/fulfilled
//contacts/update/rejected


export const removeContactThunk = createAsyncThunk(
  "contacts/remove",
  async(contactId) => {
    let response = await api({ 
      url: `/contacts/${contactId}`,
      method: "DELETE"  });
    return response.data;
  }
);

//contacts/remove/pending
//contacts/remove/fulfilled
//contacts/remove/rejected
