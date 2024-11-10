import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [ocrText, setOcrText] = useState('');
  const [details, setDetails] = useState({
    name: '',
    fatherName: '',
    dob: '',
    address: '',
    pin: '',
    doj: '',
    validTill: '',
  });

  // Handle file drop
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setSelectedFile(acceptedFiles[0]);
    },
  });

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData);
      const extractedText = response.data.text;
      setOcrText(extractedText);
      extractDetails(extractedText);
      console.log(extractedText)
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  // Function to extract specific details from the OCR text
  const extractDetails = (text) => {
    // Regex patterns to find Name, Father's Name, DOB, Address, and PIN
    const nameRegex = /Name[:\s]*([\w\s]+)/i;
    const fatherNameRegex = /(Father['’]?s? Name|S\/D\/W of)[:\s]*([\w\s]+)/i;
    const dobRegex = /(?:DOB|Date of Birth|D\.O\.B)[:\s]*([\d]{1,2}[\/\-][\d]{1,2}[\/\-][\d]{4})/i;
    const pinRegex = /\b(\d{6})\b/; // PIN Code with exactly 6 digits
    const addressRegex = /\b(?:Address|Add)[:\s]*([\w\s,.-]+)/i;
    const dojRegex = /DOJ[:\s]*([\d]{2}-[\d]{2}-[\d]{4})/i;
  const validTillRegex = /Valid Till[:\s]*([\d]{2}-[\d]{2}-[\d]{4})/i;

    // Extract information using regex
    const nameMatch = text.match(nameRegex);
    const fatherNameMatch = text.match(fatherNameRegex);
    const dobMatch = text.match(dobRegex);
    const pinMatch = text.match(pinRegex);
    const addressMatch = text.match(addressRegex);
    const dojMatch = text.match(dojRegex);
  const validTillMatch = text.match(validTillRegex);

    // Set the extracted details in the state
    setDetails({
      name: nameMatch ? nameMatch[1].trim() : 'Not Found',
      fatherName: fatherNameMatch ? fatherNameMatch[2].trim() : 'Not Found',
      dob: dobMatch ? dobMatch[1].trim() : 'Not Found',
      address: addressMatch ? addressMatch[1].trim() : 'Not Found',
      pin: pinMatch ? pinMatch[1].trim() : 'Not Found',
      doj: dojMatch ? dojMatch[1].trim() : 'Not Found',
    validTill: validTillMatch ? validTillMatch[1].trim() : 'Not Found',
    });
  };

  const renderField = (label, value) => {
    return value && value !== 'Not Found' ? (
      <p><strong>{label}:</strong> {value}</p>
    ) : null;
  };

  return (
    <div className="App">
      <h2>upload your image</h2>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        {selectedFile ? (
          <p>{selectedFile.name}</p>
        ) : (
          <p>Drag & drop an image here, or click to select one</p>
        )}
      </div>
      <button onClick={handleUpload} disabled={!selectedFile}>
        Upload & Extract Text
      </button>

      {ocrText && (
        <div className="result">
        <h3>Extracted Information:</h3>
        {renderField('Name', details.name)}
        {renderField("Father's Name", details.fatherName)}
        {renderField('Date of Birth', details.dob)}
        {renderField('Address', details.address)}
        {renderField('PIN Code', details.pin)}
        {renderField('Date of Joining (DOJ)', details.doj)}
        {renderField('Valid Till', details.validTill)}
      </div>
      )}
    </div>
  );
}

export default App;
