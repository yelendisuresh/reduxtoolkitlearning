import React from 'react';
import { Contacts } from "./components";
import { NavBar } from "./components";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <NavBar />
      <Contacts />
    </Provider>
  )
}

export default App;
