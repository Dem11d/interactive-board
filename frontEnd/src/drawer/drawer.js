import React, { useState, useEffect } from 'react';
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";

function DrawerComponent({ onCanvasChange, canvasJson }) {
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

    useEffect(() => {
        if (editor?.canvas && canvasJson) {
            editor.canvas.loadFromJSON(canvasJson, editor.canvas.renderAll.bind(editor.canvas));
        }
    }, [canvasJson, editor?.canvas]);

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
            <FabricJSCanvas style='{height: 300px}' className="sample-canvas" onReady={onReady} />
        </div>
    );
}

export default DrawerComponent;