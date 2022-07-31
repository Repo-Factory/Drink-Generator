import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, RadioGroup, Radio, FormControlLabel, FormControl, FormHelperText} from '@mui/material'
import ButtonCreater from '../components/ButtonCreater';
import DrinkCard from '../components/DrinkCard';


/** 
*  Heaviest page of the website, fields store info on the room plus details of the drinks, has three views - Initial, drink, and details
* 1. first page has a list of alcohols to choose from 
* 2. generate drink buttons displays drinks to the user on new view,
* 3. names can be clicked on to be directed to a new view with more details
*/


function Room() {
    const [view, setView] = useState('Initial');
    const { roomCode } = useParams(); // roomCode passed in by URL through react route when directed to room page : see App.js
    const [code, setCode] = useState('');
    const [host_name, setHostName] = useState('');
    const [votes_to_skip, setVotesToSkip] = useState('');
    const [number_of_guests, setGuestNumber] = useState('');
    const [drink, setDrink] = useState('Vodka');
    const [currentDrinkname, setCurrentDrinkName] = useState('');
    const [currentDrinkimage, setCurrentDrinkImage] = useState('');
    const [drinkArray, setDrinkArray] = useState([]);
    const [detailsArray, setDetailsArray] = useState([]);
    const [roomCodeCalled, setRoomCodeCalled] = useState('False');


    // uses roomcode from URL to display details about that room
    if (roomCodeCalled === 'False') {
        fetch('http://localhost:8000/rooms/room?code=' + roomCode)
        .then(response => response.json())
        .then(data => {
            setHostName(data.host_name);
            setVotesToSkip(data.votes_to_skip);
            setCode(data.code);
            setGuestNumber(data.number_of_guests);
        }).then(setRoomCodeCalled('True'));
         // prevents this from getting called infinitely
    }
    

    // When 'Generate Drinks' button is clicked, an array of drink names and images is requested from the backend
    // and displayed to the user through the drinkCard component
    const cocktailRequest = async() => {
        const data = await fetchDrinks(drink)
        setDrinkArray(data)
        setView('Drink')
    }   


    // When drinkCard name is clicked, that name is saved to 'currentDrinkName' which triggers useEffect to request details from the API by name, this doesn't retrieve image, 
    // but does retrieve an id used in details view to  make another request and get the image
    useEffect(() => {
        if (currentDrinkname === '') {
        }
        else {
            const detailsRequest = async () => {
                const data = await fetchDetails(currentDrinkname);
                setDetailsArray(data);
            }
            detailsRequest();
        }
    }, [currentDrinkname]);
    

    //once the details array is set, an API request can be made to request the image using the id of that drink
    useEffect(() => {
        if (detailsArray.length === 0) {
        }
        else{
            const id = detailsArray[0];
            const imageRequest = async () => {
                const data = await fetchImage(id);
                setCurrentDrinkImage(data);
                setView('Details');
            }
            imageRequest();
        }
    }, [detailsArray])


    //api call to generate random drinks based on alcohol type @param drink
    async function fetchDrinks(drink) {
        const data = await fetch('http://localhost:8000/cocktails/generate?drink=' + drink.toLowerCase());
        return await data.json();
    }

    //api call to get details of a drink by name
    async function fetchDetails(name) {
        const data = await fetch('http://localhost:8000/cocktails/name?name=' + name.toLowerCase());
        return await data.json();
    }


    //api call to get image of drink by id (found in details)
    async function fetchImage(id) {
        const data = await fetch('http://localhost:8000/cocktails/id?id=' + id);
        return await data.json();
    }


    function returnToInitialView() {
        setView('Initial');
    }
   

    function returnToDrinkView() {
        setView('Drink');
    }


/**
 * 
 *  Initial View
 * 
 */


    if (view === "Initial") {
        return (
            <Grid container spacing={6}>
                <Grid item xs={12} align="center">
                                                                                            
                </Grid>
                <Grid item xs={12} align="center">
                    <div style={{color: 'white', fontSize: '36px'}}>Room {code}</div>
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


/**
 * 
 * Drink View 
 * 
 */


    if (view === 'Drink') {
        let drinkCardItems = [];
        for(let i = 0; i < drinkArray.length; i++){
            drinkCardItems.push(<Grid item xs={12} sm={6} align='center'><DrinkCard name={drinkArray[i]['strDrink']} 
            image={drinkArray[i]['strDrinkThumb']} onClick={() => setCurrentDrinkName(drinkArray[i]['strDrink'])}
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


/**
 * 
 * Details View
 * 
 */


if (view === 'Details') {
        

        return (
            
                <div className = 'detailsCenter'>
                    <Grid container spacing={2}>
                        <Grid item xs={12} align="center">
                        <DrinkCard name={currentDrinkname} image={currentDrinkimage}/>
                        </Grid>
                        <Grid item xs={12} align="center">
                            
                        </Grid>
                        <Grid item xs={12} align="center">
                            <h2 style={{color: 'white'}}> Ingredients List:</h2>
                            <h4 style={{color: 'white'}}>{detailsArray[3]}</h4>
                        </Grid>
                        <Grid item xs={12} align="center">
                            
                        </Grid>
                        <Grid item xs={12} align="center">
                            <h3 style={{color: 'white'}}>Appropriate Glass:</h3>
                            <h4 style={{color: 'white'}}>{detailsArray[1]}</h4>
                        </Grid>
                        <Grid item xs={12} align="center">
                            
                        </Grid>
                        <Grid item xs={12} align="center">
                            <h1 style={{color: 'white'}}> Instructions:</h1>
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