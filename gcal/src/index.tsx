import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/js/dist/collapse';
import '@common/ui/index.scss';
import App from './App';
import reportWebVitals from '@common/ui/reportWebVitals';
import {MobileTooltipProvider} from '@common/ui/MobileTooltip';

ReactDOM.render(
    <React.StrictMode>
        <MobileTooltipProvider>
            <App/>
        </MobileTooltipProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
