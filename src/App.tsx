import React, {useState} from 'react';
import './App.css';
import {Calendar} from './Calendar';
import {gregorianJDN, Month} from "./dates";

function App() {
    const today = new Date();
    const todayJDN = gregorianJDN(today.getFullYear(), today.getMonth() + 1, today.getDay());
    const [yearMonth, setYearMonth] = useState([230, 5]);
    return (
        <Calendar year={yearMonth[0]} month={yearMonth[1] as Month} todayJDN={todayJDN}
                  onSwitch={(year, month) => setYearMonth([year, month])}/>
    );
}

export default App;
