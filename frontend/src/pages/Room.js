import { useParams } from 'react-router-dom';
import { useState} from 'react';
import { Grid, RadioGroup, Radio, FormControlLabel, FormControl, FormHelperText} from '@mui/material'
import ButtonCreater from '../components/ButtonCreater';
import { useEffect} from 'react';
import DrinkCard from '../components/DrinkCard';


function Room(props) {
    const { roomCode } = useParams();
    const [host_name, setHostName] = useState('');
    const [votes_to_skip, setVotesToSkip] = useState('');
    const [number_of_guests, setGuestNumber] = useState('');
    const [code, setCode] = useState('');
    const [image, setImage] = useState('');
    const [details, setDetails] = useState('');
    const [drink, setDrink] = useState('Vodka');
    const [view, setView] = useState('Initialization');
    const [drinkArray, setDrinkArray] = useState([]);
    const [detailsArray, setDetailsArray] = useState([]);


    fetch('http://localhost:8000/api/room?code=' + roomCode)
        .then(response => response.json())
        .then(data => {
            setHostName(data.host_name)
            setVotesToSkip(data.votes_to_skip)
            setCode(data.code)
            setGuestNumber(data.number_of_guests)
        });
    

    useEffect(() => {
        if (details === ''){
        }
        else {
        setTimeout(() => { setView('Details') }, 1000);
        console.log(details)
        fetch('http://localhost:8000/cocktails/details?name=' + details)
        .then(response => response.json())
        .then(data => setDetailsArray(data))
        }
    }, [details]);
    

    function returnToInitialView(){
        setView('Initialization')
    }
   
    function returnToDrinkView(){
        setView('Drink')
    }

    function cocktailRequest(){
        setView('Drink')
        fetch('http://localhost:8000/cocktails/generate?drink=' + drink)
        .then(response => response.json())
        .then(data => setDrinkArray(data))
    }   

    if (view === "Initialization") {
        return (
            <Grid container spacing={6}>
                <Grid item xs={12} align="center">
                
                </Grid>
                <Grid item xs={12} align="center">
                    <h1>{code}</h1>
                </Grid>
                <Grid item xs={12} align="center">
                    <h1>Your Host: {host_name}</h1>
                </Grid>
                <Grid item xs={12} align="center">
                
                </Grid>
                <Grid item xs={12} align="center">
                
                </Grid>
                <Grid item xs={12} align="center">
                <FormControl component='fieldset'>
                <FormHelperText>
                    <h3 align='center'>Choose Your Drink</h3>
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
                         <FormControlLabel  value='Rum'
                            control={<Radio color='primary' />}
                            label='rum'
                            labelPlacement='bottom'
                            onChange={(e) => setDrink(e.target.value)}
                        />
                        <FormControlLabel  value='Whiskey'
                            control={<Radio color='primary' />}
                            label='whiskey'
                            labelPlacement='bottom'
                            onChange={(e) => setDrink(e.target.value)}
                        />
                        <FormControlLabel  value='Brandy'
                            control={<Radio color='primary' />}
                            label='brandy'
                            labelPlacement='bottom'
                            onChange={(e) => setDrink(e.target.value)}
                        />
                    
                    </RadioGroup>
                    
                       
                </FormHelperText>
            </FormControl>
                </Grid>
                <Grid item xs={6} align="center">
                
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonCreater color='secondary' text='Generate Drinks'
                    link='' onClick={cocktailRequest}/>
                </Grid>
                <Grid item xs={12} align="center">
                
                </Grid>
                <Grid item xs={12} align="center">
                
                </Grid>
                
               
                
                <Grid container item xs={12}>
                    <Grid item xs={4} align="center">
                        <h3>Votes to skip: {votes_to_skip}</h3>
                    </Grid>
                    <Grid item xs={4} align="center">
                    <ButtonCreater color='secondary' text='Back to Lobby'
                    link='/'/>
                    </Grid>
                    <Grid item xs={4} align="center">
                        <h3>Number of Guests: {number_of_guests}</h3>
                    </Grid>
                </Grid>
                
                
            </Grid>
        ); 
    }
    if (view === 'Drink') {
        let drinkCardItems = [];
        for(let i = 0; i < drinkArray.length; i++){
            drinkCardItems.push(<Grid item xs={12} sm={6} align='center'><DrinkCard name={drinkArray[i]['strDrink']} 
            image={drinkArray[i]['strDrinkThumb']} onClick={(e) => setDetails(drinkArray[i]['strDrink'].toLowerCase())}
            /></Grid>)
        }

        return (
            <div> 
                <Grid container align='center'>
                    {drinkCardItems} 
                </Grid>
                <div className='button'>
                        <Grid item xs={12} align="center">
                            <ButtonCreater color='secondary' text='New Drinks'
                                link='' onClick={returnToInitialView}/>
                        </Grid>
                </div>
            </div>
        )
    }
    if (view === 'Details') {
        
        const id = detailsArray[0]
        fetch('http://localhost:8000/cocktails/id?id=' + id)
        .then(response => response.json())
        .then(data => {setImage(data)});

        return (
                <div className = 'detailsCenter'>
                    <Grid container spacing={2}>
                        <Grid item xs={12} align="center">
                        <DrinkCard name={details} image={image}/>
                        </Grid>
                        <Grid item xs={12} align="center">
                            
                        </Grid>
                        <Grid item xs={12} align="center">
                            <h2> Ingredients List: </h2>
                            <h4>{detailsArray[3]}</h4>
                        </Grid>
                        <Grid item xs={12} align="center">
                            
                        </Grid>
                        <Grid item xs={12} align="center">
                            <h3>Appropriate Glass: </h3>
                            <h4>{detailsArray[1]}</h4>
                        </Grid>
                        <Grid item xs={12} align="center">
                            
                        </Grid>
                        <Grid item xs={12} align="center">
                            <h1> Instructions: </h1>
                            <h4>{detailsArray[2]}</h4>
                        </Grid>
                        <Grid item xs={12} align="center">
                            
                        </Grid>
                        <Grid item xs={12} align="center">
                        <ButtonCreater color='secondary' text='Go Back'
                            link='' onClick={returnToDrinkView}/>
                        </Grid>
                    </Grid>
                </div>
            
        )
    }
}

export default Room;