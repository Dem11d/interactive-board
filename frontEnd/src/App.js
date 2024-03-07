import './App.css';
import {useEffect, useState} from "react";
import DrawerComponent from './drawer/drawer';
import Sidebar from './sidebar/sidebar';

function App() {
  const [canvasJson, setCanvasJson] = useState(null);
  const [wsConnection, setWsconnection] = useState(null);

  const handleChangeDrawer = (drawerContent) => {
    if(wsConnection){
    wsConnection.send(JSON.stringify(drawerContent));
    }
  }

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000/board-sockets/1');
    ws.onopen = () => {
      console.log('WebSocket Connected');
    };



    ws.onmessage = (event) => {
      const data = event.data;
      console.log(event);
      setCanvasJson(JSON.parse(data));
    };

    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    setWsconnection(ws);

    return () => {
      ws.close();
    };
  }, []);


  return (
    <div className="App">
      <Sidebar onDrawerClick={console.log}></Sidebar>
        <DrawerComponent
            onCanvasChange={handleChangeDrawer}
            canvasJson={canvasJson}
        />
    </div>
  );
}

export default App;
