import { createRoot } from 'react-dom/client'
import { register } from './serviceWorkerRegistration'
import { App } from './App'
import './index.css'

createRoot(document.querySelector('#root')!).render(<App />)

register()
