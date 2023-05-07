import ReactDOM from 'react-dom/client'
import App from './App'
import React from 'react'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <App />,
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration)
      })
      .catch((registrationError) => {
        console.log('SW registration failed:  ', registrationError)
      })
  })
}
