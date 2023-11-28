import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return ( 
  <>
  <Script
    src="https://www.googletagmanager.com/gtag/js?id=G-xxxxxxxxxx"
    strategy="afterInteractive"
  />
  <Script id="google-analytics" strategy="afterInteractive">
    {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-DCVY2WEGW9');
    `}
  </Script>

  <Component {...pageProps} />
</>
)
}

export default MyApp
