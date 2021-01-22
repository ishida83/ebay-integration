import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createMuiTheme, responsiveFontSizes, ThemeProvider} from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
import teal from '@material-ui/core/colors/teal';

let theme = createMuiTheme({
  palette: {
    // primary: {
    //   main: purple[500],
    // },
    primary: {
      main: deepPurple['A400'],
    },
    secondary: {
      main: teal[500],
    },
  },
});
theme = responsiveFontSizes(theme);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
