import Banner from '../components/Banner';
import ButtonCreater from '../components/ButtonCreater';
import { Grid } from '@mui/material'


function Lobby() {

    return (
        <div className='center'>
            <Grid container spacing={8}>
                <Grid item xs={12} align="center">
                    <h2>Welcome to the Drink Generator Lobby</h2>
                </Grid>
                <Grid item xs={12} align="center">

                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonCreater color='secondary' text='Create Room'
                    link='/create'/>
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonCreater color='secondary' text='Join Room'
                    link='/join' />
                </Grid>
            </Grid>
        </div>
    );
}

export default Lobby;