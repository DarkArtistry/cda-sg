import React from 'react'
import { Route, Routes  } from 'react-router-dom'
import Home from '../containers/Home'

const App = (props) => {
    return (
    <div>
        <Routes>
          <Route path="/" exact element={<Home/>}/>  
        </Routes>
    </div>
    )
}

export default App