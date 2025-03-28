import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <body>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <link href="./styles/global.css" rel="stylesheet" />
        <link rel="icon" href="favicon.png" />
        <title>Satsukai</title>
      </Head>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}