import * as React from 'react';

type Coordinates = {
    x: number;
    y: number;
};

function Canvas() {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const [context, setContext] = React.useState<CanvasRenderingContext2D | null>(null);

    React.useEffect(() => {
        let mouseDown: boolean = false;
        let start: Coordinates = { x: 0, y: 0 };
        let end: Coordinates = { x: 0, y: 0 };
        let canvasOffsetLeft: number = 0;
        let canvasOffsetTop: number = 0;
      
        function handleMouseDown(evt: MouseEvent) {
            mouseDown = true;
          
            start = {
              x: evt.clientX - canvasOffsetLeft,
              y: evt.clientY - canvasOffsetTop,
            };
          
            end = {
              x: evt.clientX - canvasOffsetLeft,
              y: evt.clientY - canvasOffsetTop,
            };
        }
      
        function handleMouseUp(evt: MouseEvent) {
            mouseDown = false;
        }
      
        function handleMouseMove(evt: MouseEvent) {
            if (mouseDown && context) {
              start = {
                x: end.x,
                y: end.y,
              };
            
              end = {
                x: evt.clientX - canvasOffsetLeft,
                y: evt.clientY - canvasOffsetTop,
              };
            
              context.beginPath();
              context.moveTo(start.x, start.y);
              context.lineTo(end.x, end.y);
              context.strokeStyle = `#000000`;
              context.lineWidth = 3;
              context.stroke();
              context.closePath();
            }
        }
      
        if (canvasRef.current) {
            const renderCtx = canvasRef.current.getContext('2d');
          
            if (renderCtx) {
              canvasRef.current.addEventListener('mousedown', handleMouseDown);
              canvasRef.current.addEventListener('mouseup', handleMouseUp);
              canvasRef.current.addEventListener('mousemove', handleMouseMove);
            
              canvasOffsetLeft = canvasRef.current.offsetLeft;
              canvasOffsetTop = canvasRef.current.offsetTop;
            
              setContext(renderCtx);
            }
        }
      
        return function cleanup() {
            if (canvasRef.current) {
              canvasRef.current.removeEventListener('mousedown', handleMouseDown);
              canvasRef.current.removeEventListener('mouseup', handleMouseUp);
              canvasRef.current.removeEventListener('mousemove', handleMouseMove);
            }
        }
    }, [context]);


    return (
        <div
            style={{
                textAlign: 'center',
            }}>
            <canvas
                id="canvas"
                ref={canvasRef}
                width={900}
                height={700}
                style={{
                  border: '2px solid #000',
                  marginTop: 20,
                }}
            ></canvas>
        </div>
    );
}

export default Canvas;
