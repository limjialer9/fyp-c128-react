import * as React from 'react'
import { useEffect } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import './Ordering.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import Autocomplete from '@mui/material/Autocomplete';

// Able to populate this list to increase countries and item options in dropdown list
const optionsCountries = ['Singapore'];
const optionsItem = ['34-720A'];

export default function Ordering() {

    //Function for sending data to orderdev database
    function callApi() {
        if (ifFalse === false) {
            var requestOptions = {
                method: 'PUT',
                body: JSON.stringify({
                    customerName: { valueName },
                    contactNumber: { valueContactNumber },
                    dateOrder: { value1 },
                    dateReceive: { value2 },
                    deliveryCountry: { valueCountry },
                    deliveryAddress: { valuePostalCode },
                    item: { valueItem },
                    quantity: { valueQuantity }
                })
            }
            fetch(process.env.REACT_APP_API, requestOptions) //API destination
                .then(data => data.json()) // Parsing the data into a JavaScript object
                .then(json => alert(JSON.stringify(json))) // Displaying the stringified data in an alert popup
        }
    }

    //Function for "Submit" button to work
    const handleSubmit = () => {
        //console.log({ customerName: { valueName }, contactNumber: { valueContactNumber }, dateOrder: { value1 }, dateReceive: { value2 }, deliveryCountry: { valueCountry }, deliveryAddress: { valuePostalCode }, item: { valueItem }, quantity: { valueQuantity } });
        callApi()
    }

    //Code for entering values into text boxes
    const [value1, setValue1] = React.useState('');
    const handleChange1 = (newValue) => {
        var val = newValue["$d"]
        const year = val.getFullYear();
        const month = String(val.getMonth() + 1).padStart(2, '0'); // add 1 to get 1-based month and pad with leading zero if needed
        const day = String(val.getDate()).padStart(2, '0')
        var varString = `${year}-${month}-${day}`
        setValue1(varString);
    };
    const [value2, setValue2] = React.useState('');
    const handleChange2 = (newValue) => {
        var val = newValue["$d"]
        const year = val.getFullYear();
        const month = String(val.getMonth() + 1).padStart(2, '0'); // add 1 to get 1-based month and pad with leading zero if needed
        const day = String(val.getDate()).padStart(2, '0')
        var varString = `${year}-${month}-${day}`
        setValue2(varString);
    };

    //Code for entering values into rest of fields
    const [valueName, setValueName] = React.useState(null);
    const [valueContactNumber, setValueContactNumber] = React.useState(null);
    const [valueQuantity, setValueQuantity] = React.useState(null);
    const [valuePostalCode, setValuePostalCode] = React.useState(null);
    const [valueCountry, setValueCountry] = React.useState(optionsCountries[0]);
    const [inputValueCountry, setInputValueCountry] = React.useState(optionsCountries[0]);
    const [valueItem, setValueItem] = React.useState(optionsItem[0]);
    const [inputValueItem, setInputValueItem] = React.useState(optionsCountries[0]);
    const [password, setPassword] = React.useState(null);
    const masterPassword = '1'
    const [ifFalse, setIfFalse] = React.useState(true)

    //If all fields are populated and password is correct, allow data to be pushed to API
    useEffect(() => {
        if ((valueName && valueContactNumber && value1 && value2 && valueCountry && valuePostalCode && valueQuantity && valueItem !== (null || '')) && password === masterPassword) {
            setIfFalse(false);
        }
        else {
            setIfFalse(true);
        }
    }, [valueName, valueContactNumber, value1, value2, valueCountry, valuePostalCode, valueItem, valueQuantity, password])

    // HTML for page layout
    return (
        <div className='ordering'>
            <div className='orderTitle'>Order Form</div>
            <div className='featuredItem'>
                <div className='featured2'>
                    <div>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: 'fit-content(25%)' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Customer Name"
                                    value={valueName}
                                    onChange={(event) => { setValueName(event.target.value) }}
                                />
                            </div>
                            <div>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Contact Number"
                                    value={valueContactNumber}
                                    onChange={(event) => { setValueContactNumber(event.target.value) }}
                                />
                            </div>
                        </Box>
                    </div>
                    <div>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: 'fit-content(25%)' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DesktopDatePicker
                                        disableFuture
                                        label='Order Date'
                                        inputFormat="DD/MM/YYYY"
                                        value={value1}
                                        onChange={handleChange1}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>
                            <div>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DesktopDatePicker
                                        disablePast
                                        label='Required Date'
                                        inputFormat="DD/MM/YYYY"
                                        value={value2}
                                        onChange={handleChange2}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>
                        </Box>
                    </div>
                    <div>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: 'fit-content(25%)' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div>
                                <Autocomplete
                                    value={valueCountry}
                                    onChange={(event, newValue) => {
                                        setValueCountry(newValue);
                                    }}
                                    inputValue={inputValueCountry}
                                    onInputChange={(event, newInputValue) => {
                                        setInputValueCountry(newInputValue);
                                    }}
                                    id="controllable-states-demo"
                                    options={optionsCountries}
                                    sx={{ width: '90%' }}
                                    renderInput={(params) => <TextField {...params} label="Destination Country" />}
                                />
                            </div>
                            <div>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Delivery Address Postal Code"
                                    value={valuePostalCode}
                                    onChange={(event) => { setValuePostalCode(event.target.value) }}
                                />
                            </div>
                        </Box>
                    </div>
                    <div>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: 'fit-content(25%)' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div>
                                <Autocomplete
                                    value={valueItem}
                                    onChange={(event, newValue) => {
                                        setValueItem(newValue);
                                    }}
                                    inputValue={inputValueItem}
                                    onInputChange={(event, newInputValue) => {
                                        setInputValueItem(newInputValue);
                                    }}
                                    id="controllable-states-demo"
                                    options={optionsItem}
                                    sx={{ width: '90%' }}
                                    renderInput={(params) => <TextField {...params} label="Item Code" />}
                                />
                            </div>
                            <div>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Item Quantity"
                                    value={valueQuantity}
                                    onChange={(event) => { setValueQuantity(event.target.value) }}
                                />
                            </div>
                        </Box>
                    </div>
                </div>
                <div className="submitButton">
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        onChange={(event) => { setPassword(event.target.value) }}
                        size='small'
                    />
                    <Button variant="outlined" disabled={ifFalse} onClick={handleSubmit}>Submit</Button>
                </div>
            </div>
        </div>
    )
}