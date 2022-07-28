import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FormHelperText, Grid }  from '@mui/material';
import ButtonCreater from '../components/ButtonCreater';
import InputBox from '../components/InputBox';



function CreateRoom() {
    const navigate = useNavigate(); //used to navigate to room link in App.js Room route
    
    const [host_name, setHostName] = useState(''); // values inputed in form, state is changed onChange of form
    const [votes_to_skip, setVotesToSkip] = useState('2');
    var csrftoken = makeCookie('csrftoken');

   
    //function needed to generate CSRF token provided from Django Documentation
    function makeCookie(token) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = (cookies[i]).trim();
                if (cookie.substring(0, token.length + 1) === (token + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(token.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }


    // when create room clicked, post request made to django to make new room with info from form
    // this spits out a response afterwards with info on the room that the user doesn't change
    // for example, the room code, and host session, the roomcode of the created room is given back
    // so that react can navigate to the new room page; the URL code serves as a parameter
    // to be used by the room page to get details on that room from django
    async function handleSubmitRoom() {
        const createdRoom = {host_name, votes_to_skip};
        console.log(createdRoom)
        console.log(JSON.stringify(createdRoom))
        try{
            const response = await fetch('http://localhost:8000/rooms/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken //POST request header needs CSRF Token generated above to accept request
                },
                body: JSON.stringify(createdRoom),
            })
            const json = await response.json();
            console.log(json)
            console.log(json['code'])
            const link = '/room/' + json['code']
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