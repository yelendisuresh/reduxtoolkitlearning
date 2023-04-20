import { fetchContactsThunk, createContactThunk, removeContactThunk, updateContactThunk } from "../thunks/contacts";

let contactsReducer = {

  //case reducer:  contacts-list/add
  add: (state, action) => {
    state.push(action.payload);
  },

  //case reducer:  contacts-list/remove
  remove: (state, action) => {
    let index = state.findIndex(contact => contact.id === action.payload);
    state.splice(index, 1);
  },

  //case reducer:  contacts-list/update
  update: (state, action) => {
    let index = state.findIndex(contact => contact.id === action.payload.id);
    state[index].firstName = action.payload.firstName;
    state[index].lastName = action.payload.lastName;
    state[index].email = action.payload.email;
    state[index].phone = action.payload.phone;
  }
};

export let contactsExtraReducer = {

  //contacts/fetch/pending
  [fetchContactsThunk.pending]: (state, action) => {
    state.data = [];
    state.status = action.meta.requestStatus; //pending
    state.error = {};
  },

  //contacts/fetch/fulfilled
  [fetchContactsThunk.fulfilled]: (state, action) => {
    state.data = action.payload;
    state.status = action.meta.requestStatus; //fulfilled
    state.error = {};
  },

  //contacts/fetch/rejected
  [fetchContactsThunk.rejected]: (state, action) => {
    state.data = [];
    state.status = action.meta.requestStatus; //rejected
    state.error = action.error;
  },


  //contacts/create/pending
  [createContactThunk.pending]: (state, action) => {
    state.status = action.meta.requestStatus; //pending
    state.error = {};
  },

  //contacts/create/fulfilled
  [createContactThunk.fulfilled]: (state, action) => {
    state.data.push(action.payload);
    state.status = action.meta.requestStatus; //fulfilled
    state.error = {};
  },

  //contacts/create/rejected
  [createContactThunk.rejected]: (state, action) => {
    state.status = action.meta.requestStatus; //rejected
    state.error = action.error;
  },


  //contacts/update/pending
  [updateContactThunk.pending]: (state, action) => {
    state.status = action.meta.requestStatus; //pending
    state.error = {};
  },

  //contacts/update/fulfilled
  [updateContactThunk.fulfilled]: (state, action) => {
    let index = state.data.findIndex(contact => contact.id === action.payload.id);
    state.data[index].firstName = action.payload.firstName;
    state.data[index].lastName = action.payload.lastName;
    state.data[index].email = action.payload.email;
    state.data[index].phone = action.payload.phone;

    state.status = action.meta.requestStatus; //fulfilled
    state.error = {};
  },

  //contacts/update/rejected
  [updateContactThunk.rejected]: (state, action) => {
    state.status = action.meta.requestStatus; //rejected
    state.error = action.error;
  },


  //contacts/remove/pending
  [removeContactThunk.pending]: (state, action) => {
    state.status = action.meta.requestStatus; //pending
    state.error = {};
  },

  //contacts/remove/fulfilled
  [removeContactThunk.fulfilled]: (state, action) => {
    let index = state.data.findIndex(contact => contact.id === action.payload);
    state.data.splice(index, 1);

    state.status = action.meta.requestStatus; //fulfilled
    state.error = {};
  },

  //contacts/remove/rejected
  [removeContactThunk.rejected]: (state, action) => {
    state.status = action.meta.requestStatus; //rejected
    state.error = action.error;
  }
  
};

export default contactsReducer;
