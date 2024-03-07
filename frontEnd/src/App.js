import './App.css';
import {useEffect, useState} from "react";
import DrawerComponent from './drawer/drawer';
import Sidebar from './sidebar/sidebar';

function App() {
  const [canvasJson, setCanvasJson] = useState(null);
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
