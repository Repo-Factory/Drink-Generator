import Banner from '../components/Banner';
import { Link } from 'react-router-dom';

function Lobby() {
    return (
        <div>
        <Banner text='Welcome to the Drink Generator Lobby'/>
        <button><Link to="/create">Create Room</Link></button>
        <button><Link to="/create">Join Room</Link></button>
        </div>
    );
}

export default Lobby;