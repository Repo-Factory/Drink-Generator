import Banner from '../components/Banner';
import ButtonCreater from '../components/ButtonCreater';
import { Grid } from '@mui/material'


function Lobby() {

    return (
        <div className='center'>
            <Grid container spacing={8}>
                <Grid item xs={12} align="center">
                    <div style={{color: 'white', fontSize:'7vmin'}}>Welcome to the Drink Generator Lobby</div>
                </Grid>
                <Grid item xs={12} align="center">

                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonCreater style={{backgroundColor: '#383838'}} text='Create Room'
                    link='/create'/>
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonCreater style={{backgroundColor: '#383838'}} text='Join Room'
                    link='/join' />
                </Grid>
            </Grid>
        </div>
    );
}

export default Lobby;