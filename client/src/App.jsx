import { Outlet } from 'react-router-dom'
import { ThemeProvider } from "./comps/theme-provider"
import React from 'react'
import './App.css'


import Navbar from "./comps/navbar";


function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <main>
          <Outlet />
        </main>
      </ThemeProvider>
    </>
  )
}

export default App
