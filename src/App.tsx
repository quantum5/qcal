import React from 'react';
import './App.css';
import {Calendar} from './Calendar';
import {gregorianJDN} from "./dates";

function App() {
  const today = new Date();
  const todayJDN = gregorianJDN(today.getFullYear(), today.getMonth() + 1, today.getDay());
  return (
    <Calendar year={230} month={5} day={24} todayJDN={todayJDN}/>
  );
}

export default App;
