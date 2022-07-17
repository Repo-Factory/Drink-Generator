import './App.css';
import Lobby from './pages/Lobby';
import JoinRoom from './pages/JoinRoom';
import CreateRoom from './pages/CreateRoom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div>
      <Router> 
        <Routes>
          <Route exact path='/' element={<Lobby />}></Route>
          <Route exact path='/create' element={<CreateRoom />}></Route>
          <Route exact path='/join' element={<JoinRoom />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
