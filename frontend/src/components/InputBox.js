import { FormControl, FormHelperText, TextField }  from '@mui/material';

const boxStyle = {
    root: {
        '&$disabled $notchedOutline': {
        borderColor: 'orange'
        }
    },
    disabled: {},
    notchedOutline: {}
}

function InputBox(props) {
    return (
    <FormControl >
        <TextField
            sx={{
                "& .MuiOutlinedInput-root:hover": {
                    "& > fieldset": {
                      borderColor: "white"
                    }
                  },
                "& .MuiOutlinedInput-root.Mui-focused": {
                    "& > fieldset": {
              borderColor: "white"
                    }
                  },
                "& .MuiInputLabel-root": {color: 'white'},//styles the label
                "& .MuiOutlinedInput-root": {
                  "& > fieldset": { borderColor: "white" },
                },
              }}
            
            variant="outlined"
            required={true}
            type={props.type}
            defaultValue={props.default}
            onChange={props.onChange}
            inputProps={{min: 1, style: {color:'white'},
            }}
            />
        <FormHelperText style={{color:'white', fontSize: '15px'}}>
            <div align='center'>
                {props.message}
            </div>
        </FormHelperText>
    </FormControl>
    );
}

export default InputBox;