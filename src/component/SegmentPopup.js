import React, { useState } from 'react';
import Modal from 'react-modal';

const SegmentPopup = ({ isOpen, onRequestClose, onSaveSegment }) => {
  const [segmentName, setSegmentName] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const schemaOptions = [
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' },
  ];

  const addNewSchema = (option) => {
    setSelectedOptions((prevOptions) => [...prevOptions, option]);
  };


const handleSaveSegment = async () => {
  const formattedSchema = selectedOptions.map((option) => ({
    [option.value]: option.label,
  }));

  const segmentData = {
    segment_name: segmentName,
    schema: formattedSchema,
  };

  onSaveSegment(segmentData);

   ; 
  try {
    const response = await fetch( '/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(segmentData),
    });

    if (response.ok) {
      console.log('Data sent successfully to the server.');
    } else {
      console.error('Error sending data to the server:', response.statusText);
    }
  } catch (error) {
    console.error('Error sending data to the server:', error.message);
  }

  setSegmentName('');
  setSelectedOptions([]);
  onRequestClose();
};



  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Save Segment Popup"
    >
       <h2>Save Segment</h2>
      <label>Segment Name:</label>
      <input
        type="text"
        value={segmentName}
        onChange={(e) => setSegmentName(e.target.value)}
      />
      <label>Add Schema to Segment:</label>
      <select
        onChange={(e) =>
          addNewSchema({
            label: e.target.options[e.target.selectedIndex].text,
            value: e.target.value,
          })
        }
      >
        <option value="" disabled selected>
          Select an option
        </option>
        {schemaOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button onClick={() => addNewSchema(selectedOptions[selectedOptions.length - 1])}>
        +Add new schema
      </button>
      {selectedOptions.map((option) => (
        <div key={option.value}>{option.label}</div>
      ))}
      <button onClick={handleSaveSegment}>Save the Segment</button>
    </Modal>
  );
};

export default SegmentPopup;
