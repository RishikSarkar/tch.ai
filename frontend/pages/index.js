import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [emotion, setEmotion] = useState('')

  const handleImageUpload = async (event) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('image', event.target.files[0])

    const response = await fetch('/predict-emotion', {
      method: 'POST',
      body: formData
    })

    const data = await response.text()
    setEmotion(data)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Emotion Detection App</title>
        <meta name="description" content="Detect the emotion in an image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the Emotion Detection App!
        </h1>

        <form>
          <label htmlFor="image-upload">Upload an image:</label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </form>

        {emotion && (
          <p className={styles.description}>
            The emotion in the image is: {emotion}
          </p>
        )}
      </main>
    </div>
  )
}