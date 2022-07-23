import classes from './DrinkCard.module.css' 
import './DrinkCard.module.css'
import { Link } from '@mui/material'


function DrinkCard(props) {

    // dynamically passes in URL of the image to drinkCard, passed in rooms page drinks view with drinksArray info 
    const imageStyle = {
        
        backgroundImage: `url(${props.image})`,
        backgroundPosition: '50%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '200px',
        width: '240px',
    
    }

    return (
    <div>
        <article className={classes.previewcard}>
          <div className={classes.previewcarddiv}>
            <h3 className={classes.previewcarddivname}>
                <Link onClick={props.onClick} underline="hover" color='inherit'>
                {props.name}
                </Link>
              
            </h3>
          </div>
          <div style={imageStyle}>
            <div>
              <div
                style={imageStyle}
              ></div>
            </div>
          </div>
        </article>
    </div>
    );
}

export default DrinkCard;