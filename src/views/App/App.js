import React from "react"
import MainTemplate from "../../components/MainTemplate/MainTemplate";
import Home from "../Home/Home";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Teams from "../Teams/Teams";
import PlayerStats from "../../components/PlayerStats/PlayerStats";
import Logo from "../../assets/images/NBA_75_logo.png"
import Players from "../Players/Players";
import TeamDetails from "../../components/TeamDetails/TeamDetails";
import TeamPlayerStats from "../../components/TeamPlayerStats/TeamPlayerStats";
import {ScrollToTop} from "../../utility/utility";
import Standing from "../Standing/Standing";

function App() {

    const nav = [
        {url:"/", text:"Home", exact:true},
        {url:"/players", text:"Players", exact:true},
        {url:"/teams", text:"Teams", exact:true},
        {url:"/standing", text:"Standing", exact:true}
    ];

  return (

      <BrowserRouter>

          <MainTemplate
          nba_officialsite="Official NBA site"
          nba_officialsitelink="https://www.nba.com"
          navItems={nav}
          logo={Logo}
          >
              <ScrollToTop>
                  <Switch>
                      <Route exact path="/" component={Home}/>
                      <Route exact path="/players" component={Players}/>
                      <Route exact path="/teams" component={Teams}/>
                      <Route exact path="/teams/:number" component={TeamDetails}/>
                      <Route exact path="/players/:number" component={PlayerStats}/>
                      <Route exact path="/players/:team/:number" component={TeamPlayerStats}/>
                      <Route exact path="/standing" component={Standing}/>

                  </Switch>
              </ScrollToTop>

          </MainTemplate>

      </BrowserRouter>
  );
}

export default App;
