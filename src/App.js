import React from "react";
import SideMenu from './components/SideBar/SideMenu'
import {Grid} from 'semantic-ui-react'
import './App.css';

function App() {
  return (
    <Grid columns="equal">
      <SideMenu />
      <Grid.Column className="messagebox">
        
      </Grid.Column>
    </Grid>
  )
}

export default App;
