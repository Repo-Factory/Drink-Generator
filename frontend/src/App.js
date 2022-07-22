import './App.css';
import Lobby from './pages/Lobby';
import JoinRoom from './pages/JoinRoom';
import CreateRoom from './pages/CreateRoom';
import Room from './pages/Room';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App(props) {

  const background = {
        
    backgroundImage: `url(${props.image})`,
  
  }
  


  return (
    <div style={background}>
      <Router> 
        <Routes>
          <Route exact path='/' element={<Lobby />}></Route>
          <Route path='/create' element={<CreateRoom />}></Route>
          <Route path='/join' element={<JoinRoom />}></Route>
          <Route path='/room/:roomCode' element={<Room />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
