import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link'
import { FiMusic } from 'react-icons/fi'
import Dropzone from 'react-dropzone';
//import Webcam from 'react-webcam';

const Main = ({ setPredictionString, setRecommendedSongs }) => {

  const [uploadedFile, setUploadedFile] = useState(null);
  const [currPrediction, setCurrPrediction] = useState(null);
  const [currTitle, setCurrTitle] = useState('Show Me A Picture')
  //const webcamRef = useRef(null);

  const [bgStart, setBgStart] = useState('#800080');
  const [bgEnd, setBgEnd] = useState('#40E0D0');

  const [mood, setMood] = useState("And I'll give you a music playlist to match your mood!");

  const [showMood, setShowMood] = useState(true);

  const [chooseIt, setChooseIt] = useState(false);
  const [showMe, setShowMe] = useState(true);
  const [tellMe, setTellMe] = useState(false);

  const [chosenMood, setChosenMood] = useState('How Do You Feel?');

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--bg-start', bgStart);
    root.style.setProperty('--bg-end', bgEnd);
    root.style.setProperty("transition", "background 2s ease-in-out");
  }, [bgStart, bgEnd]);

  const handleChooseIt = () => {
    if (showMe == true) {
      setShowMe(false);
    }
    if (tellMe == true) {
      setTellMe(false);
    }
    setChooseIt(true);
  }

  const handleShowMe = () => {
    if (chooseIt == true) {
      setChooseIt(false);
    }
    if (tellMe == true) {
      setTellMe(false);
    }
    setCurrTitle('Show Me A Picture');
    setShowMe(true);
  }

  const handleTellMe = () => {
    if (chooseIt == true) {
      setChooseIt(false);
    }
    if (showMe == true) {
      setShowMe(false);
    }
    setCurrTitle("How You Doin'");
    setTellMe(true);
  }

  const handleMoodChange = (prediction) => {
    switch (prediction) {
      case 'angry':
        setMood("You look angry. Ready to unleash your inner metalhead?");

        setBgStart('#000000');
        setBgEnd('#800000');

        setCurrTitle('Anger');
        break;
      case 'disgust':
        setMood('You seem disgusted. Listen to these at your own risk!');

        setBgStart('#023020');
        setBgEnd('#DFFF00');

        setCurrTitle('Disgust');
        break;
      case 'fear':
        setMood('You seem anxious. Relax and unwind with these songs!');

        setBgStart('#1434A4');
        setBgEnd('#F0FFFF');

        setCurrTitle('Anxiety');
        break;
      case 'happy':
        setMood("You look happy! Happy vibes, coming your way!");

        setBgStart('#C04000');
        setBgEnd('#FCF55F');

        setCurrTitle('Joy');
        break;
      case 'neutral':
        setMood("You look neutral. Not sure what you're in the mood for?");

        setBgStart('#630330');
        setBgEnd('#CCCCFF');

        setCurrTitle('Neutral');
        break;
      case 'sad':
        setMood('You seem sad. Some sad songs can heal a broken heart.');

        setBgStart('#000000');
        setBgEnd('#7393B3');

        setCurrTitle('Sadness')
        break;
      case 'surprise':
        setMood("You look surprised! Get ready to feel the energy!");

        setBgStart('#26142A');
        setBgEnd('#DE3163');

        setCurrTitle('Surprise')
        break;
      default:
        setMood("And I'll give you a music playlist to match your mood!");

        setBgStart('#800080');
        setBgEnd('#40E0D0');

        setCurrTitle('Show Me A Picture')
    }
  };

  const handleChosenMoodChange = (prediction) => {
    switch (prediction) {
      case 'angry':
        setChosenMood('Angry');
        break;
      case 'disgust':
        setChosenMood('Disgusted');
        break;
      case 'fear':
        setChosenMood('Anxious');
        break;
      case 'happy':
        setChosenMood('Happy');
        break;
      case 'neutral':
        setChosenMood('Neutral');
        break;
      case 'sad':
        setChosenMood('Sad');
        break;
      case 'surprise':
        setChosenMood('Surprised');
        break;
      default:
        setChosenMood('How Do You Feel?');
    }
  };

  const handleFileUpload = (acceptedFiles) => {
    setUploadedFile(acceptedFiles[0]);
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
      handleSongRecommendations(prediction);
      setCurrPrediction(prediction);

      handleMoodChange(prediction);
      handleChosenMoodChange(prediction);
      setShowMood(false);
      setShowMood(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChooseMood = (prediction) => {
    setPredictionString(prediction);
    handleSongRecommendations(prediction);
    setCurrPrediction(prediction);

    handleMoodChange(prediction);
    handleChosenMoodChange(prediction);
    setShowMood(false);
    setShowMood(true);
  };

  const handleSongRecommendations = async (prediction) => {
    try {
      const res = await fetch('http://localhost:5000/recommend-songs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: prediction,
      });

      if (!res.ok) {
        throw new Error('Failed to get song recommendations!');
      }

      const songs = await res.json();
      console.log(songs);

      setRecommendedSongs(songs);
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
    <div id='main' className='font-roboto selection:text-black selection:bg-white w-full h-screen text-center select-none'>
      <div className='max-w-[1440px] w-full h-full mx-auto p-12 flex justify-center items-center'>
        <div>
          <div className='grid grid-cols-3 gap-4 mb-8 mt-20 md:mb-16 md:-mt-32'>

            <button className={(chooseIt) ? `border-b-4 border-b-custom md:w-[150px] font-light text-white cursor-pointer text-sm uppercase px-3 py-3 bg-white bg-opacity-5 select-none text-center`
              : 'border-b-4 border-b-transparent md:w-[150px] font-light text-white cursor-pointer text-sm uppercase px-3 py-3 bg-white bg-opacity-5 hover:bg-opacity-20 ease-in duration-100 select-none text-center'}
              style={{ '--border-color': `var(--bg-end)` }}
              onClick={handleChooseIt}>
              Choose It
            </button>
            <button className={(showMe) ? `border-b-4 border-b-custom md:w-[150px] font-light text-white cursor-pointer text-sm uppercase px-3 py-3 bg-white bg-opacity-5 select-none text-center`
              : 'border-b-4 border-b-transparent md:w-[150px] font-light text-white cursor-pointer text-sm uppercase px-3 py-3 bg-white bg-opacity-5 hover:bg-opacity-20 ease-in duration-100 select-none text-center'}
              style={{ '--border-color': `var(--bg-end)` }}
              onClick={handleShowMe}>
              Show Me
            </button>
            <button className={(tellMe) ? `border-b-4 border-b-custom md:w-[150px] font-light text-white cursor-pointer text-sm uppercase px-3 py-3 bg-white bg-opacity-5 select-none text-center`
              : 'border-b-4 border-b-transparent md:w-[150px] font-light text-white cursor-pointer text-sm uppercase px-3 py-3 bg-white bg-opacity-5 hover:bg-opacity-20 ease-in duration-100 select-none text-center'}
              style={{ '--border-color': `var(--bg-end)` }}
              onClick={handleTellMe}>
              Tell Me
            </button>

          </div>

          {/* Choose It Section */}
          <div className={(chooseIt) ? 'block' : 'hidden'}>
            <h1 className={(currPrediction == null) ? 'text-3xl md:text-5xl font-light py-4 text-white uppercase'
              : `text-3xl md:text-5xl font-light py-4 text-white uppercase text-custom animate-pulse-slow`} style={{ '--border-color': `var(--bg-end)` }}>
              {chosenMood}
            </h1>

            <div className='grid grid-cols-3 gap-4 mt-5'>

              <button className='md:w-[150px] font-medium text-white cursor-pointer text-md uppercase px-3 py-3 bg-white bg-opacity-10 hover:bg-opacity-20 ease-in duration-100 select-none text-center' onClick={() => handleChooseMood('angry')}>
                Angry
              </button>

              <button className='md:w-[150px] font-medium text-white cursor-pointer text-md uppercase px-3 py-3 bg-white bg-opacity-10 hover:bg-opacity-20 ease-in duration-100 select-none text-center' onClick={() => handleChooseMood('disgust')}>
                Disgusted
              </button>

              <button className='md:w-[150px] font-medium text-white cursor-pointer text-md uppercase px-3 py-3 bg-white bg-opacity-10 hover:bg-opacity-20 ease-in duration-100 select-none text-center' onClick={() => handleChooseMood('fear')}>
                Anxious
              </button>

              <button className='md:w-[150px] font-medium text-white cursor-pointer text-md uppercase px-3 py-3 bg-white bg-opacity-10 hover:bg-opacity-20 ease-in duration-100 select-none text-center' onClick={() => handleChooseMood('happy')}>
                Happy
              </button>

              <button className='md:w-[150px] font-medium text-white cursor-pointer text-md uppercase px-3 py-3 bg-white bg-opacity-10 hover:bg-opacity-20 ease-in duration-100 select-none text-center' onClick={() => handleChooseMood('neutral')}>
                Neutral
              </button>

              <button className='md:w-[150px] font-medium text-white cursor-pointer text-md uppercase px-3 py-3 bg-white bg-opacity-10 hover:bg-opacity-20 ease-in duration-100 select-none text-center' onClick={() => handleChooseMood('sad')}>
                Sad
              </button>

              <button className='md:w-[150px] select-none pointer-events-none'>
              </button>

              <button className='md:w-[150px] font-medium text-white cursor-pointer text-md uppercase px-3 py-3 bg-white bg-opacity-10 hover:bg-opacity-20 ease-in duration-100 select-none text-center' onClick={() => handleChooseMood('surprise')}>
                Surprised
              </button>

            </div>

            <div className={(currPrediction == null) ? 'invisible mt-20 md:mt-16 md:-mb-44' : 'visible mt-20 md:mt-16 md:-mb-44'}>
              <Link href='/#songs'>
                <button className={`animate-bounce-slow rounded-full text-white border-2 border-white hover:border-custom ease-in duration-100 p-6 cursor-pointer`} style={{ '--border-color': `var(--bg-end)` }} >
                  <FiMusic size={30} />
                </button>
              </Link>
            </div>
          </div>

          {/* Show Me Section */}
          <div className={(showMe) ? 'block' : 'hidden'}>
            <h1 className={(currPrediction == null) ? 'text-3xl md:text-5xl font-light py-4 text-white uppercase'
              : `text-3xl md:text-5xl font-light py-4 text-white uppercase text-custom animate-pulse-slow`} style={{ '--border-color': `var(--bg-end)` }}>
              {currTitle}
            </h1>

            <div className='max-w-[200px] m-auto py-4 select-none' title='Select Image'>
              <Dropzone onDrop={handleFileUpload}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()} className='cursor-pointer'>
                    <input {...getInputProps()} />
                    <div className='font-medium text-white cursor-pointer text-sm uppercase px-6 py-3 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 ease-in duration-100'>
                      <h3 className='max-w-[150px] overflow-hidden truncate'>{uploadedFile ? `${uploadedFile.name}` : 'Select Image'}</h3>
                    </div>
                  </div>
                )}
              </Dropzone>

              <button onClick={handleFileSubmit} className='w-[200px] font-medium text-white cursor-pointer text-sm uppercase px-6 py-3 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 ease-in duration-100 mt-4 select-none' title='Upload Image'>
                <h3>Upload Image</h3>
              </button>

              {/*<Webcam audio={false} ref={webcamRef} screenshotFormat='image/jpeg' style={{display:'none'}} />
                        <button onClick={capture} className='w-[200px] font-medium text-white cursor-pointer text-sm uppercase px-6 p-3 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 ease-in duration-100 mt-4'>
                            <h3>Take Picture!</h3>
                          </button>*/}
            </div>

            <div className='py-4 font-light text-lg text-white'>
              {showMood && (<div className='text-center animate-pulse-slow'>{mood}</div>)}
            </div>

            <div className={(currPrediction == null) ? 'invisible mt-14 md:mt-16 md:-mb-44' : 'visible mt-14 md:mt-16 md:-mb-44'}>
              <Link href='/#songs'>
                <button className={`animate-bounce-slow rounded-full text-white border-2 border-white hover:border-custom ease-in duration-100 p-6 cursor-pointer`} style={{ '--border-color': `var(--bg-end)` }} >
                  <FiMusic size={30} />
                </button>
              </Link>
            </div>
          </div>

          {/* Tell Me Section */}
          <div className={(tellMe) ? 'block' : 'hidden'}>
            <h1 className={(currPrediction == null) ? 'text-3xl md:text-5xl font-light py-4 text-white uppercase'
              : `text-3xl md:text-5xl font-light py-4 text-white uppercase text-custom animate-pulse-slow`} style={{ '--border-color': `var(--bg-end)` }}>
              {currTitle}
            </h1>

            <div className='max-w-[200px] m-auto py-4 select-none' title='Select Image'>
              <Dropzone onDrop={handleFileUpload}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()} className='cursor-pointer'>
                    <input {...getInputProps()} />
                    <div className='font-medium text-white cursor-pointer text-sm uppercase px-6 py-3 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 ease-in duration-100'>
                      <h3 className='max-w-[150px] overflow-hidden truncate'>{uploadedFile ? `${uploadedFile.name}` : 'Select Image'}</h3>
                    </div>
                  </div>
                )}
              </Dropzone>

              <button onClick={handleFileSubmit} className='w-[200px] font-medium text-white cursor-pointer text-sm uppercase px-6 py-3 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 ease-in duration-100 mt-4 select-none' title='Upload Image'>
                <h3>Upload Image</h3>
              </button>

              {/*<Webcam audio={false} ref={webcamRef} screenshotFormat='image/jpeg' style={{display:'none'}} />
                        <button onClick={capture} className='w-[200px] font-medium text-white cursor-pointer text-sm uppercase px-6 p-3 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 ease-in duration-100 mt-4'>
                            <h3>Take Picture!</h3>
                          </button>*/}
            </div>

            <div className='py-4 font-light text-lg text-white'>
              {showMood && (<div className='text-center animate-pulse-slow'>{mood}</div>)}
            </div>

            <div className={(currPrediction == null) ? 'invisible mt-14 md:mt-16 md:-mb-44' : 'visible mt-14 md:mt-16 md:-mb-44'}>
              <Link href='/#songs'>
                <button className={`animate-bounce-slow rounded-full text-white border-2 border-white hover:border-custom ease-in duration-100 p-6 cursor-pointer`} style={{ '--border-color': `var(--bg-end)` }} >
                  <FiMusic size={30} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
