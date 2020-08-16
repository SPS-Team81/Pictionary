import React, { useEffect, useRef, useState } from 'react';
import './canvas.css'
import { List, ListItem } from '@material-ui/core';

function Canvas() {
    let drawing = false;
    const current = { x: 0, y: 0 };
    const canvasRef = useRef(null);
    const [sliderValue, changeSlider] = useState(50);

    useEffect(() => {
        onResize();
    }, []);

    function onResize(e) {
        canvasRef.current.width = canvasRef.current.offsetWidth;
        canvasRef.current.height = canvasRef.current.offsetHeight;
    }

    function drawLine(x0, y0, x1, y1, color) {
        const context = canvasRef.current.getContext('2d');
        context.beginPath();
        context.moveTo(x0, y0);
        context.lineTo(x1, y1);
        context.strokeStyle = color;
        context.lineWidth = sliderValue / 10;
        context.stroke();
        context.closePath();

        // if (!emit) {
        //     return;
        // }
        var w = canvasRef.current.width;
        var h = canvasRef.current.height;

        // io.emit('C_S_DRAW', {
        //     x0: x0 / w,
        //     y0: y0 / h,
        //     x1: x1 / w,
        //     y1: y1 / h,
        //     color: color
        // });
    }

    function onMouseDown(e) {
        var rect = e.target.getBoundingClientRect();
        const scaleX = canvasRef.current.width / rect.width;
        const sclaeY = canvasRef.current.height / rect.height;
        const inputX = e.clientX || e.touches[0].clientX;
        const inputY = e.clientY || e.touches[0].clientY;

        var x = (inputX - rect.left) * scaleX;
        var y = (inputY - rect.top) * sclaeY;

        drawing = true;

        current.x = x;
        current.y = y;
    }

    function onMouseUp(e) {
        if (!drawing) {
            return;
        }
        drawing = false;
        if (!e || e.touches) {
            return;
        }

        var rect = e.target.getBoundingClientRect();
        const scaleX = canvasRef.current.width / rect.width;
        const scaleY = canvasRef.current.height / rect.height;
        const inputX = e.clientX || e.touches[0].clientX;
        const inputY = e.clientY || e.touches[0].clientY;

        var x = (inputX - rect.left) * scaleX;
        var y = (inputY - rect.top) * scaleY;

        drawLine(current.x, current.y, x, y, current.color);
    }

    function onMouseMove(e) {
        if (!drawing) {
            return;
        }

        var rect = e.target.getBoundingClientRect();
        const scaleX = canvasRef.current.width / rect.width;
        const scaleY = canvasRef.current.height / rect.height;
        const inputX = e.clientX || e.touches[0].clientX;
        const inputY = e.clientY || e.touches[0].clientY;

        var x = (inputX - rect.left) * scaleX;
        var y = (inputY - rect.top) * scaleY;

        drawLine(current.x, current.y, x, y, current.color);

        current.x = x;
        current.y = y;
    }

    function throttle(callback, delay) {
        var previousCall = new Date().getTime();
        return function () {
            var time = new Date().getTime();

            if (time - previousCall >= delay) {
                previousCall = time;
                callback.apply(null, arguments);
            }
        };
    }

    function onDrawingEvent(data) {
        var w = canvasRef.current.width;
        var h = canvasRef.current.height;
        this.drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
    }

    const clearCanvas = (roundNumber, totalRounds) => {
        const context = canvasRef.current.getContext('2d');
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    };

    function onSliderChange(e) {
        changeSlider(e.target.value);
    }

    function onClearCanvas() {
        const context = canvasRef.current.getContext('2d');
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    return (
        <div>
            <div style={{ textAlign: "center" }}>
                <canvas
                    ref={canvasRef}
                    style={{ border: '2px solid #000', marginTop: 20 }}
                    onMouseDown={(e) => onMouseDown(e)}
                    onMouseUp={(e) => onMouseUp(e)}
                    onMouseOut={(e) => onMouseUp(e)}
                    onMouseMove={(e) => throttle(onMouseMove(e), 10)}
                    onTouchStart={(e) => onMouseDown(e)}
                    onTouchEnd={(e) => onMouseUp(e)}
                    onTouchCancel={(e) => onMouseUp(e)}
                    onTouchMove={(e) => throttle(onMouseMove(e), 10)}
                ></canvas>
            </div>

            <div className="canvas-tools">
                <input
                    type="range"
                    min="1" max="100"
                    value={sliderValue}
                    onChange={(e) => onSliderChange(e)}
                    step="1"
                    className="slider"
                ></input>

                <List className="horizontal-list">
                    <ListItem>
                        <i className="material-icons" onClick={onClearCanvas} style={{ cursor: "pointer" }}>delete</i>
                    </ListItem>
                </List>
            </div>
        </div>
    );
};

export default Canvas;