import { RadioGroup, Radio, FormControlLabel, FormControl, FormHelperText } from '@mui/material'
import setDrink from '../pages/Room';


function DrinkSelections() {
    return (
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
    
    );
}
export default DrinkSelections;