import './App.css';
import DrawerComponent from './drawer/drawer';

function App() {
  return (
    <div className="App">

      <DrawerComponent onCanvasChange={console.log}></DrawerComponent>
    
    </div>
  );
}

export default App;
