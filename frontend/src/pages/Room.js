function Room(props) {
    
    fetch('http://localhost:8000/api/room?code=' + props.roomCode)
        .then(response => response.json())
        .then(data => {console.log(data);})
    return (
        <div>
            This is a Room
        </div>
    );
}

export default Room;