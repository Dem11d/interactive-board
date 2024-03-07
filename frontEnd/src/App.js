import {useEffect, useState} from "react";
import DrawerComponent from "./drawer/drawer";

function App() {
    const [canvasJson, setCanvasJson] = useState(null);
    return (
        <div className="App">
            <DrawerComponent
                onCanvasChange={console.log}
                canvasJson={canvasJson}
            />
        </div>
    );
}

export default App;