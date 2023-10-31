import React, { useEffect } from 'react'
import './Masterproductionscheduling.css'
import { useState } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Slider from '@mui/material/Slider';
import 'trendline'
import { Box } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { makeStyles } from "@material-ui/core/styles";
import { useContext } from 'react';
import { UserContext } from '../../UserContext';

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

export default function Masterproductionscheduling() {
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
  const [strategyName, setStrategyName] = useState('Chase Strategy')
  var mps_data = null
  var projected_balance = null
  const [valueSlider, setValueSlider] = useState(0);
  const changeValueSlider = (event, value) => {
    setValueSlider(value);
    setMyCondition(true);
  };
  const [valueSliderLS, setValueSliderLS] = useState(500);
  const changeValueSliderLS = (event, value) => {
    setValueSliderLS(value);
    setMyCondition(true)
  };
  const [myCondition, setMyCondition] = useState(true);
  if (dataAPI !== null) {
    //Retrieving weekly-order database from DynamoDB
    var keys = Object.keys(dataAPI)
    var values = Object.values(dataAPI)
    var LRVal = [overridevalue1, overridevalue2, overridevalue3, overridevalue4, overridevalue5, overridevalue6, overridevalue7, overridevalue8, overridevalue9, overridevalue10, overridevalue11, overridevalue12, overridevalue13, overridevalue14]
    console.log(LRVal)
    if (strategyName === 'Chase Strategy') {
      mps_data = [
        LRVal[0] + valueSlider,
      ]
      projected_balance = [valueSlider]
      for (let i = 1; i < LRVal.length; i++) {
        mps_data.push(LRVal[i])
        projected_balance.push(valueSlider)
      }
    }
    if (strategyName === 'Level Strategy') {
      var total = 0
      projected_balance = []
      mps_data = []
      for (let i = 0; i < LRVal.length; i++) {
        total += LRVal[i]
      }
      var avg = Math.round(total / 14)
      var balance = 0
      for (let j = 0; j < LRVal.length; j++) {
        balance = balance + (avg - LRVal[j])
        //console.log(balance)
        projected_balance.push(balance)
        mps_data.push(avg)
      }
    }
    if (strategyName === 'Lot Size Strategy') {
      mps_data = []
      projected_balance = []
      balance = valueSlider
      for (let i = 0; i < 14; i++) {
        balance = balance - LRVal[i]
        if (balance < 0) {
          projected_balance.push(balance + valueSliderLS)
          mps_data.push(valueSliderLS)
          balance = balance + valueSliderLS
        } else {
          projected_balance.push(balance)
          mps_data.push(0)
        }
      }
    }
    console.log(mps_data)
    console.log(projected_balance)
  }
  useEffect(() => {
    if (mps_data !== null && myCondition) {
      setMPSdata(mps_data)
      console.log('MPSData :', MPSdata)
      setMyCondition(false)
    }
  }, [mps_data, setMPSdata, myCondition, dataAPI, MPSdata])

  const removedDateList = dateList.slice(1);
  const optionsStrat = ['Chase Strategy', 'Level Strategy', 'Lot Size Strategy'];

  // HTML for page layout
  return (
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
                  <span style={{ fontSize: 20, paddingLeft: 20, paddingTop: 20 }}>9-Month Weekly Historical Data</span>
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
                  <span style={{ fontSize: 20, paddingLeft: 20, paddingTop: 20 }}>3-Month Weekly Forecast</span>
                </div>
                <div>
                  <Table sx={{ width: "100%" }} aria-label="simple table" style={{ tableLayout: "fixed" }}>
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.sticky}><b>Date</b></TableCell>
                        {removedDateList.map((item, index) => {
                          return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                        })}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell className={classes.sticky}><b>Forecasted Demand</b></TableCell>
                        {LRVal.map((item, index) => {
                          return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                        })}
                      </TableRow>
                      <TableRow>
                        {(() => {
                          if (strategyName === 'Lot Size Strategy') {
                            return (
                              <TableCell className={classes.sticky}><b>Projected Balance</b> <i>{valueSlider} Initial on-hand</i></TableCell>
                            )
                          } else {
                            return (
                              <TableCell className={classes.sticky}><b>Projected Balance</b></TableCell>
                            )
                          }
                        })()}
                        {projected_balance.map((item, index) => {
                          return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                        })}
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.sticky}><b>Master Production Schedule</b></TableCell>
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
            if (strategyName === 'Chase Strategy') {
              return (
                <div className='featured'>
                  <div className='featuredItemNoShadow'>
                    <div className='featuredTitle'>
                      Desired On-Hand Balance: <b>{valueSlider}</b>
                      <div className='featuredItemNoShadow'>
                        <Slider
                          size="small"
                          defaultValue={20}
                          step={5}
                          aria-label="Small"
                          valueLabelDisplay="auto"
                          color="secondary"
                          max={1000}
                          value={valueSlider}
                          onChange={changeValueSlider}
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
                      Initial On-Hand Balance: <b>{valueSlider}</b>
                      <div className='featuredItemNoShadow'>
                        <Slider
                          size="small"
                          defaultValue={20}
                          step={5}
                          aria-label="Small"
                          valueLabelDisplay="auto"
                          color="secondary"
                          max={1000}
                          value={valueSlider}
                          onChange={changeValueSlider}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='featuredItemNoShadow'>
                    <div className='featuredTitle'>
                      Desired Lot Size: <b>{valueSliderLS}</b>
                      <div className='featuredItemNoShadow'>
                        <Slider
                          size="small"
                          defaultValue={500}
                          step={10}
                          aria-label="Small"
                          valueLabelDisplay="auto"
                          color="secondary"
                          max={1000}
                          value={valueSliderLS}
                          onChange={changeValueSliderLS}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          })()}
        </div>}
    </div>
  )
}