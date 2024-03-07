import React, { useState, useEffect } from 'react';
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";

function DrawerComponent({ onCanvasChange }) { // Accept a callback prop
    const { editor, onReady } = useFabricJSEditor();
    const [isDrawingEnabled, setIsDrawingEnabled] = useState(false);

    useEffect(() => {
        const setupCanvasListeners = () => {
            if (editor?.canvas) {
                editor.canvas.on('path:created', () => {
                    const json = editor.canvas.toJSON();
                    onCanvasChange(json);
                });
            }
        };

        setupCanvasListeners();

        return () => {
            if (editor?.canvas) {
                editor.canvas.off('path:created');
            }
        };
    }, [editor?.canvas, onCanvasChange]);

    const toggleDrawing = () => {
        const newDrawingState = !isDrawingEnabled;
        setIsDrawingEnabled(newDrawingState);

        if (editor?.canvas) {
            editor.canvas.isDrawingMode = newDrawingState;
        }
    };

    const clearCanvas = () => {
        if (editor?.canvas) {
            editor.canvas.clear();
            onCanvasChange(editor.canvas.toJSON());
        }
    };

    return (
        <div>
            <button onClick={toggleDrawing}>
                {isDrawingEnabled ? 'Disable Drawing' : 'Enable Drawing'}
            </button>
            <button onClick={clearCanvas}>Clear</button>
            <FabricJSCanvas className="sample-canvas" onReady={onReady} />
        </div>
    );
}

export default DrawerComponent;