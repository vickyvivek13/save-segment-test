import React, { useState } from 'react';
import SegmentPopup from './component/SegmentPopup';
import './App.css';

function App() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [segmentData, setSegmentData] = useState(null);

  const handleSaveSegment = (data) => {
    console.log('Sending data to the server:', data);
    setSegmentData(data);
  };

  return (
    <div className="App">
      <nav className='nav-bar'>
        <h1>Save segmaent app for assessment</h1>
      </nav>
      <button onClick={() => setPopupOpen(true)}>Save Segment</button>
      <SegmentPopup
        isOpen={isPopupOpen}
        onRequestClose={() => setPopupOpen(false)}
        onSaveSegment={handleSaveSegment}
      />
      {segmentData && (
        <div className="saved-segment">
          <h2>Saved Segment Data:</h2>
          <pre>{JSON.stringify(segmentData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
