import React from 'react';
import { _roomName } from '../api';
import './waiting.css';
import { Grid } from '@material-ui/core';

export default class Waiting extends React.Component {
    render() {
        return (
            <Grid container className="layoutContainer">
                <Grid item md={4} lg={4}></Grid>

                <Grid item md={4} lg={4}>
                    <div className="card">
                        <p> Looks like you're the only one here </p>
                        <p> Pictionary is best enjoyed with family and friends </p>
                        <p> Invite them over now!! </p>
                        <p> Your unique room code : <b>{_roomName}</b> </p>
                    </div>
                </Grid>

                <Grid item md={4} lg={4}></Grid>

            </Grid>
        );
    }
}