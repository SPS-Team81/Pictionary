import React from 'react';
import './App.css';
import { TextField, Hidden } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Canvas from './components/Canvas';
import ScoreBoard from './components/ScoreBoard';
import CanvasDraw from "react-canvas-draw";

function App() {
  return (
    <Grid container className="layoutContainer">
      <Grid item md={3} lg={3}>
        <ScoreBoard />
      </Grid>

      <Grid item md={6} lg={6}>
        <Canvas />
      </Grid>

      <Grid item md={3} lg={3}>
      </Grid>

    </Grid>
  );
}

export default App;
