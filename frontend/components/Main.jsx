import React, { useState, useRef, useEffect } from 'react';
import Dropzone from 'react-dropzone';
//import Webcam from 'react-webcam';

const Main = ({setPredictionString}) => {

    const [uploadedFile, setUploadedFile] = useState(null);
    //const webcamRef = useRef(null);

    const [bgStart, setBgStart] = useState('#800080');
    const [bgEnd, setBgEnd] = useState('#40E0D0');

    const [mood, setMood] = useState("And I'll give you a music playlist to match your mood!");

    const [showMood, setShowMood] = useState(true);

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--bg-start', bgStart);
        root.style.setProperty('--bg-end', bgEnd);
        root.style.setProperty("transition", "background 2s ease-in-out");   
    }, [bgStart, bgEnd]);

    const handleMoodChange = (prediction) => {
      // prediction = 'surprise';
      switch (prediction) {
        case 'angry':
          setMood("You look angry. Ready to unleash your inner metalhead?");
          setBgStart('#000000');
          setBgEnd('#800000');
          break;
        case 'disgust':
          setMood('You seem disgusted. Listen to these at your own risk!');
          setBgStart('#023020');
          setBgEnd('#DFFF00');
          break;
        case 'fear':
          setMood('You seem afraid. Relax and unwind with these songs!');
          setBgStart('#1434A4');
          setBgEnd('#F0FFFF');
          break;
        case 'happy':
          setMood("You look happy! Happy vibes, coming your way!");
          setBgStart('#FF5F1F');
          setBgEnd('#FCF55F');
          break;
        case 'neutral':
          setMood("You look neutral. Not sure what you're in the mood for?");
          setBgStart('#630330');
          setBgEnd('#CCCCFF');
          break;
        case 'sad':
          setMood('You seem sad. Sometimes sad songs can heal a broken heart.');
          setBgStart('#000000');
          setBgEnd('#7393B3');
          break;
        case 'surprise':
          setMood("You look surprised! Get ready to feel the energy!");
          setBgStart('#4A0404');
          setBgEnd('#DE3163');
          break;
        default:
          setMood("And I'll give you a music playlist to match your mood!");
          setBgStart('#800080');
          setBgEnd('#40E0D0');
      }
    };

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

        handleMoodChange(prediction);
        setShowMood(false);
        setShowMood(true);
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
                  <h1 className='text-5xl font-light py-3 text-[#F0FFFF] uppercase'>
                    Show Me A Picture
                  </h1>

                  <div className='max-w-[200px] m-auto py-4 select-none'>
                      <Dropzone onDrop={handleFileUpload}>
                        {({ getRootProps, getInputProps }) => (
                          <div {...getRootProps()} className='cursor-pointer'>
                            <input {...getInputProps()} />
                            <div className='font-medium text-[#F0FFFF] cursor-pointer text-sm uppercase px-6 p-3 rounded-full bg-[#BBEBE9] bg-opacity-10 hover:bg-opacity-30 ease-in duration-100'>
                              <h3 className='max-w-[150px] overflow-hidden truncate'>{uploadedFile ? `${uploadedFile.name}` : 'Select Image'}</h3>
                            </div>
                          </div>
                        )}
                      </Dropzone>

                      <button onClick={handleFileSubmit} className='w-[200px] font-medium text-[#F0FFFF] cursor-pointer text-sm uppercase px-6 p-3 rounded-full bg-[#BBEBE9] bg-opacity-10 hover:bg-opacity-30 ease-in duration-100 mt-4'>
                        <h3>Upload Image</h3>
                      </button>
                      
                      {/*<Webcam audio={false} ref={webcamRef} screenshotFormat='image/jpeg' style={{display:'none'}} />
                      <button onClick={capture} className='w-[200px] font-medium text-[#F0FFFF] cursor-pointer text-sm uppercase px-6 p-3 rounded-full bg-[#BBEBE9] bg-opacity-10 hover:bg-opacity-20 ease-in duration-100 mt-4'>
                          <h3>Take Picture!</h3>
                        </button>*/}
                  </div>

                  {showMood && (<div className='mt-4 font-light text-lg text-[#F0FFFF] text-center animate-pulse-slow'>{mood}</div>)}
              </div>
          </div>
        </div>
    )
}

export default Main
