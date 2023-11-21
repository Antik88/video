import { Button } from 'react-bootstrap';
import './App.css';
import { useRef } from 'react';

let stream;
function App() {
  const videoRef = useRef()
  const shareScreen = async () => {
    if (navigator.mediaDevices.getDisplayMedia) {
      stream = await navigator.mediaDevices.getDisplayMedia({
        audio: true,
        video: true
      })
      console.log('stream:', stream)
      videoRef.current.srcObject = stream
    }
  }
  return (
    <div className='App bg-black'>
      <div height={300} >
        <Button className='mt-2 me-2'
          onClick={() => { shareScreen() }}
        >
          add screen
        </Button>
        <Button className='mt-2'
          onClick={() => {
            let traks = videoRef.current.srcObject.getTracks()
            traks.forEach((t) => {
              t.stop()
            });
            videoRef.current.srcObject = null
            console.log(traks)
          }}
        >
          end stream
        </Button>
      </div>
      <video width={800} height={500} ref={videoRef} autoPlay></video>
    </div>
  );
}

export default App;
