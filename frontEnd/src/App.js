import './App.css';
import {useEffect, useState} from "react";
import DrawerComponent from './drawer/drawer';
import Sidebar from './sidebar/sidebar';

function App() {
  const [canvasJson, setCanvasJson] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('WebSocket Connected');
    };

    ws.onmessage = (event) => {
      const data = event.data;
      setCanvasJson(JSON.parse(data).canvas);
    };

    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="App">
      <Sidebar></Sidebar>
        <DrawerComponent
            onCanvasChange={console.log}
            canvasJson={canvasJson}
        />
    </div>
  );
}

export default App;
