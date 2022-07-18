import Banner from '../components/Banner';
import ButtonCreater from '../components/ButtonCreater';
import { Grid } from '@mui/material'


function Lobby() {

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Banner text='Welcome to the Drink Generator Lobby' size='24'/>
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
    );
}

export default Lobby;