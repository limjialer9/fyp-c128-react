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
  const [mpsOne, setMpsOne] = useState(0)
  const [mpsTwo, setMpsTwo] = useState(0)
  const [mpsThree, setMpsThree] = useState(0)
  const [mpsFour, setMpsFour] = useState(0)

  var mps_data = null
  var mps_data_test = null
  var delivery_data = []
  var delivery_data_test = []
  var projected_balance = null
  var projected_balance_test = null
  var atp_cumulative = null
  var atp_cumulative_test = null
  var atp_discrete1 = null
  var atp_discrete2 = null
  var atp_discrete1_test = null
  var atp_discrete2_test = null
  var atp_holding = 0
  var mps_tracker = []
  var mps_tracker_test = []
  var ordersum_holding = 0
  var atp_discrete2_holding = 0
  var atp_discrete_transition = 0

  var delivery_dates_initial = null
  var delivery_data_initial = null

  const [valueSlider, setValueSlider] = useState(500);
  const changeValueSlider = (value) => {
    setValueSlider(value);
    setMyCondition(true);
  };
  const [valueSliderLS, setValueSliderLS] = useState(500);
  const changeValueSliderLS = (value) => {
    setValueSliderLS(value);
    setMyCondition(true)
  };
  const [valueSliderSS, setValueSliderSS] = useState(100);
  const changeValueSliderSS = (value) => {
    setValueSliderSS(value);
    setMyCondition(true)
  };
  const [testOrder, setTestOrder] = useState(0);
  const [testPeriod, setTestPeriod] = useState(1);

  const [myCondition, setMyCondition] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(false);
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

  //For testing orders
  //Test if MPS changed/ATP is negative, return accordingly
  function testOrderFunc() {
    mps_data_test = []
    projected_balance_test = []
    atp_discrete1_test = []
    atp_discrete2_test = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    atp_cumulative_test = []

    //Calculate MPS and projected balance data values
    balance = Number(valueSlider)
    for (let i = 0; i < 14; i++) {
      balance = balance - Math.max(LRVal[i], delivery_data[i])
      if (balance < Number(valueSliderSS)) {
        projected_balance_test.push(balance + Number(valueSliderLS))
        mps_data_test.push(Number(valueSliderLS))
        balance = balance + Number(valueSliderLS)
      } else {
        projected_balance_test.push(balance)
        mps_data_test.push(0)
      }
    }

    //Add test order into delivery_data
    delivery_data_test = delivery_data
    console.log('testOrder:', testOrder)
    console.log('testPeriod:', testPeriod)
    delivery_data_test[testPeriod - 1] = delivery_data_test[testPeriod - 1] + Number(testOrder)

    //Calculate sum of orders until next MPS
    mps_tracker_test = []
    ordersum_holding = 0
    for (let i = 0; i < 14; i++) {
      ordersum_holding = delivery_data_test[i]
      for (let j = (i + 1); j < 14; j++) {
        //If there is an MPS in period j, break for loop
        if (mps_data_test[j] !== 0) {
          break;
          //Otherwise, add period j's actual orders to the holding var
        } else {
          ordersum_holding += delivery_data_test[j]
        }
      }
      mps_tracker_test.push(ordersum_holding)
      ordersum_holding = 0
    }
    console.log('delivery_data_test:', delivery_data_test)
    console.log('mps_tracker_test:', mps_tracker_test)

    //Calculate ATP (discrete) data values
    balance = Number(valueSlider)
    for (let i = 0; i < 14; i++) {
      if (i === 0) {
        atp_discrete1_test.push(balance + mps_data_test[i] - mps_tracker_test[i])
      } else {
        if (mps_data_test[i] === 0) {
          atp_discrete1_test.push(0)
        } else {
          atp_discrete1_test.push(mps_data_test[i] - mps_tracker_test[i])
        }
      }
    }
    console.log('atp_discrete1_test', atp_discrete1_test)

    //Calculate new ATP (discrete) values to ensure overflow to earlier periods works properly
    atp_discrete2_holding = 0
    atp_discrete_transition = 0
    for (let i = 13; i >= 0; i--) {
      //Transition var is initial value + current holding var
      atp_discrete_transition = atp_discrete1_test[i] + atp_discrete2_holding
      //First check: Is this the first period?
      if (i === 0) {
        atp_discrete2_test[i] = atp_discrete_transition
        //Second check: Does ATP change in this period?
      } else if (atp_discrete1_test[i] === 0) {
        atp_discrete2_test[i] = 0
        //Third check: Is (ATP + holding) negative in this period? If yes, assign ATP value to holding var and set current ATP to 0
      } else if (atp_discrete_transition < 0) {
        atp_discrete2_holding += atp_discrete1_test[i]
        atp_discrete2_test[i] = 0
        //If not, do nothing
      } else {
        atp_discrete2_test[i] = atp_discrete_transition
        atp_discrete2_holding = 0
      }
    }

    console.log('atp_discrete2_test', atp_discrete2_test)
    //Calculate ATP (cumulative) data values
    balance = valueSlider
    atp_holding = 0
    for (let i = 0; i < 14; i++) {
      if (i === 0) {
        atp_holding = atp_discrete2_test[i]
        atp_cumulative_test.push(atp_discrete2_test[i])
      } else {
        if (mps_data_test[i] === 0) {
          atp_cumulative_test.push(0)
        } else {
          atp_cumulative_test.push(atp_holding + atp_discrete2_test[i])
          atp_holding += atp_discrete2_test[i]
        }
      }
    }
    if ((mps_data_test[0] !== mpsOne) ||
      (mps_data_test[1] !== mpsTwo) ||
      (mps_data_test[2] !== mpsThree) ||
      (mps_data_test[3] !== mpsFour) ||
      (atp_cumulative_test[0] < 0)) {
      console.log('test failed')
      return (0)

    } else {
      console.log('test passed')
      return (1)
    }
  }
  //Control the pop-up text when button pressed according to testOrderFunc result
  const togglePopup = (selector) => {
    if (strategyName !== 'Lot Size Strategy') {
      setContent(<>
        Order testing is only available for Lot Size Strategy
      </>
      )
    } else if (selector === 0) {
      setContent(<>
        denied
      </>
      )
    } else if (selector === 1) {
      setContent(<>
        approved
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

  //End of code for testing order

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
          level_total += Number(valueSliderSS)
        }
        var level_avg = Math.round(level_total / 14)
        balance = Number(valueSlider)
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
          level_total += Number(valueSliderSS)
        }
        level_avg = Math.round(level_total / 14)
        balance = Number(valueSlider)
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

        //Fixing shit

        //Calculate MPS and projected balance data values
        balance = Number(valueSlider)
        for (let i = 0; i < 14; i++) {
          balance = balance - Math.max(LRVal[i], delivery_data[i])
          if (balance < Number(valueSliderSS)) {
            projected_balance.push(balance + Number(valueSliderLS))
            mps_data.push(Number(valueSliderLS))
            balance = balance + Number(valueSliderLS)
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
        balance = Number(valueSlider)
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
          //Transition var is initial value + current holding var
          atp_discrete_transition = atp_discrete1[i] + atp_discrete2_holding
          //First check: Is this the first period?
          if (i === 0) {
            atp_discrete2[i] = atp_discrete_transition
            //Second check: Does ATP change in this period?
          } else if (atp_discrete1[i] === 0) {
            atp_discrete2[i] = 0
            //Third check: Is (ATP + holding) negative in this period? If yes, assign ATP value to holding var and set current ATP to 0
          } else if (atp_discrete_transition < 0) {
            atp_discrete2_holding += atp_discrete1[i]
            atp_discrete2[i] = 0
            //If not, do nothing
          } else {
            atp_discrete2[i] = atp_discrete_transition
            atp_discrete2_holding = 0
          }
        }
        console.log('atp_discrete2', atp_discrete2)

        //Calculate ATP (cumulative) data values
        balance = Number(valueSlider)
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
        balance = Number(valueSlider)
        for (let i = 0; i < 4; i++) {
          balance = balance - Math.max(LRVal[i], delivery_data[i]) + mps_data[i]
          projected_balance.push(balance)
        }
        for (let i = 4; i < 14; i++) {
          balance = balance - Math.max(LRVal[i], delivery_data[i])
          if (balance < Number(valueSliderSS)) {
            projected_balance.push(balance + Number(valueSliderLS))
            mps_data.push(Number(valueSliderLS))
            balance = balance + Number(valueSliderLS)
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
        balance = Number(valueSlider)
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
          //Transition var is initial value + current holding var
          atp_discrete_transition = atp_discrete1[i] + atp_discrete2_holding
          //First check: Is this the first period?
          if (i === 0) {
            atp_discrete2[i] = atp_discrete_transition
            //Second check: Does ATP change in this period?
          } else if (atp_discrete1[i] === 0) {
            atp_discrete2[i] = 0
            //Third check: Is (ATP + holding) negative in this period? If yes, assign ATP value to holding var and set current ATP to 0
          } else if (atp_discrete_transition < 0) {
            atp_discrete2_holding += atp_discrete1[i]
            atp_discrete2[i] = 0
            //If not, do nothing
          } else {
            atp_discrete2[i] = atp_discrete_transition
            atp_discrete2_holding = 0
          }
        }
        console.log('atp_discrete2', atp_discrete2)
        //Calculate ATP (cumulative) data values
        balance = Number(valueSlider)
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
            Test Order Qty:
            <div className='featuredItemNoShadow'>
              <TextField
                required
                id="outlined-required"
                value={testOrder}
                onChange={(event) => { setTestOrder(event.target.value) }}
              />
            </div>
          </div>
        </div>
        <div className='featuredItemNoShadow'>
          <div className='featuredTitle'>
            Test Period (1 - 14):
            <div className='featuredItemNoShadow'>
              <TextField
                required
                id="outlined-required"
                value={testPeriod}
                onChange={(event) => { setTestPeriod(event.target.value) }}
              />
            </div>
          </div>
        </div>
        <div className='featuredItemNoShadow'>
          <div className='featuredItemNoShadow'>
            <Button sx={buttonStyle} onClick={() => { togglePopup(testOrderFunc()) }}>
              Submit Test Order
            </Button>
            {isOpen && <Popup
              content={content}
              handleClose={togglePopup}
            />}
          </div>
        </div>
      </div>
    </div>
  )
}