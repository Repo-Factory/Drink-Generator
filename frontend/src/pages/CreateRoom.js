import { FormHelperText, Grid, ButtonGroup }  from '@mui/material';
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
            <Grid container spacing={4}>
                <Grid item xs={12} align="center">
                    <div style={{color: 'white', fontSize: '48px'}}>Create A Room</div>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormHelperText>
                        <div align='center' style={{color:'white', fontSize:'16px'}} >Enter Room Details</div>
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

                </Grid>
                <Grid item xs={12} align="center">
                        <ButtonCreater style={{backgroundColor: '#383838'}} text='Create Room'
                        link='' onClick={handleSubmitRoom}/>
                        <ButtonCreater style={{backgroundColor: '#383838'}} text='Back to Lobby' link='/'/>
                </Grid>
            </Grid>
        </div>
    );
}

export default CreateRoom;