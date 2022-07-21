import { Grid, Typography, FormHelperText } from '@mui/material';
import InputBox from '../components/InputBox';
import ButtonCreater from '../components/ButtonCreater';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';


function JoinRoom() {
    const [code, setCode] = useState('');
    const navigate = useNavigate()
    function HandleJoinRoom() {
        setTimeout(() => { console.log(code); }, 1000);
        const link = '/room/' + code
        setTimeout(() => { console.log(link); }, 1000);
        setTimeout(() => { navigate(link); }, 1000);

    }

    return (
        <div className='center'>
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography>Join A Room</Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormHelperText>
                    <div align='center'>Enter Guest Details</div>
                </FormHelperText>
            </Grid>
            <Grid item xs={12} align="center">
                <InputBox type='text' message='Guest Name'
                 default='Name' />
            </Grid>
            <Grid item xs={12} align="center">
                <InputBox type='text' message='Room To Join' 
                 default='AAAAAA' onChange={(e) => setCode(e.target.value)}/>
            </Grid>
            <Grid item xs={12} align="center">
                <ButtonCreater color='secondary' text='Join Room'
                link='' onClick={HandleJoinRoom}/>
            </Grid>
            <Grid item xs={12} align="center">
                <ButtonCreater color='secondary' text='Back to Lobby'
                link='/' />
            </Grid>
        </Grid>
        </div>
    );
}

export default JoinRoom;