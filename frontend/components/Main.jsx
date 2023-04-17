import React, { useState, useRef } from 'react';
import Dropzone from 'react-dropzone';
//import Webcam from 'react-webcam';

const Main = () => {

  const [uploadedFile, setUploadedFile] = useState(null);
  const [predictionString, setPredictionString] = useState(null);
  //const webcamRef = useRef(null);

  const handleFileUpload = (acceptedFiles) => {
    setUploadedFile(acceptedFiles[0]);
    setPredictionString(null);
  };

  const handleFileSubmit = async () => {
    if (!uploadedFile) {
      alert('Please select a file!');
      return;
    }

    const formData = new FormData();
    formData.append('image', uploadedFile);

    try {
      const pred = await fetch('http://localhost:5000/predict-emotion', {
        method: 'POST',
        body: formData,
      });

      if (!pred.ok) {
        throw new Error('Failed to upload the file!');
      }

      const prediction = await pred.text();
      console.log(prediction);
      setPredictionString(prediction);
    } catch (error) {
      console.error(error);
    }
  };

  /*const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUploadedFile(imageSrc);
    setPredictionString(null);
  };*/

  return (
      <div id='home' className='font-roboto selection:text-[#00001F] selection:bg-[#F0FFFF] w-full h-screen text-center'>
        <div className='max-w-[1440px] w-full h-full mx-auto p-12 flex justify-center items-center'>
            <div>
                <h1 className='font-medium py-3 text-[#F0FFFF]'>
                  Predict Your Mood
                </h1>

                <div className='max-w-[200px] m-auto -mb-24 py-4 select-none'>
                    <Dropzone onDrop={handleFileUpload}>
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} className='cursor-pointer'>
                          <input {...getInputProps()} />
                          <div className='font-medium text-[#F0FFFF] cursor-pointer text-sm uppercase px-6 p-3 rounded-full bg-[#BBEBE9] bg-opacity-10 hover:bg-opacity-20 ease-in duration-100'>
                            <h3>{uploadedFile ? `${uploadedFile.name}` : 'Select Image!'}</h3>
                          </div>
                        </div>
                      )}
                    </Dropzone>

                    <button onClick={handleFileSubmit} className='w-[200px] font-medium text-[#F0FFFF] cursor-pointer text-sm uppercase px-6 p-3 rounded-full bg-[#BBEBE9] bg-opacity-10 hover:bg-opacity-20 ease-in duration-100 mt-4'>
                      <h3>Upload Image!</h3>
                    </button>
                    
                    {/*<Webcam audio={false} ref={webcamRef} screenshotFormat='image/jpeg' style={{display:'none'}} />
                    <button onClick={capture} className='w-[200px] font-medium text-[#F0FFFF] cursor-pointer text-sm uppercase px-6 p-3 rounded-full bg-[#BBEBE9] bg-opacity-10 hover:bg-opacity-20 ease-in duration-100 mt-4'>
                        <h3>Take Picture!</h3>
                      </button>*/}

                    {predictionString && <div className='mt-4 text-center'>{predictionString}</div>}
                </div>
            </div>
        </div>
      </div>
  )
}

export default Main
