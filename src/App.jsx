import './App.css'
import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense } from 'react'
import { lazy } from 'react'
//import Bananas from './Bananas'
import Overlay from './layout/Overlay'
import { FadeIn, LeftMiddle } from './layout/styles'

 const Bananas = lazy(() => import('./Bananas'))

function App() {
  const [speed,set] = useState(5)
  return(
    <>
     <Suspense fallback={null}>
        <Bananas speed={speed} />
        <FadeIn />
      </Suspense>
  
      <Overlay />
   
     
    </>
  )
}
export default App;
