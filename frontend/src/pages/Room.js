import { useParams } from 'react-router-dom';
import { useState} from 'react';
import { Grid } from '@mui/material'

function Room(props) {
    const { roomCode } = useParams()
    const [host_name, setHostName] = useState('');
    const [votes_to_skip, setVotesToSkip] = useState('2');
    const [code, setCode] = useState('')

    fetch('http://localhost:8000/api/room?code=' + roomCode)
        .then(response => response.json())
        .then(data => {
            setHostName(data.host_name)
            setVotesToSkip(data.votes_to_skip)
            setCode(data.code)
        });
    
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
            {code}
            </Grid>
            <Grid item xs={12} align="center">
                Your Host: {host_name}
            </Grid>
            <Grid item xs={12} align="center">
            Votes_to_skip: {votes_to_skip}
            </Grid>
        </Grid>
    );
}

export default Room;