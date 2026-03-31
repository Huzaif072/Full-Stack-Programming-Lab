import './App.css';
import Greeting from './Greeting';

function App() {
  return (
    <div className="App">
      <h1>Dynamic Greeting App</h1>
      <Greeting name="Huzaif" timeOfDay="morning" bgColor="#FFDDC1" />
      <Greeting name="Ayaan" timeOfDay="afternoon" bgColor="#C1FFD7" />
      <Greeting name="Talal" timeOfDay="evening" bgColor="#C1D4FF" />
    </div>
  );
}

export default App;
