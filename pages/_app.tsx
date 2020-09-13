import { colors } from '../lib/style.json'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <style jsx global>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Open Sans', sans-serif;
        outline: none;
        text-decoration: none;
        color: ${colors.text} !important;
      }
      `}</style>
    </>
  )
}

export default MyApp
