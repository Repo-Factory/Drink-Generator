import { FormHelperText, Grid, Typography }  from '@mui/material';
import { useState } from 'react';
import ButtonCreater from '../components/ButtonCreater';
import InputBox from '../components/InputBox';
import { useNavigate } from "react-router-dom";


function CreateRoom(props) {
    const navigate = useNavigate();
    const [host_name, setHostName] = useState('');
    const [votes_to_skip, setVotesToSkip] = useState('2');

    async function handleSubmitRoom(e) {
        const createdRoom = {host_name, votes_to_skip};
        try{
            const response = await fetch('http://localhost:8000/api/create', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(createdRoom),
            })
            const json = await response.json();
            console.log(json['code'])
            const link = '/room/' + json['code']
            console.log(link)
            setTimeout(() => { navigate(link); }, 2000);
        }
        catch(err) {
            throw err;
        }
        
        
    }

    return (
        <div className='center'>
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
                    link='' onClick={handleSubmitRoom}/>
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonCreater color='secondary' text='Back to Lobby' link='/'/>
                </Grid>
            </Grid>
        </div>
    );
}

export default CreateRoom;