import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { Grid, FormHelperText } from '@mui/material';
import InputBox from '../components/InputBox';
import ButtonCreater from '../components/ButtonCreater';



function JoinRoom() {
    const navigate = useNavigate()
    const [code, setCode] = useState('');
    
    //redirects user to the URL of the desired room, they must input valid code to be taken to valid room 
    function HandleJoinRoom() {
        const link = '/room/' + code
        setTimeout(() => { navigate(link); }, 1000);

    }

    return (
        <div className='center'>
        <Grid container spacing={4}>
            <Grid item xs={12} align="center" >
                <div style={{color: 'white', fontSize:'48px'}}>Join A Room</div>
            </Grid>
            <Grid item xs={12} align="center">
                <FormHelperText>
                    <div align='center' style={{color: 'white', fontSize:'16px'}}>Enter Guest Details</div>
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
           
            </Grid>
            <Grid item xs={12} align="center">
                <ButtonCreater style={{backgroundColor: '#383838'}} text='Join Room'
                link='' onClick={HandleJoinRoom}/>
                <ButtonCreater style={{backgroundColor: '#383838'}} text='Back to Lobby'
                link='/' />
            </Grid>
        </Grid>
        </div>
    );
}

export default JoinRoom;