import { FormHelperText, Grid, Typography, Button }  from '@mui/material';
import { useState } from 'react';
import ButtonCreater from '../components/ButtonCreater';
import InputBox from '../components/InputBox';


function CreateRoom() {

    const [host_name, setHostName] = useState('');
    const [votes_to_skip, setVotesToSkip] = useState('2');
    const [code, setCode] = useState('')
    //useEffect(() => console.log(votes_to_skip))

    async function handleSubmitRoom(e) {
        e.preventDefault();
        const createdRoom = {host_name, votes_to_skip};
        try{
            const response = await fetch('http://localhost:8000/api/create', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(createdRoom),
            })
            const json = await response.json();
            setCode(json['code'])
            console.log(code)
        }
        catch(err) {
            throw err;
        }
        
        
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography>Create A Room</Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormHelperText>
                    <div align='center'>Enter Room Details</div>
                </FormHelperText>
            </Grid>
            <Grid item xs={12} align="center">
                <InputBox type='text' message='Host Name'
                 default='Name' onChange={(e) => setHostName(e.target.value)}/>
            </Grid>
            <Grid item xs={12} align="center">
                <InputBox type='number' message='Votes Required to Skip Drink'
                 default={votes_to_skip} onChange={(e) => setVotesToSkip(e.target.value)}/>
            </Grid>
            <Grid item xs={12} align="center">
                <ButtonCreater color='secondary' text='Create Room'
                link={'room'} onClick={handleSubmitRoom}/>
            </Grid>
            <Grid item xs={12} align="center">
                <ButtonCreater color='secondary' text='Back to Lobby' link='/'/>
            </Grid>
        </Grid>
    );
}

export default CreateRoom;