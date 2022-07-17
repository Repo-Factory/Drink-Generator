import { FormControl, FormHelperText, TextField }  from '@mui/material';

function InputBox(props) {
    return (
    <FormControl>
        <TextField
            required={true}
            type={props.type}
            defaultValue={props.default}
            onChange={props.onChange}
            inputProps={{min: 1,
            }}
            />
        <FormHelperText>
            <div align='center'>
                {props.message}
            </div>
        </FormHelperText>
    </FormControl>
    );
}

export default InputBox;