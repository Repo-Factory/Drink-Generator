import { useParams } from 'react-router-dom';
import { useState} from 'react';
import { Box, Grid, RadioGroup, Radio, FormControlLabel, FormControl, FormHelperText} from '@mui/material'
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
        fetch('http://localhost:8000/cocktails/generate?drink=' + drink.toLowerCase())
        .then(response => response.json())
        .then(data => setDrinkArray(data))
    }   

    if (view === "Initialization") {
        return (
            <Grid container spacing={6}>
                <Grid item xs={12} align="center">
                
                </Grid>
                <Grid item xs={12} align="center">
                    <div style={{color: 'white', fontSize: '36px'}}> Room {code}</div>
                </Grid>
                <Grid item xs={12} align="center">
                    <div style={{color: 'white', fontSize: '36px'}}>Your Host: {host_name}</div>
                </Grid>
                <Grid item xs={12} align="center">
                
                </Grid>
              
                <Grid item xs={24} align="center">
                <Box textAlign='center'>
                <FormControl component='fieldset' align='center'>
                <FormHelperText align='center'>
                    <div style={{color: 'white', fontSize: '16px', marginBottom:20}} align='center'>Choose Your Drink</div>

                    <RadioGroup row defaultValue='true' align='center' style={{color: 'white', width:'auto', height:'auto', flexWrap: 'wrap', justifyContent: 'center', display: 'flex', fontSize: '16px'}}>
                        
                        <FormControlLabel  value='Tequila'
                            control={<Radio style={{color: 'white', width:'auto'}} />}
                            label='tequila'
                            labelPlacement='bottom'
                            onChange={(e) => setDrink(e.target.value)}
                        />
                        <FormControlLabel  value='Gin'
                            control={<Radio style={{color: 'white', width:'auto'}} />}
                            label='gin'
                            labelPlacement='bottom'
                            onChange={(e) => setDrink(e.target.value)}
                        />
                        <FormControlLabel  value='Vodka'
                            control={<Radio style={{color: 'white', width:'auto'}} />}
                            label='vodka'
                            labelPlacement='bottom'
                            onChange={(e) => setDrink(e.target.value)}
                        />
                         <FormControlLabel  value='Rum'
                            control={<Radio style={{color: 'white'}} />}
                            label='rum'
                            labelPlacement='bottom'
                            onChange={(e) => setDrink(e.target.value)}
                        />
                        <FormControlLabel  value='Champagne'
                            control={<Radio style={{color: 'white'}} />}
                            label='wine'
                            labelPlacement='bottom'
                            onChange={(e) => setDrink(e.target.value)}
                        />
                        <FormControlLabel  value='Brandy'
                            control={<Radio style={{color: 'white'}} />}
                            label='brandy'
                            labelPlacement='bottom'
                            onChange={(e) => setDrink(e.target.value)}
                        />

                    </RadioGroup>
                </FormHelperText>
            </FormControl>
            </Box>
                </Grid>
                <Grid item xs={6} align="center">
                
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonCreater style={{backgroundColor: '#383838'}} text='Generate Drinks'
                    link='' onClick={cocktailRequest}/>
                </Grid>
                <Grid item xs={12} align="center">
                
                </Grid>
                <Grid item xs={12} align="center">
                
                </Grid>
                
                <Grid container item xs={12}>
                    <Grid item xs={3} align="center">
                        <div style={{color: 'white', fontSize: '18px'}}>Votes to skip: {votes_to_skip}</div>
                    </Grid>
                    <Grid item xs={6} align="center">
                    <ButtonCreater style={{backgroundColor: '#383838'}} text='Back to Lobby'
                    link='/'/>
                    </Grid>
                    <Grid item xs={3} align="center">
                        <div style={{color: 'white', fontSize: '18px'}}>Number of Guests: {number_of_guests}</div>
                    </Grid>
                </Grid>
                
                
            </Grid>
        ); 
    }
    if (view === 'Drink') {
        let drinkCardItems = [];
        for(let i = 0; i < drinkArray.length; i++){
            drinkCardItems.push(<Grid item xs={12} sm={6} align='center'><DrinkCard name={drinkArray[i]['strDrink']} 
            image={drinkArray[i]['strDrinkThumb']} onClick={(e) => setDetails(drinkArray[i]['strDrink'])}
            /></Grid>)
        }

        return (
            <div> 
                <Grid container align='center'>
                    {drinkCardItems} 
                </Grid>
                <div className='button'>
                        <Grid item xs={12} align="center">
                            <ButtonCreater style={{backgroundColor: '#383838'}} text='New Drinks'
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
                            <h2 style={{color: 'white'}}> Ingredients List: </h2>
                            <h4 style={{color: 'white'}}>{detailsArray[3]}</h4>
                        </Grid>
                        <Grid item xs={12} align="center">
                            
                        </Grid>
                        <Grid item xs={12} align="center">
                            <h3 style={{color: 'white'}}>Appropriate Glass: </h3>
                            <h4 style={{color: 'white'}}>{detailsArray[1]}</h4>
                        </Grid>
                        <Grid item xs={12} align="center">
                            
                        </Grid>
                        <Grid item xs={12} align="center">
                            <h1 style={{color: 'white'}}> Instructions: </h1>
                            <h4 style={{color: 'white'}}>{detailsArray[2]}</h4>
                        </Grid>
                        <Grid item xs={12} align="center">
                            
                        </Grid>
                    </Grid>
                    <div className='button'>
                        <Grid item xs={12} align="center">
                            <ButtonCreater style={{backgroundColor: '#383838'}} text='Go Back'
                                link='' onClick={returnToDrinkView}/>
                        </Grid>
                    </div>
                </div>
            
        )
    }
}

export default Room;