import React, { useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import Main from '../components/Main'
import Songs from '../components/Songs'

export default function Home() {
  const [predictionString, setPredictionString] = useState(null);
  const [recommendedSongs, setRecommendedSongs] = useState([]);

  return (
    <div>
      <Head>
        <title>tch.ai</title>
        <meta name="description" content="tch.ai" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <Main setPredictionString={setPredictionString} setRecommendedSongs={setRecommendedSongs} />
      <Songs predictionString={predictionString} recommendedSongs={recommendedSongs} setRecommendedSongs={setRecommendedSongs} />
    </div>
  )
}
