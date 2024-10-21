// import { useState } from 'react';
import './App.css';
// import Tennisgame from './minigames/Tennisgame.js';
// import CollidingBalls from './minigames/CollidingBalls.js';
// import Tankbust from './minigames/Tankbust.js';
// import TestState from './minigames/testState.js';
import Sinwave from './canvas-utility/Sinwave';

function App() {
  // const [record, setRecord] = useState(0)
  return (
    <div >
      <Sinwave />
      {/* <Circle /> */}
      {/* <Tankbust /> */}
      {/* <CollidingBalls /> */}
      {/* <TestState /> */}
      {/* {record} */}
      {/* <Tennisgame playerX={10} playerWidth={10} playerHeight={90} ballRaidus={20} canvasHeight={"300px"} canvasWidth={"500px"} setRecord={setRecord} /> */}
    </div>
  );
}

export default App;
