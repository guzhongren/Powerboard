import { createRoot } from 'react-dom/client'
import App from './App'
import React from 'react'

createRoot(document.getElementById('app')).render(
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
