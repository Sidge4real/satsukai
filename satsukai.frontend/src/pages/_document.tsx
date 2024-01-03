import { Html, Head, Main, NextScript } from 'next/document'
import { useRouter } from 'next/router'

export default function Document() {
  const router = useRouter();

  let title = "";

  if(router.route == "/products"){ // ook bij alles zoals /products/1 of /products/bonsai
    title = "shop"
  }
  return (
    <Html lang="en">
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <link href="./styles/global.css" rel="stylesheet" />
        <link rel="icon" href="favicon.png" />
        <title>Satsukai {title != "" && "|"} {title}</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}