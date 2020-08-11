import React from 'react';
import { Grid } from '@material-ui/core';
import Canvas from './components/Canvas';
import ScoreBoard from './components/ScoreBoard';
import Timer from './components/Timer';
import ChatBox from './components/ChatBox';
import CanvasDraw from 'react-canvas-draw';

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
                <Timer />
                <ChatBox />
            </Grid>

        </Grid>
    );
}

export default App;