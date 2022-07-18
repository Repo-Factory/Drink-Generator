import classes from './DrinkCard.module.css' 
import './DrinkCard.module.css'

function DrinkCard(props) {


    return (
    <div>
        <article className ={classes.previewcard}>
          <div clasName={classes.previewcarddiv}>
            <h3 className={classes.previewcarddivname}>
              {props.name}
            </h3>
          </div>
          <div className={classes.previewcardimage}>
            <div class="false-stuffed">
              <div
                className={classes.previewcardimage}
              ></div>
            </div>
          </div>
        </article>
    </div>
    );
}

export default DrinkCard;