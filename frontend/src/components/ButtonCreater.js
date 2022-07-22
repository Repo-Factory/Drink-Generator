import { Button } from '@mui/material';
import { Link } from 'react-router-dom'

function ButtonCreater(props) {
    return (
    <Button 
    style={props.style}
    color={props.color} variant='contained' 
    to={props.link} 
    component={Link} 
    onClick={props.onClick}
    >
    {props.text}
    </Button>
    );
}

export default ButtonCreater;