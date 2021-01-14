import React from 'react';  
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

// load css file
import "./styles.css";
// components 
import  Scraping  from "./components/scraping"
import Search from "./components/search"

export default class App extends React.Component {
  render() {
    return (
      // redirect with Router
      <Router>
        <Switch>
          <Route path="/search" component={Search} />
          <Route  path="/result/:search" component={Scraping}/>
        </Switch>
      </Router> 
    )
  }
}
