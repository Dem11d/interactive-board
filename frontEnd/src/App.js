import './App.css';
import DrawerComponent from './drawer/drawer';
import Sidebar from './sidebar/sidebar';

function App() {
  return (
    <div className="App">
      <Sidebar></Sidebar>
      <DrawerComponent onCanvasChange={console.log}></DrawerComponent>
   
    </div>
  );
}

export default App;
