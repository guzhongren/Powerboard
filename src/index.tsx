import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from '@root/App'

ReactDOM.render(<App />, document.getElementById('app'))

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

console.log(`
🚀🚀🚀🚀🚀🚀🚀🚀🚀Porerboard🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
New feature! You can use query parameters to config your app:

Rule: ${window.location.origin}?token=TOKEN&config=http://test.json

e.g.: ${window.location.origin}${window.location.pathname}?token=TOKEN&config=https://gist.githubusercontent.com/guzhongren/a98dab4ec912c801cd7a55922f34edf5/raw/ef603c3c57e6369eda61bccb74a3a19c7d747df1/apollo-config-test.json

🚀🚀🚀🚀🚀🚀🚀🚀🚀Porerboard🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
`)
