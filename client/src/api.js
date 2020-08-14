// This file contains all the APIs 
import openSocket from 'socket.io-client';


export const ENDPOINT = 'http://127.0.0.1:3000/';
const socket  = openSocket(ENDPOINT);


function queryGameData(roomName,cb) {
    socket.emit('dataQuery',roomName);
    socket.on('sendData',data => {
        let dataJson = JSON.parse(data);
        cb(null,dataJson)
    }); 
}

export {queryGameData};