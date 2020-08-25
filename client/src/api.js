// This file contains all the APIs 
import openSocket from 'socket.io-client';


export const ENDPOINT = 'http://127.0.0.1:3000/';
const socket = openSocket(ENDPOINT);
var _roomName = '';
var _playerName = '';


function joinPlayerInGame(data) {
    console.log('joining Player');
    socket.emit('join', JSON.stringify(data));
}

socket.on('joinedRoom', (data) => {
    console.log(data);
});

socket.on('newJoinee', (tempData) => {
    var data = JSON.parse(tempData);
    if (data.status === 200) {
        _roomName = data.roomName;
        _playerName = data.playerName;
        console.log('Player Joined');
    } else {
        _roomName = '';
    }
});



export { joinPlayerInGame, socket, _roomName, _playerName };