import React from 'react'
import MainPage from '../MainPage'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const App = () => {
  return (
    <div>
      <DndProvider debugMode={true} backend={HTML5Backend}>
        <MainPage />
      </DndProvider>
    </div>
  )
}

export default App
