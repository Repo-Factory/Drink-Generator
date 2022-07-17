import { Button } from '@mui/material';
import { Link } from 'react-router-dom'

function ButtonCreater(props) {
    return (
    <Button 
    color={props.color} variant='contained' 
    to={props.link} component={Link}
    >
        {props.text}
    </Button>
    );
}

export default ButtonCreater;