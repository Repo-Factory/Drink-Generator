import { useParams } from 'react-router-dom';
import { useState} from 'react';
import { Grid, RadioGroup, Radio, FormControlLabel, FormControl, FormHelperText} from '@mui/material'
import ButtonCreater from '../components/ButtonCreater';
import DrinkSelections from '../components/DrinkSelections';
import { useEffect} from 'react';
import DrinkCard from '../components/DrinkCard';

function Room(props) {
    const { roomCode } = useParams()
    const [host_name, setHostName] = useState('');
    const [votes_to_skip, setVotesToSkip] = useState('');
    const [number_of_guests, setGuestNumber] = useState('');
    const [code, setCode] = useState('')
    const [drink, setDrink] = useState('Vodka')
    const [view, setView] = useState('Initialization')
    const [drinkArray, setDrinkArray] = useState([])

    fetch('http://localhost:8000/api/room?code=' + roomCode)
        .then(response => response.json())
        .then(data => {
            setHostName(data.host_name)
            setVotesToSkip(data.votes_to_skip)
            setCode(data.code)
            setGuestNumber(data.number_of_guests)
        });
    
    useEffect(() => {
        console.log(drink)
        }, [drink]) 
    

        //if (this.state.view === "employees") return <div>orange</div>;
        //if (this.state.view === "department") return <div > apple </div>;

    function returnToView(){
        console.log(drinkArray)
        setView('Initialization')

    }

    function cocktailRequest(){
        setView('Drink')
        fetch('http://localhost:8000/cocktails/generate?drink=' + drink)
        .then(response => response.json())
        .then(data => setDrinkArray(data))
    }   

    if (view === "Initialization") {
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
                <Grid item xs={12} align="center">
                    Number of Guests: {number_of_guests}
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonCreater color='secondary' text='Back to Lobby'
                    link='/' />
                </Grid>
                <Grid item xs={12} align="center">
                <FormControl component='fieldset'>
                <FormHelperText>
                    <div align='center'>Choose Your Drink</div>
                    <RadioGroup row defaultValue='true'>
                    
                        <FormControlLabel  value='Tequila'
                            control={<Radio color='primary' />}
                            label='tequila'
                            labelPlacement='bottom'
                            onChange={(e) => setDrink(e.target.value)}
                        />
                    
                        <FormControlLabel  value='Gin'
                            control={<Radio color='primary' />}
                            label='gin'
                            labelPlacement='bottom'
                            onChange={(e) => setDrink(e.target.value)}
                        />

                        <FormControlLabel  value='Vodka'
                            control={<Radio color='primary' />}
                            label='vodka'
                            labelPlacement='bottom'
                            onChange={(e) => setDrink(e.target.value)}
                        />

                    </RadioGroup>
                    
                </FormHelperText>
            </FormControl>
        
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonCreater color='secondary' text='Generate Drinks'
                    link='' onClick={cocktailRequest}/>
                </Grid>
                <Grid item xs={12} align="center">
                </Grid>
                <Grid item xs={12} align="center">
                
                </Grid>
            </Grid>
        ); 
    }
    if (view === 'Drink') {
        let drinkCardItems = [];
        for(let i = 0; i < drinkArray.length; i++){
            console.log(drinkArray[i]['strDrink'])
            console.log(drinkArray[i]['strDrinkThumb'])
        }


        for(let i = 0; i < drinkArray.length; i++){
            drinkCardItems.push(<DrinkCard name={drinkArray[i]['strDrink']} />)
        }

        return (
            <span> 
                <span>
                    {drinkCardItems} 
                </span>
                <Grid item xs={12} align="center">
                <ButtonCreater color='secondary' text='New Drinks'
                    link='' onClick={returnToView}/>
                </Grid>
            </span>
        )
    }
}

export default Room;