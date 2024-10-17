import { useState } from 'react';
import './App.css';
import Tennisgame from './minigames/Tennisgame.js';

function App() {
  const [record, setRecord] = useState(0)
  return (
    <div className=''>
      {record}
      <Tennisgame playerX={10} playerWidth={10} playerHeight={90} ballRaidus={20} canvasHeight={"300px"} canvasWidth={"500px"} setRecord={setRecord} />
    </div>
  );
}

export default App;
