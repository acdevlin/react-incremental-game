import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';

import Button from 'react-bootstrap/Button';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [stoneCount, setStoneCount] = useState(0);

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>You have mined
            <span style={{ color: 'green' }}> {stoneCount} </span>
            stone{stoneCount !== 1 && 's'}.
          </p>
          <strong>
            Keep mining, or there will be consequences!
          </strong>
        </div>
        <Button
          active
          variant="primary"
          size="lg"
          onClick={() => setStoneCount((stoneCount) => stoneCount + 1)}
        >
          Mine Stone
        </Button>
      </section>
    </>
  )
}

export default App;
