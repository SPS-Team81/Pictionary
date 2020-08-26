import React from 'react';
import { Grid } from '@material-ui/core';
import './betrayal.css';

export default class LeaderBoard extends React.Component {
    render() {
        return (
            <Grid container className="layoutConatiner back">
                <Grid item md={4} lg={4}></Grid>

                <Grid item md={4} lg={4}>
                    <div className="board">
                        <h1 className="title">Game Over</h1>
                        <p className="para">Looks like your friends left the Game :(</p>
                        <p className="para">Better luck choosing your friends next time ;P</p>
                    </div>
                </Grid>

                <Grid item md={4} lg={4}></Grid>

            </Grid>
        );
    }
}