import React, { useEffect } from 'react'
import './Masterproductionscheduling.css'
import { useState } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import 'trendline';
import { Box } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { makeStyles } from "@material-ui/core/styles";
import { useContext } from 'react';
import { UserContext } from '../../UserContext';
import Button from '@mui/material/Button';

const useStyles = makeStyles({
  sticky: {
    position: "sticky",
    left: 0,
    width: 300,
    background: 'white'
  },
  sticky2: {
    position: "sticky",
    left: 0,
    width: 350,
    background: 'white'
  },
  cellStyles: {
    width: 80
  }
});

//For the freeze toggle

export default function Masterproductionscheduling() {

  //Fetching weekly-delivery data from DynamoDB through API upon MPS launch
  const useFetch2 = () => {
    const [dataAPI2, setData2] = useState(null);
    useEffect((url = process.env.REACT_APP_API) => {
      //Retrieve from order-data by specifying value to be orderhistory
      async function fetchData2() {
        const response2 = await fetch(url, { method: 'GET', headers: { 'value': 'deliveryweekly' } });
        const dataAPI2 = await response2.json();

        setData2(dataAPI2);
      }
      fetchData2();
    }, []);
    return { dataAPI2 };
  };

  function testOrderFunc() {
    if (ifFalse === false) {

    }
  }
  //Function for "Test Order" button to work
  const handleTestOrder = () => {
    testOrderFunc()
  }

  const classes = useStyles();
  const { overridevalue1 } = useContext(UserContext);
  const { overridevalue2 } = useContext(UserContext);
  const { overridevalue3 } = useContext(UserContext);
  const { overridevalue4 } = useContext(UserContext);
  const { overridevalue5 } = useContext(UserContext);
  const { overridevalue6 } = useContext(UserContext);
  const { overridevalue7 } = useContext(UserContext);
  const { overridevalue8 } = useContext(UserContext);
  const { overridevalue9 } = useContext(UserContext);
  const { overridevalue10 } = useContext(UserContext);
  const { overridevalue11 } = useContext(UserContext);
  const { overridevalue12 } = useContext(UserContext);
  const { overridevalue13 } = useContext(UserContext);
  const { overridevalue14 } = useContext(UserContext);
  const { MPSdata, setMPSdata } = useContext(UserContext);
  var { dateList } = useContext(UserContext);
  const { dataAPI, loading } = useContext(UserContext)
  const { dataAPI2 } = useFetch2()
  var dataAPI2_array = []
  for (var i in dataAPI2)
    dataAPI2_array.push([i, dataAPI2[i]]);
  const removedDateList = dateList.slice(1);
  console.log('Date list for forecast: ', removedDateList)

  const [strategyName, setStrategyName] = useState('Lot Size Strategy')
  const [freezeToggle, setFreezeToggle] = useState('Unfrozen')
  var [mpsOne, setMpsOne] = useState(0)
  var [mpsTwo, setMpsTwo] = useState(0)
  var [mpsThree, setMpsThree] = useState(0)
  var [mpsFour, setMpsFour] = useState(0)

  var mps_data = null
  var delivery_data = []
  var projected_balance = null
  var atp_cumulative = null
  var atp_discrete1 = null
  var atp_discrete2 = null
  var atp_holding = 0
  var mps_tracker = []
  var ordersum_holding = 0
  var atp_discrete2_holding = 0
  var atp_discrete_transition = 0

  var delivery_dates_initial = null
  var delivery_data_initial = null

  const [valueSlider, setValueSlider] = useState(500);
  const changeValueSlider = (event, value) => {
    setValueSlider(value);
    setMyCondition(true);
  };
  const [valueSliderLS, setValueSliderLS] = useState(500);
  const changeValueSliderLS = (event, value) => {
    setValueSliderLS(value);
    setMyCondition(true)
  };
  const [valueSliderSS, setValueSliderSS] = useState(100);
  const changeValueSliderSS = (event, value) => {
    setValueSliderSS(value);
    setMyCondition(true)
  };
  const [testOrder, setTestOrder] = useState(0);
  const changeTestPeriod = (event, value) => {
    setTestPeriod(value);
    setMyCondition(true)
  };
  const [testPeriod, setTestPeriod] = useState(0);
  const changeTestOrder = (event, value) => {
    setTestOrder(value);
    setMyCondition(true)
  };
  const [myCondition, setMyCondition] = useState(true);
  if (dataAPI !== null) {
    //Retrieving weekly-order database from DynamoDB
    var keys = Object.keys(dataAPI)
    var values = Object.values(dataAPI)
    var LRVal = [overridevalue1, overridevalue2, overridevalue3, overridevalue4, overridevalue5, overridevalue6, overridevalue7, overridevalue8, overridevalue9, overridevalue10, overridevalue11, overridevalue12, overridevalue13, overridevalue14]
    var balance = valueSlider
    delivery_dates_initial = []
    delivery_data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    delivery_data_initial = []

    for (let i = 0; i < dataAPI2_array.length; i++) {
      delivery_dates_initial.push(dataAPI2_array[i][0])
      delivery_data_initial.push(dataAPI2_array[i][1])
    }

    for (let i = 0; i < removedDateList.length; i++) {
      for (let j = 0; j < delivery_dates_initial.length; j++) {
        if (removedDateList[i] === delivery_dates_initial[j]) {
          delivery_data[i] = delivery_data_initial[j]
        }
      }
    }
    console.log('delivery_data:', delivery_data)

    if (strategyName === 'Chase Strategy') {
      if (freezeToggle === 'Unfrozen') {
        atp_discrete1 = []
        atp_discrete2 = []
        atp_cumulative = []
        projected_balance = []
        mps_data = []
        balance = valueSlider

        for (let i = 0; i < 14; i++) {
          balance = balance - LRVal[i]
          if (balance < valueSliderSS) {
            projected_balance.push(valueSliderSS)
            mps_data.push(valueSliderSS - balance)
            balance = valueSliderSS
          } else {
            projected_balance.push(balance)
            mps_data.push(0)
          }
        }

      } else {
        atp_discrete1 = []
        atp_discrete2 = []
        atp_cumulative = []
        projected_balance = []
        mps_data = []
        mps_data.push(mpsOne)
        mps_data.push(mpsTwo)
        mps_data.push(mpsThree)
        mps_data.push(mpsFour)
        balance = valueSlider

        for (let i = 0; i < 4; i++) {
          balance = balance - LRVal[i] + mps_data[i]
          if (balance < valueSliderSS) {
            projected_balance.push(valueSliderSS)
            balance = valueSliderSS
          } else {
            projected_balance.push(balance)
          }

        }
        for (let i = 4; i < 14; i++) {
          balance = balance - LRVal[i]
          if (balance < valueSliderSS) {
            projected_balance.push(valueSliderSS)
            mps_data.push(valueSliderSS - balance)
            balance = valueSliderSS
          } else {
            projected_balance.push(balance)
            mps_data.push(0)
          }
        }

      }
    }

    if (strategyName === 'Level Strategy') {
      if (freezeToggle === 'Unfrozen') {
        var level_total = 0
        projected_balance = []
        mps_data = []
        atp_discrete1 = []
        atp_discrete2 = []
        atp_cumulative = []

        for (let i = 0; i < LRVal.length; i++) {
          level_total += LRVal[i]
          level_total += valueSliderSS
        }
        var level_avg = Math.round(level_total / 14)
        balance = valueSlider
        for (let j = 0; j < LRVal.length; j++) {
          balance = balance + (level_avg - LRVal[j])
          projected_balance.push(balance)
          mps_data.push(level_avg)
        }
      } else {
        level_total = 0
        projected_balance = []
        mps_data = []
        atp_discrete1 = []
        atp_discrete2 = []
        atp_cumulative = []
        mps_data.push(mpsOne)
        mps_data.push(mpsTwo)
        mps_data.push(mpsThree)
        mps_data.push(mpsFour)
        for (let i = 0; i < LRVal.length; i++) {
          level_total += LRVal[i]
          level_total += valueSliderSS
        }
        level_avg = Math.round(level_total / 14)
        balance = valueSlider
        for (let j = 0; j < LRVal.length; j++) {
          balance = balance + (level_avg - LRVal[j])
          projected_balance.push(balance)
          mps_data.push(level_avg)
        }
      }
    }

    //Calculate projected balance and ATP
    if (strategyName === 'Lot Size Strategy') {
      if (freezeToggle === 'Unfrozen') {
        mps_data = []
        projected_balance = []
        atp_discrete1 = []
        atp_discrete2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        atp_cumulative = []

        //Calculate MPS and projected balance data values
        balance = valueSlider
        for (let i = 0; i < 14; i++) {
          balance = balance - Math.max(LRVal[i], delivery_data[i])
          if (balance < valueSliderSS) {
            projected_balance.push(balance + valueSliderLS)
            mps_data.push(valueSliderLS)
            balance = balance + valueSliderLS
          } else {
            projected_balance.push(balance)
            mps_data.push(0)
          }
        }
        //Calculate sum of orders until next MPS
        mps_tracker = []
        ordersum_holding = 0
        for (let i = 0; i < 14; i++) {
          ordersum_holding = delivery_data[i]
          for (let j = (i + 1); j < 14; j++) {
            //If there is an MPS in period j, break for loop
            if (mps_data[j] !== 0) {
              break;
              //Otherwise, add period j's actual orders to the holding var
            } else {
              ordersum_holding += delivery_data[j]
            }
          }
          mps_tracker.push(ordersum_holding)
          ordersum_holding = 0
        }
        console.log('mps_tracker:', mps_tracker)

        //Calculate ATP (discrete) data values
        balance = valueSlider
        for (let i = 0; i < 14; i++) {
          if (i === 0) {
            atp_discrete1.push(balance + mps_data[i] - mps_tracker[i])
          } else {
            if (mps_data[i] === 0) {
              atp_discrete1.push(0)
            } else {
              atp_discrete1.push(mps_data[i] - mps_tracker[i])
            }
          }
        }
        console.log('atp_discrete1', atp_discrete1)

        //Calculate new ATP (discrete) values to ensure overflow to earlier periods works properly
        atp_discrete2_holding = 0
        atp_discrete_transition = 0
        for (let i = 13; i >= 0; i--) {
          atp_discrete_transition = atp_discrete1[i] + atp_discrete2_holding
          //First check: Does ATP change in this period?
          if (atp_discrete1[i] === 0) {
            atp_discrete2[i] = 0
          } else {
            //Second check: Is ATP negative in this period?
            if (atp_discrete_transition < 0) {
              atp_discrete2_holding += atp_discrete1[i]
              atp_discrete2[i] = 0
              //If not, do nothing
            } else {
              atp_discrete2[i] = atp_discrete_transition
              atp_discrete2_holding = 0
            }
          }
          console.log(atp_discrete2_holding)
        }
        console.log('atp_discrete2', atp_discrete2)
        //Calculate ATP (cumulative) data values
        balance = valueSlider
        atp_holding = 0
        for (let i = 0; i < 14; i++) {
          if (i === 0) {
            atp_holding = atp_discrete2[i]
            atp_cumulative.push(atp_discrete2[i])
          } else {
            if (mps_data[i] === 0) {
              atp_cumulative.push(0)
            } else {
              atp_cumulative.push(atp_holding + atp_discrete2[i])
              atp_holding += atp_discrete2[i]
            }
          }
        }

      } else {
        mps_data = []
        projected_balance = []
        atp_discrete1 = []
        atp_discrete2 = []
        atp_cumulative = []
        mps_data.push(mpsOne)
        mps_data.push(mpsTwo)
        mps_data.push(mpsThree)
        mps_data.push(mpsFour)

        //Calculate MPS and projected balance data values
        balance = valueSlider
        for (let i = 0; i < 4; i++) {
          balance = balance - Math.max(LRVal[i], delivery_data[i]) + mps_data[i]
          projected_balance.push(balance)
        }
        for (let i = 4; i < 14; i++) {
          balance = balance - Math.max(LRVal[i], delivery_data[i])
          if (balance < valueSliderSS) {
            projected_balance.push(balance + valueSliderLS)
            mps_data.push(valueSliderLS)
            balance = balance + valueSliderLS
          } else {
            projected_balance.push(balance)
            mps_data.push(0)
          }
        }

        //Calculate sum of orders until next MPS
        mps_tracker = []
        ordersum_holding = 0
        for (let i = 0; i < 14; i++) {
          ordersum_holding = delivery_data[i]
          for (let j = (i + 1); j < 14; j++) {
            //If there is an MPS in period j, break for loop
            if (mps_data[j] !== 0) {
              break;
              //Otherwise, add period j's actual orders to the holding var
            } else {
              ordersum_holding += delivery_data[j]
            }
          }
          mps_tracker.push(ordersum_holding)
          ordersum_holding = 0
        }
        console.log('mps_tracker:', mps_tracker)

        //Calculate ATP(cumulative) data values
        balance = valueSlider
        atp_holding = 0
        for (let k = 0; k < 14; k++) {
          if (k === 0) {
            atp_holding = balance + mps_data[k] - mps_tracker[k]
            atp_cumulative.push(balance + mps_data[k] - mps_tracker[k])
            balance = balance + valueSliderLS
          } else {
            if (mps_data[k] === 0) {
              atp_cumulative.push(0)
            } else {
              atp_cumulative.push(atp_holding + mps_data[k] - mps_tracker[k])
              atp_holding = atp_holding + mps_data[k] - mps_tracker[k]
              balance = balance + valueSliderLS
            }
          }
        }
        //Calculate ATP (discrete) data values
        balance = valueSlider
        for (let k = 0; k < 14; k++) {
          if (k === 0) {
            atp_discrete1.push(balance + mps_data[k] - mps_tracker[k])
            balance = balance + valueSliderLS
          } else {
            if (mps_data[k] === 0) {
              atp_discrete1.push(0)
            } else {
              atp_discrete1.push(mps_data[k] - mps_tracker[k])
            }
          }
        }
      }
    }
  }

  useEffect(() => {
    if (mps_data !== null && myCondition) {
      setMPSdata(mps_data)
      setMyCondition(false)

      setMpsOne(mps_data[0])
      setMpsTwo(mps_data[1])
      setMpsThree(mps_data[2])
      setMpsFour(mps_data[3])
    }
  }, [mps_data, setMPSdata, myCondition, dataAPI, MPSdata, mpsOne, mpsTwo, mpsThree, mpsFour])

  //Logic for testing orders
  const [ifFalse, setIfFalse] = React.useState(true)
  useEffect(() => {
    if (testOrder !== 0) {
      setIfFalse(false);
    }
    else {
      setIfFalse(true);
    }
  }, [testOrder])


  const optionsStrat = ['Lot Size Strategy', 'Chase Strategy', 'Level Strategy'];
  const optionsFreeze = ['Unfrozen', 'Frozen (4 weeks)'];

  // HTML for page layout
  return (
    //Show 9-month historical data at top of page
    <div className="mps">
      {loading ?
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <div className='loader' />
        </Box>
        :
        <div>
          <Box
            sx={{
              mt: 3,
              mx: 2,
              height: '100%',
              width: '83vw',
              overflowX: "hidden",
              //overflowY: 'scroll',
              borderRadius: '10px',
            }}
          >
            <div className='featured'>
              <div className='featuredItem3'>
                <div className={classes.sticky2}>
                  <span style={{ fontSize: 20, paddingLeft: 20, paddingTop: 20 }}>
                    9-Month Weekly Historical Data
                  </span>
                </div>
                <Table sx={{ width: "100%" }} aria-label="simple table" style={{ tableLayout: "fixed" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.sticky}><b>Date</b></TableCell>
                      {keys.map((item, index) => {
                        return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell className={classes.sticky}><b>Actual Demand</b></TableCell>
                      {values.map((item, index) => {
                        return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                      })}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>


            <div className='featured'>
              <div className='featuredItem3'>
                <div className={classes.sticky}>
                  {/*Selecting MPS strategy*/}
                  <Autocomplete
                    value={strategyName}
                    onChange={(event, newValue) => {
                      setStrategyName(newValue);
                      setMyCondition(true)
                    }}
                    id="controllable-states-demo"
                    options={optionsStrat}
                    disableClearable
                    sx={{ width: 250, m: '10px', ml: '20px' }}
                    renderInput={(params) => <TextField {...params} label="MPS Strategy" />}
                  />
                  {/*End of selecting MPS strategy*/}

                  {/*Toggling MPS freeze*/}
                  <Autocomplete
                    value={freezeToggle}
                    onChange={(event, newValue) => {
                      setFreezeToggle(newValue);
                      setMyCondition(true)
                    }}
                    id="controllable-states-demo"
                    options={optionsFreeze}
                    disableClearable
                    sx={{ width: 250, m: '10px', ml: '20px' }}
                    renderInput={(params) => <TextField {...params} label="MPS Freeze" />}
                  />
                  {/*End of toggling MPS freeze*/}
                  <span style={{ fontSize: 20, paddingLeft: 20, paddingTop: 20 }}>3-Month Weekly Forecast</span>
                </div>


                <div>
                  <Table sx={{ width: "100%" }} aria-label="simple table" style={{ tableLayout: "fixed" }}>
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.sticky}>
                          <b>Date</b>
                        </TableCell>
                        {removedDateList.map((item, index) => {
                          return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                        })}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell className={classes.sticky}>
                          <b>Forecasted Demand</b>
                        </TableCell>
                        {LRVal.map((item, index) => {
                          return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                        })}
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.sticky}>
                          <b>Actual Orders</b>
                        </TableCell>
                        {delivery_data.map((item, index) => {
                          return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                        })}
                      </TableRow>
                      <TableRow>
                        {(() => {
                          if (strategyName === 'Lot Size Strategy') {
                            return (
                              <TableCell className={classes.sticky}>
                                <b>Projected Balance</b>
                                <i> Initial on-hand: {valueSlider}</i>
                              </TableCell>
                            )
                          } else {
                            return (
                              <TableCell className={classes.sticky}>
                                <b>Projected Balance</b>
                                <i> Initial on-hand: {valueSlider}</i>
                              </TableCell>
                            )
                          }
                        })()}
                        {projected_balance.map((item, index) => {
                          return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                        })}
                      </TableRow>
                      <TableRow>
                        {(() => {
                          if (strategyName === 'Lot Size Strategy') {
                            return (
                              <TableCell className={classes.sticky}>
                                <b>Available to Promise (Cumulative)</b>
                              </TableCell>
                            )
                          } else {
                            return (null)
                          }
                        })()}
                        {atp_cumulative.map((item, index) => {
                          return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                        })}
                      </TableRow>
                      <TableRow>
                        {(() => {
                          if (strategyName === 'Lot Size Strategy') {
                            return (
                              <TableCell className={classes.sticky}>
                                <b>Available to Promise (Discrete)</b>
                              </TableCell>
                            )
                          } else {
                            return (null)
                          }
                        })()}
                        {atp_discrete2.map((item, index) => {
                          return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                        })}
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.sticky}>
                          <b>Master Production Schedule</b>
                        </TableCell>
                        {mps_data.map((item, index) => {
                          return <TableCell className={classes.cellStyles} key={index}><b>{item}</b></TableCell>
                        })}
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </Box>


          {(() => {

            //Set slider bars at bottom of page
            if (strategyName === 'Chase Strategy') {
              return (
                <div className='featured'>
                  <div className='featuredItemNoShadow'>
                    <div className='featuredTitle'>
                      Initial On-Hand Balance:
                      <div className='featuredItemNoShadow'>
                        <TextField
                          required
                          id="outlined-required"
                          value={valueSlider}
                          onChange={(event) => { changeValueSlider(event.target.value) }}
                        />
                      </div>
                    </div>
                  </div>
                  {/*New addition for safety stock*/}
                  <div className='featuredItemNoShadow'>
                    <div className='featuredTitle'>
                      Safety Stock: <b>{valueSliderSS}</b>
                      <div className='featuredItemNoShadow'>
                        <TextField
                          required
                          id="outlined-required"
                          value={valueSliderSS}
                          onChange={(event) => { changeValueSliderSS(event.target.value) }}
                        />
                      </div>
                    </div>
                  </div>
                  {/*End of new addition for safety stock*/}
                </div>

              )
            } else if (strategyName === 'Level Strategy') {
              return (
                <div className='featured'>
                  <div className='featuredItemNoShadow'>
                    <div className='featuredTitle'>
                      Initial On-Hand Balance: <b>{valueSlider}</b>
                      <div className='featuredItemNoShadow'>
                        <TextField
                          required
                          id="outlined-required"
                          value={valueSlider}
                          onChange={(event) => { changeValueSlider(event.target.value) }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='featuredItemNoShadow'>
                    <div className='featuredTitle'>
                      Safety Stock: <b>{valueSliderSS}</b>
                      <div className='featuredItemNoShadow'>
                        <TextField
                          required
                          id="outlined-required"
                          value={valueSliderSS}
                          onChange={(event) => { changeValueSliderSS(event.target.value) }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            } else if (strategyName === 'Lot Size Strategy') {
              return (
                <div className='featured'>
                  <div className='featuredItemNoShadow'>
                    <div className='featuredTitle'>
                      Initial On-hand Balance:
                      <div className='featuredItemNoShadow'>
                        <TextField
                          required
                          id="outlined-required"
                          value={valueSlider}
                          onChange={(event) => { changeValueSlider(event.target.value) }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='featuredItemNoShadow'>
                    <div className='featuredTitle'>
                      Desired Lot Size:
                      <div className='featuredItemNoShadow'>
                        <TextField
                          required
                          id="outlined-required"
                          value={valueSliderLS}
                          onChange={(event) => { changeValueSliderLS(event.target.value) }}
                        />
                      </div>
                    </div>
                  </div>
                  {/*New addition for safety stock*/}
                  <div className='featuredItemNoShadow'>
                    <div className='featuredTitle'>
                      Safety Stock:
                      <div className='featuredItemNoShadow'>
                        <TextField
                          required
                          id="outlined-required"
                          value={valueSliderSS}
                          onChange={(event) => { changeValueSliderSS(event.target.value) }}
                        />
                      </div>
                    </div>
                  </div>
                  {/*End of new addition for safety stock*/}
                </div>
              )
            }
          })()}
        </div>}

      <div className='featured'>
        <div className='featuredItemNoShadow'>
          <div className='featuredTitle'>
            Test Order:
            <div className='featuredItemNoShadow'>
              <TextField
                required
                id="outlined-required"
                value={testOrder}
                onChange={(event) => { changeTestOrder(event.target.value) }}
              />
            </div>
          </div>
        </div>

        <div className='featuredItemNoShadow'>
          <div className='featuredTitle'>
            Test Period:
            <div className='featuredItemNoShadow'>
              <TextField
                required
                id="outlined-required"
                value={testPeriod}
                onChange={(event) => { changeTestPeriod(event.target.value) }}
              />
            </div>
          </div>
        </div>
        <div className='featuredItemNoShadow'>
          <div className='featuredItemNoShadow'>
            <Button variant="outlined" disabled={ifFalse} onClick={handleTestOrder}>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  )
}