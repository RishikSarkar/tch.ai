import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import Main from '../components/Main'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Vivaldi</title>
        <meta name="description" content="Vivaldi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
    <Main />
    </div>
  )
}
