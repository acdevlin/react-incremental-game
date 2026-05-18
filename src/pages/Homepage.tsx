// Begin component imports
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Toast } from 'react-bootstrap';
// Begin static imports
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const STONE_WARNING_TIMEOUT = 5000;


function Homepage() {
  const [stoneCount, setStoneCount] = useState(0);
  const [showStoneWarning, setShowStoneWarning] = useState(false);
  const [clickedStone, setClickedStone] = useState(false);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (clickedStone) {
        setClickedStone(false);
      } else {
        setShowStoneWarning(true);
      }
    }, STONE_WARNING_TIMEOUT);

    return () => window.clearInterval(interval);
  }, [clickedStone]);

  function handleMineStone() {
    setStoneCount((stoneCount) => stoneCount + 1);
    setClickedStone(true);
    setShowStoneWarning(false);
  }

  return (
    <>
      <section id="center">
        <div>
          <h1>You Are Imprisoned In A Mine</h1>
          <strong>
            Keep mining, or there will be consequences!
          </strong>
          <p>You have mined
            <span style={{ color: 'green' }}> {stoneCount} </span>
            stone{stoneCount !== 1 && 's'}.
          </p>
        </div>
        <Button
          active
          variant={showStoneWarning ? "danger" : "primary"}
          size="lg"
          onClick={handleMineStone}
        >
          Mine Stone
        </Button>
        <Toast show={showStoneWarning} transition={import.meta.env.MODE === 'test' ? false : undefined}>
          <Toast.Header closeButton={false}>
            <strong className="me-auto">The guard glares menacingly at you</strong>
          </Toast.Header>
          <Toast.Body>You haven't mined any stone in a while! Swing that pickaxe or else...</Toast.Body>
        </Toast>
      </section>
    </>
  )
}

export default Homepage;
