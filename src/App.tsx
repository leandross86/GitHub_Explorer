import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'
import GlobalStyle from './style/global'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <GlobalStyle />
      <ToastContainer />
    </>
  )
}

export default App