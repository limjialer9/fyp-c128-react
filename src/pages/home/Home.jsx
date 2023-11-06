import React from 'react'
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import './Home.css';
import Papa from 'papaparse';

export default function Home() {

    const [isOpen, setIsOpen] = useState(true);
    const [content, setContent] = useState(false);
    const [data, setData] = useState();
    const [columnArray, setColumn] = useState();
    const [valuesArray, setValues] = useState();

    const Popup = props => {
        return (
            <div className="popup-box">
                <div className="box">
                    <span className="close-icon" onClick={props.handleClose}>x</span>
                    {props.content}
                </div>
            </div>
        );
    };

    const handleFile = (event) => (
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (result) {
                const columnArray = [];
                const valuesArray = [];

                result.data.map((d) => {
                    columnArray.push(Object.keys(d));
                    valuesArray.push(Object.values(d))
                });
                setData(result.data);
                setColumn(columnArray[0])
                setValues(valuesArray)
            }
        }
        ))

    //Function for sending new CSV data to orderdev database
    //Take CSV, compile it into an array of data here first. Then POST it to lambda as a nested list
    /*
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
    */

    const togglePopup = (selector) => {
        if (selector === 'startwindow') {
            setContent(<>
                <b>Date Tracker</b>
                <p>The current week is some week which I need to pull later on.
                </p>
            </>
            )
        } else if (selector === 'MPS') {
            setContent(<>
                <b>Master Production Scheduling</b>
                <p>The Master Production Scheduling (MPS) is a developed plan to produce an individual item.
                    It breaks down the PP to show a higher-level detail for each period and quantity of each item to be made.
                    MPS takes in inputs such as orders, forecasts, and inventory capacities to plan out a high-levelled detail production plan.
                </p>
                <br />
                <ul>
                    <li>
                        Chase Strategy
                        <ul>
                            <li>
                                <p>
                                    Chase Strategy is the strategy whereby production matches demand and does not carry leftover products, unless safety stock specified.<br />
                                    <br /><b><math xmlns="http://www.w3.org/1998/Math/MathML"><mi>M</mi><mi>P</mi><msub><mi>S</mi><mi>n</mi></msub><mo>=</mo><mi>F</mi><mi>o</mi><mi>r</mi><mi>e</mi><mi>c</mi><mi>a</mi><mi>s</mi><mi>t</mi><mi>e</mi><mi>d</mi><mo>&#xA0;</mo><mi>D</mi><mi>e</mi><mi>m</mi><mi>a</mi><mi>n</mi><mi>d</mi></math></b>
                                </p>
                            </li>
                        </ul>
                    </li>
                    <br />
                    <li>
                        Level Strategy
                        <ul>
                            <li>
                                <p>
                                    Level Strategy, as the name suggests, is the approach whereby production is at a constant uniform rate of output with inventory build-ups and depletions over the planning horizon.<br />
                                    <br /><b><math xmlns="http://www.w3.org/1998/Math/MathML"><mi>M</mi><mi>P</mi><msub><mi>S</mi><mi>n</mi></msub><mo>&#xA0;</mo><mo>=</mo><mo>&#xA0;</mo><mfrac><mrow><msubsup><mo>&#x2211;</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>m</mi></msubsup><mo>(</mo><mi>F</mi><mi>o</mi><mi>r</mi><mi>e</mi><mi>c</mi><mi>a</mi><mi>s</mi><mi>t</mi><mi>e</mi><mi>d</mi><mo>&#xA0;</mo><mi>D</mi><mi>e</mi><mi>m</mi><mi>a</mi><mi>n</mi><msub><mi>d</mi><mi>i</mi></msub><mo>)</mo></mrow><mi>n</mi></mfrac></math></b>
                                </p>
                            </li>
                        </ul>
                    </li>
                    <br />
                    <li>
                        Lot Size Strategy
                        <ul>
                            <li>
                                <p>
                                    Often the same production process is used to make different items. In this case, production must switch from one item to the next, and this switching usually involves some changeover time.
                                    To minimise the impact of the loss of production due to the changeover, parts are made in batches rather than one at a time.
                                    The number of units made in a batch is referred to as the lot size strategy.
                                </p>
                            </li>
                        </ul>
                    </li>
                </ul>

            </>
            )
        } else if (selector === 'Demand Forecasting') {
            setContent(<>
                <b>Demand Forecasting</b>
                <p>Demand forecasting is an important MPC module for supply chain management.
                    It aids in planning adequate demand amounts to ensure customer satisfaction without creating
                    surpluses by performing computations to historical data using various methods.<br /><br />
                </p>
                <p>
                    There are 3 forecasting functionalities in the application:
                </p>
                <br />
                <ul>
                    <li>
                        Moving Average
                        <ul>
                            <li>
                                <p>
                                    <math xmlns="http://www.w3.org/1998/Math/MathML"><msub><mi>f</mi><mrow><mi>t</mi><mo>+</mo><mi>&#x3c4;</mi></mrow></msub><mo>&#xA0;</mo><mo>=</mo><mo>&#xA0;</mo><mfrac><mn>1</mn><mi>m</mi></mfrac><msubsup><mo>&#x2211;</mo><mrow><mi>i</mi><mo>=</mo><mi>t</mi><mo>-</mo><mi>m</mi><mo>+</mo><mn>1</mn></mrow><mi>t</mi></msubsup><msub><mi>A</mi><mi>i</mi></msub></math>
                                </p>
                            </li>
                        </ul>
                    </li>
                    <br />
                    <li>
                        Exponential Moving Average
                        <ul>
                            <li>
                                <p>
                                    <math xmlns="http://www.w3.org/1998/Math/MathML"><msub><mi>F</mi><mi>t</mi></msub><mo>&#xA0;</mo><mo>=</mo><mo>&#xA0;</mo><mi>&#x3b1;</mi><msub><mi>A</mi><mi>t</mi></msub><mo>+</mo><mo>(</mo><mn>1</mn><mo>-</mo><mi>&#x3b1;</mi><mo>)</mo><msub><mi>F</mi><mrow><mi>t</mi><mo>-</mo><mn>1</mn></mrow></msub></math>
                                </p>
                            </li>
                        </ul>
                    </li>
                    <br />
                    <li>
                        Linear Regression
                        <ul>
                            <li>
                                <p>
                                    <math xmlns="http://www.w3.org/1998/Math/MathML"><mi>y</mi><mo>&#xA0;</mo><mo>=</mo><mo>&#xA0;</mo><msub><mi>b</mi><mi>o</mi></msub><mo>+</mo><msub><mi>b</mi><mn>1</mn></msub><mi>x</mi></math>
                                </p>
                            </li>
                        </ul>
                    </li>
                </ul>

            </>
            )
        } else if (selector === 'MRP') {
            setContent(<>
                <b>Material Requirement Planning</b>
                <p>Material Requirement Planning (MRP) is a basic tool for performing detailed material planning of component parts and their assembly into finished items.
                    MRP’s managerial objective is to provide ‘the right part at the right time’ to meet the schedules set via the MPS.</p>
            </>
            )
        }
        setIsOpen(!isOpen);
    }

    const buttonStyle = {
        p: 2,
        border: '#f1f1f1',
        borderRadius: '16px',
        m: 2,
        color: 'purple',
        fontFamily: 'Arial',
        textTransform: 'none',
        boxShadow: 2
    }

    useEffect(() => {
        const initialPopup = () => {
            setContent(<>
                <b>Date Tracker</b>
                <p>The current week is some week which I need to pull later on.
                </p>
            </>
            )
        }
        initialPopup();
    }, []);

    // HTML for page layout
    return (
        < div className="home" >
            <div className="midWrap">
                <p>
                    <var>{useEffect}</var>
                    <h1><b><span style={{ color: '#AD6ADF' }}>Manufacturing Planning and Control Tool</span></b></h1><br />
                    The objective of this tool is to allow the user to perform <b>forecasting, master production scheduling,
                        and material requirement planning</b> for data seamlessly and in an integrated manner.
                    <br /><br />
                    The tool is able to develop plans based off different sets of historical customer order data, and also
                    allows the user to add individual new orders to the existing dataset. <br /><br />

                    <b>Uploading new dataset</b><br />The template form for creating a new dataset of customer orders can be found below.
                    Please do not tamper with the column names, and ensure that all rows are populated. The uploaded file should
                    be in <b>CSV</b> format.<br /><br />


                    <div className="functions">
                        <input
                            type="file"
                            name="file"
                            accept='.csv'
                            onChange={handleFile}>
                        </input>
                        <Button sx={buttonStyle} onClick={() => { togglePopup('MPS') }}>
                            Download dataset template
                        </Button>
                    </div><br />

                    <b>App Functions</b><br />
                    <div className="functions">
                        <Button sx={buttonStyle} onClick={() => { togglePopup('Demand Forecasting') }}>
                            Demand Forecasting
                        </Button>
                        <Button sx={buttonStyle} onClick={() => { togglePopup('MPS') }}>
                            Master Production Scheduling
                        </Button>
                        <Button sx={buttonStyle} onClick={() => { togglePopup('MRP') }}>
                            Material Requirement Planning
                        </Button>
                        {isOpen && <Popup
                            content={content}
                            handleClose={togglePopup}
                        />}
                    </div>
                </p>
            </div >
        </div >
    )
}