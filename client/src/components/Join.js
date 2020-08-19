import React from 'react';
import './join.css';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

export default class Join extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            numberOfRounds: 0,
            timeToGuess: 0,
            roomName: "",
        }
        this.setUsername = this.setUsername.bind(this);
        this.setNumberOfRounds = this.setNumberOfRounds.bind(this);
        this.setTimeToGuess = this.setTimeToGuess.bind(this);
        this.setRoomName = this.setRoomName.bind(this);
        this.handleCreateRoom = this.handleCreateRoom.bind(this);
        this.handleJoinRoom = this.handleJoinRoom.bind(this);
    }

    setUsername(event) {
        this.setState({
            username: event.target.value,
        })
    }

    setNumberOfRounds(event) {
        this.setState({
            numberOfRounds: event.target.value,
        })
    }

    setTimeToGuess(event) {
        this.setState({
            timeToGuess: event.target.value,
        })
    }

    setRoomName(event) {
        this.setState({
            roomName: event.target.value,
        })
    }

    handleCreateRoom() {
        console.log(this.state.username + this.state.numberOfRounds + this.state.timeToGuess);
    }

    handleJoinRoom() {
        console.log(this.state.username + this.state.roomName);
    }

    render() {
        return (
            <Grid container className="layoutContainer">
                <Grid item md={3} lg={3}></Grid>

                <Grid item md={3} lg={3}>
                    <div className="paper">
                        <Avatar className="avatar">
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Create a New Room
                        </Typography>
                        <form className="form" noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                value={this.state.username}
                                onChange={this.setUsername}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="numberOfRounds"
                                label="Number of Rounds"
                                name="numberOfRounds"
                                value={this.state.numberOfRounds}
                                onChange={this.setNumberOfRounds}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="timeToGuess"
                                label="Time to Guess"
                                name="timeToGuess"
                                value={this.state.timeToGuess}
                                onChange={this.setTimeToGuess}
                            />
                            <Button
                                // type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                style={{ padding: 12, marginTop: 15 }}
                                onClick={this.handleCreateRoom}
                            >
                                Create Room
                            </Button>
                        </form>
                    </div>
                </Grid>

                <Grid item md={3} lg={3}>
                    <div className="paper" style={{ paddingBottom: 135 }}>
                        <Avatar className="avatar">
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Join a Room
                        </Typography>
                        <form className="form" noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                value={this.state.username}
                                onChange={this.setUsername}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="roomName"
                                label="Room Name"
                                name="roomName"
                                value={this.state.roomName}
                                onChange={this.setRoomName}
                            />
                            <Button
                                // type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                style={{ padding: 12, marginTop: 15 }}
                                onClick={this.handleJoinRoom}
                            >
                                Join Room
                            </Button>
                        </form>
                    </div>
                </Grid>

                <Grid item md={3} lg={3}></Grid>
            </Grid>
        );
    }
}