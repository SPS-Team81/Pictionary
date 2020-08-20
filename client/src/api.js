// This file contains all the APIs 
import openSocket from 'socket.io-client';


export const ENDPOINT = 'http://127.0.0.1:3000/';
const socket  = openSocket(ENDPOINT);
var _roomName = '';
var _playerName = "player_"+Array(4).fill(0).map(x => Math.random().toString(36).charAt(2)).join(''); 


function joinPlayerInGame() {
    console.log('joining Player');
    var data = {
        roomName: _roomName,
        playerName: _playerName,
    };
    socket.emit('join',JSON.stringify(data));
}

socket.on('joinedRoom',(data) => {
    console.log('Player Joined');
});



export {joinPlayerInGame,socket};