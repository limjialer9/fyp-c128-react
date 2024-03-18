import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useState } from "react"
import './mrp.css'
import { Tree, TreeNode } from 'react-organizational-chart';
import styled from 'styled-components';
import { UserContext } from '../../UserContext';
import { useContext } from 'react';
import { Box } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";
import Switch from '@mui/material/Switch';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const useStyles = makeStyles({
    sticky: {
        left: 0,
        width: 320,
        background: 'white'
    },
    sticky2: {
        left: 0,
        width: 350,
        background: 'white'
    },
    sticky3: {
        top: 0,
        background: 'white'
    },
    cellStyles: {
        width: 80
    }
});

//Looks like a function to update planned receipts and order releases according to demand
//Check if this works as intended
function individualComponentMRP(onhand, demandList, lotsize, safetystock, orderList, leadtime, balanceList, multiplier, plannedReceipts) {
    //demandList is Gross requirement
    //orderList is Scheduled receipts / Planned Order Releases
    //plannedReceipts is Actual receipt of parts after leadtime. Just for QoL
    var balance = onhand
    //demandList is demandInWeeks for Level 0,
    //but is planned order releases of prior level for Level 1 and 2

    //OK fuck this assclown has linked ScheduledReceipts to Planned Order Releases
    //ScheduledReceipts is also linked to Scheduled Receipts, but does not show
    //PlannedReceipts links to Planned Receipts. Does he mean Planned Order Releases?

    for (let i = 0; i < demandList.length; i++) {
        balance = balance - (multiplier * demandList[i])
        if ((balance < 0 || balance < safetystock) && (i - leadtime >= 0)) {
            balance += Number(lotsize)
            plannedReceipts[i] = Number(lotsize)
            orderList[i - leadtime] = Number(lotsize)
        }
        balanceList[i] = Number(balance)
    }

}

export default function Mrp() {
    const [buttonValue, setValue] = useState('Individual MRP');
    const { dataAPI, loading } = useContext(UserContext)

    const [PvbLot, setPvbLot] = useState(1200)
    const [PvbSS, setPvbSS] = useState(1000)
    const [PvbOnHand, setPvbOnHand] = useState(1000)

    //Poppet Assembly
    const [PoppetLot, setPoppetLot] = useState(1500)
    const [PoppetSS, setPoppetSS] = useState(1000)
    const [PoppetOnHand, setPoppetOnHand] = useState(3000)
    const [PoppetState, setPoppetState] = useState(false);

    const [PoppetNutLot, setPoppetNutLot] = useState(3000)
    const [PoppetNutSS, setPoppetNutSS] = useState(900)
    const [PoppetNutOnHand, setPoppetNutOnHand] = useState(3500)

    const [PoppetWasherLot, setPoppetWasherLot] = useState(2000)
    const [PoppetWasherSS, setPoppetWasherSS] = useState(1200)
    const [PoppetWasherOnHand, setPoppetWasherOnHand] = useState(2000)

    const [PoppetDiscLot, setPoppetDiscLot] = useState(5000)
    const [PoppetDiscSS, setPoppetDiscSS] = useState(1500)
    const [PoppetDiscOnHand, setPoppetDiscOnHand] = useState(2500)

    const [PoppetPartLot, setPoppetPartLot] = useState(4500)
    const [PoppetPartSS, setPoppetPartSS] = useState(2000)
    const [PoppetPartOnHand, setPoppetPartOnHand] = useState(1500)
    //End Poppet Assembly

    //Spider Assembly
    const [SpiderLot, setSpiderLot] = useState(1500)
    const [SpiderSS, setSpiderSS] = useState(1000)
    const [SpiderOnHand, setSpiderOnHand] = useState(3000)
    const [SpiderState, setSpiderState] = useState(false);

    const [SpiderBoltLot, setSpiderBoltLot] = useState(3000)
    const [SpiderBoltSS, setSpiderBoltSS] = useState(900)
    const [SpiderBoltOnHand, setSpiderBoltOnHand] = useState(5000)

    const [SpiderDiscLot, setSpiderDiscLot] = useState(5000)
    const [SpiderDiscSS, setSpiderDiscSS] = useState(1500)
    const [SpiderDiscOnHand, setSpiderDiscOnHand] = useState(2500)

    const [SpiderPartLot, setSpiderPartLot] = useState(2000)
    const [SpiderPartSS, setSpiderPartSS] = useState(1200)
    const [SpiderPartOnHand, setSpiderPartOnHand] = useState(2000)

    const [SpiderNutLot, setSpiderNutLot] = useState(4500)
    const [SpiderNutSS, setSpiderNutSS] = useState(2000)
    const [SpiderNutOnHand, setSpiderNutOnHand] = useState(1500)
    //End Spider Assembly

    const [BoltLot, setBoltLot] = useState(4000)
    const [BoltSS, setBoltSS] = useState(3000)
    const [BoltOnHand, setBoltOnHand] = useState(10000)

    const [CanopyLot, setCanopyLot] = useState(1200)
    const [CanopySS, setCanopySS] = useState(1000)
    const [CanopyOnHand, setCanopyOnHand] = useState(2000)

    const [BonnetLot, setBonnetLot] = useState(1200)
    const [BonnetSS, setBonnetSS] = useState(1000)
    const [BonnetOnHand, setBonnetOnHand] = useState(2000)

    const [PlasticWasherLot, setPlasticWasherLot] = useState(1200)
    const [PlasticWasherSS, setPlasticWasherSS] = useState(1000)
    const [PlasticWasherOnHand, setPlasticWasherOnHand] = useState(2000)

    const [ORingLot, setORingLot] = useState(1200)
    const [ORingSS, setORingSS] = useState(1000)
    const [ORingOnHand, setORingOnHand] = useState(2000)

    const [SpringLot, setSpringLot] = useState(1200)
    const [SpringSS, setSpringSS] = useState(1000)
    const [SpringOnHand, setSpringOnHand] = useState(2000)

    const [TestCockLot, setTestCockLot] = useState(1200)
    const [TestCockSS, setTestCockSS] = useState(1000)
    const [TestCockOnHand, setTestCockOnHand] = useState(2000)

    const [BallValveLot, setBallValveLot] = useState(3000)
    const [BallValveSS, setBallValveSS] = useState(1800)
    const [BallValveOnHand, setBallValveOnHand] = useState(8000)

    const { dateList } = useContext(UserContext);

    const { MPSdata } = useContext(UserContext);
    console.log(MPSdata)

    const removedDateList = dateList.slice(1);

    const [period, setPeriod] = React.useState(0);
    //const [noOfParts, setNoOfParts] = React.useState(MPSdata[parseInt(period)]);
    const noOfParts = 1;
    const handleChange = (event) => {
        setPeriod(event.target.value);
        //setNoOfParts(MPSdata[event.target.value]);
    };

    if (dataAPI !== null) {
        //var LRVal = [overridevalue1,overridevalue2,overridevalue3,overridevalue4,overridevalue5,overridevalue6,overridevalue7,overridevalue8,overridevalue9,overridevalue10,overridevalue11,overridevalue12,overridevalue13,overridevalue14]
        var LRVal = MPSdata
        //var noOfParts = (overridevalue1)
        //var noOfParts = LRVal[0]
        console.log('LRVAl', LRVal)
        console.log('No. of parts', noOfParts)
    };

    const StyledNodeTitle = styled.div`
        border-radius: 5px;
        display: inline-block;
        border: 1px solid purple;
        border-width: auto;
        font-size: 12px;
        font-weight: bold;
    `;

    const StyledNode = styled.div`
        border-radius: 5px;
        display: inline-block;
        border: 1px solid purple;
        border-width: auto;
        font-size: 12px;
    `;

    const classes = useStyles();
    return (
        <div className="mrp">
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
                    {(() => {
                        if (buttonValue === 'BOM') {
                            return (
                                <Box
                                    sx={{
                                        mt: 3,
                                        mx: 2,
                                        height: '85vh',
                                        overflowX: "hidden",
                                        borderRadius: '10px',
                                        boxShadow: 3
                                    }}
                                >
                                    <div className="featured">
                                        <div className="featuredItem">
                                            <Table sx={{ minWidth: "100%", maxWidth: "100%" }} stickyHeader aria-label="sticky table">
                                                <TableHead>
                                                    <span className="featuredTitle2"><b>Bill of Material</b></span>
                                                    <Select
                                                        sx={{ width: 'auto', marginLeft: 2.5 }}
                                                        id="demo-simple-select"
                                                        value={period}
                                                        onChange={handleChange}
                                                    >
                                                        {removedDateList.map((item, index) => {
                                                            return <MenuItem value={index}>{item}</MenuItem>
                                                        })}
                                                    </Select>
                                                    <TableRow>
                                                        <TableCell align="left"><b>Part No.</b></TableCell>
                                                        <TableCell><b>Quantity Required</b></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row" style={{ width: '50%' }}>
                                                            Poppet Assembly, 721-310
                                                            <Box sx={{ ml: '50px', fontFamily: 'Arial', fontStyle: 'italic' }}>
                                                                Load Nut & Guide, 721-90<br />
                                                                Load Washer, 721-80<br />
                                                                Disc Upper, 721A-34<br />
                                                                Poppet, 721-30<br />
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell style={{ width: '50%' }}>
                                                            {noOfParts}
                                                            <Box sx={{ fontFamily: 'Arial', fontStyle: 'italic', ml: '50px' }}>
                                                                {noOfParts}<br />
                                                                {noOfParts}<br />
                                                                {noOfParts}<br />
                                                                {noOfParts}<br />
                                                            </Box>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row" style={{ width: '50%' }}>
                                                            Spider Assembly, 721-310
                                                            <Box sx={{ ml: '50px', fontFamily: 'Arial', fontStyle: 'italic' }}>
                                                                Screw, 721-11A<br />
                                                                Lower Disc, 721B-34<br />
                                                                Guide Spider, 721-31<br />
                                                                Hex Nut, 721-9A<br />
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell style={{ width: '50%' }}>
                                                            {noOfParts}
                                                            <Box sx={{ fontFamily: 'Arial', fontStyle: 'italic', ml: '50px' }}>
                                                                {noOfParts}<br />
                                                                {noOfParts}<br />
                                                                {noOfParts}<br />
                                                                {noOfParts}<br />
                                                            </Box>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row" style={{ width: '50%' }}>
                                                            Canopy Screw, 721-11
                                                        </TableCell>
                                                        <TableCell style={{ width: '50%' }}>
                                                            {noOfParts * 3}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row" style={{ width: '50%' }}>
                                                            Canopy, 721-3
                                                        </TableCell>
                                                        <TableCell style={{ width: '50%' }}>
                                                            {noOfParts}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row" style={{ width: '50%' }}>
                                                            Bonnet, 721-20
                                                        </TableCell>
                                                        <TableCell style={{ width: '50%' }}>
                                                            {noOfParts}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row" style={{ width: '50%' }}>
                                                            Plastic Washer, 721A-12
                                                        </TableCell>
                                                        <TableCell style={{ width: '50%' }}>
                                                            {noOfParts}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row" style={{ width: '50%' }}>
                                                            O-Ring, WK-138N
                                                        </TableCell>
                                                        <TableCell style={{ width: '50%' }}>
                                                            {noOfParts}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row" style={{ width: '50%' }}>
                                                            Spring, 721-33
                                                        </TableCell>
                                                        <TableCell style={{ width: '50%' }}>
                                                            {noOfParts}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row" style={{ width: '50%' }}>
                                                            Test Cock, 18-860XL
                                                        </TableCell>
                                                        <TableCell style={{ width: '50%' }}>
                                                            {noOfParts * 2}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row" style={{ width: '50%' }}>
                                                            Ball Valve 1/2" Tap, 12-850T
                                                        </TableCell>
                                                        <TableCell style={{ width: '50%' }}>
                                                            {noOfParts * 2}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row" style={{ width: '50%' }}>
                                                            Ball Valve 3/4" Tap, 34-850T
                                                        </TableCell>
                                                        <TableCell style={{ width: '50%' }}>
                                                            {noOfParts * 2}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row" style={{ width: '50%' }}>
                                                            Ball Valve 1" Tap, 1-850T
                                                        </TableCell>
                                                        <TableCell style={{ width: '50%' }}>
                                                            {noOfParts * 2}
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </div>
                                </Box>
                            )
                        } else if (buttonValue === 'PDS') {
                            return (
                                <Box
                                    sx={{
                                        mt: 3,
                                        mx: 2,
                                        height: '85vh',
                                        overflowX: "hidden",
                                        borderRadius: '10px',
                                        boxShadow: 3
                                    }}
                                >
                                    <div className='featured'>
                                        <div className="featuredItem2">
                                            <span className="featuredTitle"><b>Product Structure Diagram</b></span>
                                            <div className="TreePositioning">
                                                <Tree
                                                    lineWidth={'2px'}
                                                    lineColor={'purple'}
                                                    lineBorderRadius={'5px'}
                                                    label={<StyledNodeTitle>Pressure Vacuum Breaker 34-720A :{'\n' + noOfParts}</StyledNodeTitle>}
                                                >
                                                    <TreeNode label={<StyledNode>Canopy Screw{'\n' + 3 * noOfParts}</StyledNode>}></TreeNode>
                                                    <TreeNode label={<StyledNode>Canopy{'\n' + noOfParts}</StyledNode>}></TreeNode>
                                                    <TreeNode label={<StyledNode>Bonnet{'\n' + noOfParts}</StyledNode>}></TreeNode>
                                                    <TreeNode label={<StyledNode>Plastic Washer{'\n' + noOfParts}</StyledNode>}></TreeNode>
                                                    <TreeNode label={<StyledNode>O-Ring{'\n' + noOfParts}</StyledNode>}></TreeNode>
                                                    <TreeNode label={<StyledNode>Poppet Assembly{'\n' + noOfParts}</StyledNode>}>
                                                        <TreeNode label={<StyledNode>Load Nut & Guide{'\n' + noOfParts}</StyledNode>} />
                                                        <TreeNode label={<StyledNode>Load Washer{'\n' + noOfParts}</StyledNode>} />
                                                        <TreeNode label={<StyledNode>Disc Upper{'\n' + noOfParts}</StyledNode>} />
                                                        <TreeNode label={<StyledNode>Poppet{'\n' + noOfParts}</StyledNode>} />
                                                    </TreeNode>
                                                    <TreeNode label={<StyledNode>Spring{'\n' + noOfParts}</StyledNode>}></TreeNode>
                                                    <TreeNode label={<StyledNode>Spider Assembly{'\n' + noOfParts}</StyledNode>}>
                                                        <TreeNode label={<StyledNode>Screw{'\n' + noOfParts}</StyledNode>} />
                                                        <TreeNode label={<StyledNode>Lower Disc{'\n' + noOfParts}</StyledNode>} />
                                                        <TreeNode label={<StyledNode>Guide Spider{'\n' + noOfParts}</StyledNode>} />
                                                        <TreeNode label={<StyledNode>Hex Nut{'\n' + noOfParts}</StyledNode>} />
                                                    </TreeNode>
                                                    <TreeNode label={<StyledNode>Test Cock{'\n' + 2 * noOfParts}</StyledNode>}></TreeNode>
                                                    <TreeNode label={<StyledNode>Ball Valve 1/2" Tap{'\n' + 2 * noOfParts}</StyledNode>}></TreeNode>
                                                    <TreeNode label={<StyledNode>Ball Valve 3/4" Tap{'\n' + 2 * noOfParts}</StyledNode>}></TreeNode>
                                                    <TreeNode label={<StyledNode>Ball Valve 1" Tap{'\n' + 2 * noOfParts}</StyledNode>}></TreeNode>
                                                </Tree>
                                            </div>
                                        </div>
                                    </div>
                                </Box>
                            )


                            // Most important
                        } else if (buttonValue === 'Individual MRP') {
                            const dateInWeeks = removedDateList
                            const demandInWeeks = LRVal
                            console.log('dateInWeeks', dateInWeeks)
                            console.log('demandInWeeks', demandInWeeks)

                            //Level 0
                            const PvbLT = 1
                            const PvbMultiplier = 1
                            var PvbScheduledReceipts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            var PvbBalanceList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            var PvbPlannedReceipts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            individualComponentMRP(PvbOnHand, demandInWeeks, PvbLot, PvbSS, PvbScheduledReceipts, PvbLT, PvbBalanceList, PvbMultiplier, PvbPlannedReceipts)

                            //Level 1
                            const PoppetLT = 1
                            const PoppetMultiplier = 1
                            var PoppetScheduledReceipts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            var PoppetBalanceList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            var PoppetPlannedReceipts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            individualComponentMRP(PoppetOnHand, PvbScheduledReceipts, PoppetLot, PoppetSS, PoppetScheduledReceipts, PoppetLT, PoppetBalanceList, PoppetMultiplier, PoppetPlannedReceipts)

                            //Level 2 (Parent: Poppet Assembly)
                            const PoppetNutLT = 6
                            const PoppetNutMultiplier = 1
                            var PoppetNutScheduledReceipts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            var PoppetNutBalanceList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            var PoppetNutPlannedReceipts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            individualComponentMRP(PoppetNutOnHand, PoppetScheduledReceipts, PoppetNutLot, PoppetNutSS, PoppetNutScheduledReceipts, PoppetNutLT, PoppetNutBalanceList, PoppetNutMultiplier, PoppetNutPlannedReceipts)

                            //Level 2 (Parent: Poppet Assembly)
                            const PoppetWasherLT = 3
                            const PoppetWasherMultiplier = 1
                            var PoppetWasherScheduledReceipts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            var PoppetWasherBalanceList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            var PoppetWasherPlannedReceipts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            individualComponentMRP(PoppetWasherOnHand, PoppetScheduledReceipts, PoppetWasherLot, PoppetWasherSS, PoppetWasherScheduledReceipts, PoppetWasherLT, PoppetWasherBalanceList, PoppetWasherMultiplier, PoppetWasherPlannedReceipts)

                            //Level 2 (Parent: Poppet Assembly)
                            const PoppetDiscLT = 8
                            const PoppetDiscMultiplier = 1
                            var PoppetDiscScheduledReceipts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            var PoppetDiscBalanceList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            var PoppetDiscPlannedReceipts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            individualComponentMRP(PoppetDiscOnHand, PoppetScheduledReceipts, PoppetDiscLot, PoppetDiscSS, PoppetDiscScheduledReceipts, PoppetDiscLT, PoppetDiscBalanceList, PoppetDiscMultiplier, PoppetDiscPlannedReceipts)

                            //Level 2 (Parent: Poppet Assembly)
                            const PoppetPartLT = 8
                            const PoppetPartMultiplier = 1
                            var PoppetPartScheduledReceipts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            var PoppetPartBalanceList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            var PoppetPartPlannedReceipts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            individualComponentMRP(PoppetPartOnHand, PoppetScheduledReceipts, PoppetPartLot, PoppetPartSS, PoppetPartScheduledReceipts, PoppetPartLT, PoppetPartBalanceList, PoppetPartMultiplier, PoppetPartPlannedReceipts)

                            //Level 1
                            const SpiderLT = 1
                            const SpiderMultiplier = 1
                            var SpiderScheduledReceipts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            var SpiderBalanceList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            var SpiderPlannedReceipts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            individualComponentMRP(SpiderOnHand, PvbScheduledReceipts, SpiderLot, SpiderSS, SpiderScheduledReceipts, SpiderLT, SpiderBalanceList, SpiderMultiplier, SpiderPlannedReceipts)

                            //Level 2 (Parent: Spider Assembly)
                            const SpiderBoltLT = 11
                            const SpiderBoltMultiplier = 1
                            var SpiderBoltScheduledReceipts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            var SpiderBoltBalanceList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            var SpiderBoltPlannedReceipts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            individualComponentMRP(SpiderBoltOnHand, SpiderScheduledReceipts, SpiderBoltLot, SpiderBoltSS, SpiderBoltScheduledReceipts, SpiderBoltLT, SpiderBoltBalanceList, SpiderBoltMultiplier, SpiderBoltPlannedReceipts)

                            //Level 2 (Parent: Spider Assembly)
                            const SpiderDiscLT = 8
                            const SpiderDiscMultiplier = 1
                            var SpiderDiscScheduledReceipts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            var SpiderDiscBalanceList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            var SpiderDiscPlannedReceipts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            individualComponentMRP(SpiderDiscOnHand, SpiderScheduledReceipts, SpiderDiscLot, SpiderDiscSS, SpiderDiscScheduledReceipts, SpiderDiscLT, SpiderDiscBalanceList, SpiderDiscMultiplier, SpiderDiscPlannedReceipts)

                            //Level 2 (Parent: Spider Assembly)
                            const SpiderPartLT = 5
                            const SpiderPartMultiplier = 1
                            var SpiderPartScheduledReceipts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            var SpiderPartBalanceList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            var SpiderPartPlannedReceipts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            individualComponentMRP(SpiderPartOnHand, SpiderScheduledReceipts, SpiderPartLot, SpiderPartSS, SpiderPartScheduledReceipts, SpiderPartLT, SpiderPartBalanceList, SpiderPartMultiplier, SpiderPartPlannedReceipts)

                            //Level 2 (Parent: Spider Assembly)
                            const SpiderNutLT = 1
                            const SpiderNutMultiplier = 1
                            var SpiderNutScheduledReceipts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            var SpiderNutBalanceList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            var SpiderNutPlannedReceipts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            individualComponentMRP(SpiderNutOnHand, SpiderScheduledReceipts, SpiderNutLot, SpiderNutSS, SpiderNutScheduledReceipts, SpiderNutLT, SpiderNutBalanceList, SpiderNutMultiplier, SpiderNutPlannedReceipts)

                            //Level 1
                            const BoltLT = 5
                            const BoltMultiplier = 3
                            var BoltScheduledReceipts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            var BoltBalanceList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            var BoltPlannedReceipts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            individualComponentMRP(BoltOnHand, PvbScheduledReceipts, BoltLot, BoltSS, BoltScheduledReceipts, BoltLT, BoltBalanceList, BoltMultiplier, BoltPlannedReceipts)

                            //Level 1
                            const CanopyLT = 5
                            const CanopyMultiplier = 1
                            var CanopyScheduledReceipts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            var CanopyBalanceList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            var CanopyPlannedReceipts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            individualComponentMRP(CanopyOnHand, PvbScheduledReceipts, CanopyLot, CanopySS, CanopyScheduledReceipts, CanopyLT, CanopyBalanceList, CanopyMultiplier, CanopyPlannedReceipts)

                            //Level 1
                            const BonnetLT = 7
                            const BonnetMultiplier = 1
                            var BonnetScheduledReceipts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            var BonnetBalanceList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            var BonnetPlannedReceipts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            individualComponentMRP(BonnetOnHand, PvbScheduledReceipts, BonnetLot, BonnetSS, BonnetScheduledReceipts, BonnetLT, BonnetBalanceList, BonnetMultiplier, BonnetPlannedReceipts)

                            //Level 1
                            const PlasticWasherLT = 5
                            const PlasticWasherMultiplier = 1
                            var PlasticWasherScheduledReceipts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            var PlasticWasherBalanceList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            var PlasticWasherPlannedReceipts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            individualComponentMRP(PlasticWasherOnHand, PvbScheduledReceipts, PlasticWasherLot, PlasticWasherSS, PlasticWasherScheduledReceipts, PlasticWasherLT, PlasticWasherBalanceList, PlasticWasherMultiplier, PlasticWasherPlannedReceipts)

                            //Level 1
                            const ORingLT = 1
                            const ORingMultiplier = 1
                            var ORingScheduledReceipts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            var ORingBalanceList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            var ORingPlannedReceipts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            individualComponentMRP(ORingOnHand, PvbScheduledReceipts, ORingLot, ORingSS, ORingScheduledReceipts, ORingLT, ORingBalanceList, ORingMultiplier, ORingPlannedReceipts)
                            console.log(ORingBalanceList)
                            console.log(ORingScheduledReceipts)

                            //Level 1
                            const SpringLT = 6
                            const SpringMultiplier = 1
                            var SpringScheduledReceipts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            var SpringBalanceList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            var SpringPlannedReceipts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            individualComponentMRP(SpringOnHand, PvbScheduledReceipts, SpringLot, SpringSS, SpringScheduledReceipts, SpringLT, SpringBalanceList, SpringMultiplier, SpringPlannedReceipts)

                            //Level 1
                            const TestCockLT = 9
                            const TestCockMultiplier = 2
                            var TestCockScheduledReceipts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            var TestCockBalanceList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            var TestCockPlannedReceipts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            individualComponentMRP(TestCockOnHand, PvbScheduledReceipts, TestCockLot, TestCockSS, TestCockScheduledReceipts, TestCockLT, TestCockBalanceList, TestCockMultiplier, TestCockPlannedReceipts)

                            //Level 1
                            const BallValveLT = 8
                            const BallValveMultiplier = 2
                            var BallValveScheduledReceipts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            var BallValveBalanceList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            var BallValvePlannedReceipts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            individualComponentMRP(BallValveOnHand, PvbScheduledReceipts, BallValveLot, BallValveSS, BallValveScheduledReceipts, BallValveLT, BallValveBalanceList, BallValveMultiplier, BallValvePlannedReceipts)


                            return (
                                <div>
                                    <Box
                                        sx={{
                                            mt: 3,
                                            mx: 2,
                                            height: '85vh',
                                            width: '83vw',
                                            overflowX: "hidden",
                                            //overflowY: 'scroll',
                                            borderRadius: '10px',
                                            boxShadow: 3
                                        }}
                                    >
                                        {/* Level 0: PVB Valve MRP records */}
                                        <div className="featured">
                                            <div className='featuredItem3'>
                                                <div className={classes.sticky2}>
                                                    <span style={{ fontSize: 20, paddingLeft: 20, paddingTop: 20 }}>PVB Valve </span><b><i>34-720</i></b><br />
                                                    <div style={{ fontSize: '75%', paddingLeft: 20 }}><i>
                                                        Lot Size = <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={PvbLot} onInput={e => setPvbLot(e.target.value)} /><br />
                                                        Safety Stock = <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={PvbSS} onInput={e => setPvbSS(e.target.value)} /><br />
                                                        Lead Time = <b>{PvbLT} week(s)</b></i>
                                                    </div>
                                                </div>
                                                <Table sx={{ width: "100%" }} aria-label="simple table" style={{ tableLayout: "fixed" }}>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Date</b></TableCell>
                                                            {dateInWeeks.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Gross Requirement</b></TableCell>
                                                            {demandInWeeks.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                    {/*
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Scheduled Receipts</b></TableCell>
                                                            {PvbScheduledReceipts.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}></TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                    */}
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Planned Receipts</b></TableCell>
                                                            {PvbPlannedReceipts.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Projected Available Balance </b><br />
                                                                <span style={{ fontSize: '75%' }}><i>On-Hand: <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={PvbOnHand} onInput={e => setPvbOnHand(e.target.value)} /></i></span>
                                                            </TableCell>
                                                            {PvbBalanceList.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Planned Order Releases </b></TableCell>
                                                            {PvbScheduledReceipts.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </div>
                                        {/* Level 1: Poppet Assembly MRP records */}
                                        <div className="featured">
                                            <div className='featuredItem3'>
                                                <div className={classes.sticky2}>
                                                    <span style={{ fontSize: 20, paddingLeft: 20, paddingTop: 20 }}>Poppet Assembly </span><b><i>721-300</i></b>
                                                    <Switch
                                                        size="small"
                                                        color="secondary"
                                                        checked={PoppetState}
                                                        sx={{
                                                            marginLeft: '10px'
                                                        }}
                                                        onClick={() => {
                                                            setPoppetState(current => !current)
                                                            console.log(PoppetState)
                                                        }}
                                                    /><br />
                                                    <div style={{ fontSize: '75%', paddingLeft: 20 }}><i>
                                                        Lot Size = <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={PoppetLot} onInput={e => setPoppetLot(e.target.value)} /><br />
                                                        Safety Stock = <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={PoppetSS} onInput={e => setPoppetSS(e.target.value)} /><br />
                                                        Lead Time = <b>{PoppetLT} week(s)</b></i>
                                                    </div>

                                                </div>
                                                <Table sx={{ width: "100%" }} aria-label="simple table" style={{ tableLayout: "fixed" }}>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Date</b></TableCell>
                                                            {dateInWeeks.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Gross Requirement</b></TableCell>
                                                            {PvbScheduledReceipts.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                    {/*
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Scheduled Receipts</b></TableCell>
                                                            {PoppetScheduledReceipts.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}></TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                    */}
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Planned Receipts</b></TableCell>
                                                            {PoppetPlannedReceipts.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Projected Available Balance </b><br />
                                                                <span style={{ fontSize: '75%' }}><i>On-Hand: <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={PoppetOnHand} onInput={e => setPoppetOnHand(e.target.value)} /></i></span>
                                                            </TableCell>
                                                            {PoppetBalanceList.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Planned Order Releases </b></TableCell>
                                                            {PoppetScheduledReceipts.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </div>
                                        {/* <Switch
                                    size="small"
                                    color="secondary"
                                    checked={PoppetState}
                                    sx={{
                                        marginLeft:'30px'
                                    }}
                                    onClick={() => {
                                        setPoppetState(current => !current)
                                        console.log(PoppetState)
                                    }}
                                /><span style={{fontSize: '75%'}}><i>Toggle Level 2</i></span> */}

                                        {(() => {
                                            if (PoppetState === true) {
                                                //Level 2: Poppet Assembly
                                                return (
                                                    <div>
                                                        {/* Level 2: Load Nut MRP records (from Poppet Assembly) */}
                                                        <div className='featuredItem4'>
                                                            <div className={classes.sticky2}>
                                                                <span style={{ fontSize: 20, paddingLeft: 20, paddingTop: 20 }}>Load Nut, 1/4" - 2" Brass </span><b><i>721-90</i></b><br />
                                                                <div style={{ fontSize: '75%', paddingLeft: 20 }}><i>
                                                                    Lot Size = <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={PoppetNutLot} onInput={e => setPoppetNutLot(e.target.value)} /><br />
                                                                    Safety Stock = <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={PoppetNutSS} onInput={e => setPoppetNutSS(e.target.value)} /><br />
                                                                    Lead Time = <b>{PoppetNutLT} week(s)</b></i>
                                                                </div>
                                                            </div>
                                                            <Table sx={{ width: "100%" }} aria-label="simple table" style={{ tableLayout: "fixed" }}>
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Date</b></TableCell>
                                                                        {dateInWeeks.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Gross Requirement</b></TableCell>
                                                                        {PoppetScheduledReceipts.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                                {/*
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Scheduled Receipts</b></TableCell>
                                                                        {PoppetNutScheduledReceipts.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}></TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                                */}
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Planned Receipts</b></TableCell>
                                                                        {PoppetNutPlannedReceipts.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Projected Available Balance </b><br />
                                                                            <span style={{ fontSize: '75%' }}><i>On-Hand: <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={PoppetNutOnHand} onInput={e => setPoppetNutOnHand(e.target.value)} /></i></span>
                                                                        </TableCell>
                                                                        {PoppetNutBalanceList.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Planned Order Releases </b></TableCell>
                                                                        {PoppetNutScheduledReceipts.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                            </Table>
                                                        </div>
                                                        {/* Level 2: Load washer MRP records (from Poppet Assembly) */}
                                                        <div className='featuredItem4'>
                                                            <div className={classes.sticky2}>
                                                                <span style={{ fontSize: 20, paddingLeft: 20, paddingTop: 20 }}>Load Washer, 1/2" - 1" 720 </span><b><i>721-80</i></b><br />
                                                                <div style={{ fontSize: '75%', paddingLeft: 20 }}><i>
                                                                    Lot Size = <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={PoppetWasherLot} onInput={e => setPoppetWasherLot(e.target.value)} /><br />
                                                                    Safety Stock = <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={PoppetWasherSS} onInput={e => setPoppetWasherSS(e.target.value)} /><br />
                                                                    Lead Time = <b>{PoppetWasherLT} week(s)</b></i>
                                                                </div>
                                                            </div>
                                                            <Table sx={{ width: "100%" }} aria-label="simple table" style={{ tableLayout: "fixed" }}>
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Date</b></TableCell>
                                                                        {dateInWeeks.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Gross Requirement</b></TableCell>
                                                                        {PoppetScheduledReceipts.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                                {/*
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Scheduled Receipts</b></TableCell>
                                                                        {PoppetWasherScheduledReceipts.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}></TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                                */}
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Planned Receipts</b></TableCell>
                                                                        {PoppetWasherPlannedReceipts.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Projected Available Balance </b><br />
                                                                            <span style={{ fontSize: '75%' }}><i>On-Hand: <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={PoppetWasherOnHand} onInput={e => setPoppetWasherOnHand(e.target.value)} /></i></span>
                                                                        </TableCell>
                                                                        {PoppetWasherBalanceList.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Planned Order Releases </b></TableCell>
                                                                        {PoppetWasherScheduledReceipts.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                            </Table>
                                                        </div>
                                                        {/* Level 2: Poppet Disc MRP records (from Poppet Assembly) */}
                                                        <div className='featuredItem4'>
                                                            <div className={classes.sticky2}>
                                                                <span style={{ fontSize: 20, paddingLeft: 20, paddingTop: 20 }}>Upper Disc, 1/2" - 1" 720 </span><b><i>721A-34</i></b><br />
                                                                <div style={{ fontSize: '75%', paddingLeft: 20, }}><i>
                                                                    Lot Size = <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={PoppetDiscLot} onInput={e => setPoppetDiscLot(e.target.value)} /><br />
                                                                    Safety Stock = <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={PoppetDiscSS} onInput={e => setPoppetDiscSS(e.target.value)} /><br />
                                                                    Lead Time = <b>{PoppetDiscLT} week(s)</b></i>
                                                                </div>
                                                            </div>
                                                            <Table sx={{ width: "100%" }} aria-label="simple table" style={{ tableLayout: "fixed" }}>
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Date</b></TableCell>
                                                                        {dateInWeeks.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Gross Requirement</b></TableCell>
                                                                        {PoppetScheduledReceipts.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                                {/*
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Scheduled Receipts</b></TableCell>
                                                                        {PoppetDiscScheduledReceipts.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}></TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                                */}
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Planned Receipts</b></TableCell>
                                                                        {PoppetDiscPlannedReceipts.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Projected Available Balance </b><br />
                                                                            <span style={{ fontSize: '75%' }}><i>On-Hand: <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={PoppetDiscOnHand} onInput={e => setPoppetDiscOnHand(e.target.value)} /></i></span>
                                                                        </TableCell>
                                                                        {PoppetDiscBalanceList.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Planned Order Releases </b></TableCell>
                                                                        {PoppetDiscScheduledReceipts.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                            </Table>
                                                        </div>
                                                        {/* Level 2: Poppet MRP records (from Poppet Assembly) */}
                                                        <div className='featuredItem4'>
                                                            <div className={classes.sticky2}>
                                                                <span style={{ fontSize: 20, paddingLeft: 20, paddingTop: 20 }}>Poppet, 1/2" - 1" 720 </span><b><i>721-30</i></b><br />
                                                                <div style={{ fontSize: '75%', paddingLeft: 20, }}><i>
                                                                    Lot Size = <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={PoppetPartLot} onInput={e => setPoppetPartLot(e.target.value)} /><br />
                                                                    Safety Stock = <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={PoppetPartSS} onInput={e => setPoppetPartSS(e.target.value)} /><br />
                                                                    Lead Time = <b>{PoppetPartLT} week(s)</b></i>
                                                                </div>
                                                            </div>
                                                            <Table sx={{ width: "100%" }} aria-label="simple table" style={{ tableLayout: "fixed" }}>
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Date</b></TableCell>
                                                                        {dateInWeeks.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Gross Requirement</b></TableCell>
                                                                        {PoppetScheduledReceipts.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                                {/*
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Scheduled Receipts</b></TableCell>
                                                                        {PoppetPartScheduledReceipts.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}></TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                                */}
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Planned Receipts</b></TableCell>
                                                                        {PoppetPartPlannedReceipts.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Projected Available Balance </b><br />
                                                                            <span style={{ fontSize: '75%' }}><i>On-Hand: <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={PoppetPartOnHand} onInput={e => setPoppetPartOnHand(e.target.value)} /></i></span>
                                                                        </TableCell>
                                                                        {PoppetPartBalanceList.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Planned Order Releases </b></TableCell>
                                                                        {PoppetPartScheduledReceipts.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                            </Table>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })()}
                                        {/* Level 2: Spider Assembly MRP records */}
                                        <div className="featured">
                                            <div className='featuredItem3'>
                                                <div className={classes.sticky2}>
                                                    <span style={{ fontSize: 20, paddingLeft: 20, paddingTop: 20 }}>Spider Assembly </span><b><i>721-310</i></b>
                                                    <Switch
                                                        size="small"
                                                        color="secondary"
                                                        checked={SpiderState}
                                                        sx={{
                                                            marginLeft: '10px'
                                                        }}
                                                        onClick={() => {
                                                            setSpiderState(current => !current)
                                                            console.log(SpiderState)
                                                        }}
                                                    /><br />
                                                    <div style={{ fontSize: '75%', paddingLeft: 20 }}><i>
                                                        Lot Size = <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={SpiderLot} onInput={e => setSpiderLot(e.target.value)} /><br />
                                                        Safety Stock = <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={SpiderSS} onInput={e => setSpiderSS(e.target.value)} /><br />
                                                        Lead Time = <b>{PoppetLT} week(s)</b></i>
                                                    </div>

                                                </div>
                                                <Table sx={{ width: "100%" }} aria-label="simple table" style={{ tableLayout: "fixed" }}>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Date</b></TableCell>
                                                            {dateInWeeks.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Gross Requirement</b></TableCell>
                                                            {PvbScheduledReceipts.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                    {/*
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Scheduled Receipts</b></TableCell>
                                                            {PoppetScheduledReceipts.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}></TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                    */}
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Planned Receipts</b></TableCell>
                                                            {SpiderPlannedReceipts.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Projected Available Balance </b><br />
                                                                <span style={{ fontSize: '75%' }}><i>On-Hand: <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={SpiderOnHand} onInput={e => setSpiderOnHand(e.target.value)} /></i></span>
                                                            </TableCell>
                                                            {SpiderBalanceList.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Planned Order Releases </b></TableCell>
                                                            {SpiderScheduledReceipts.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </div>
                                        {/* <Switch
                                    size="small"
                                    color="secondary"
                                    checked={PoppetState}
                                    sx={{
                                        marginLeft:'30px'
                                    }}
                                    onClick={() => {
                                        setPoppetState(current => !current)
                                        console.log(PoppetState)
                                    }}
                                /><span style={{fontSize: '75%'}}><i>Toggle Level 2</i></span> */}

                                        {(() => {
                                            if (SpiderState === true) {
                                                //Level 2: Spider Assembly
                                                return (
                                                    <div>
                                                        {/* Level 2: Load Nut MRP records (from Spider Assembly) */}
                                                        <div className='featuredItem4'>
                                                            <div className={classes.sticky2}>
                                                                <span style={{ fontSize: 20, paddingLeft: 20, paddingTop: 20 }}>Bolt 8-32 x .620 Pan HD SS </span><b><i>721-11A</i></b><br />
                                                                <div style={{ fontSize: '75%', paddingLeft: 20 }}><i>
                                                                    Lot Size = <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={SpiderBoltLot} onInput={e => setSpiderBoltLot(e.target.value)} /><br />
                                                                    Safety Stock = <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={SpiderBoltSS} onInput={e => setSpiderBoltSS(e.target.value)} /><br />
                                                                    Lead Time = <b>{SpiderBoltLT} week(s)</b></i>
                                                                </div>
                                                            </div>
                                                            <Table sx={{ width: "100%" }} aria-label="simple table" style={{ tableLayout: "fixed" }}>
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Date</b></TableCell>
                                                                        {dateInWeeks.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Gross Requirement</b></TableCell>
                                                                        {SpiderScheduledReceipts.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                                {/*
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Scheduled Receipts</b></TableCell>
                                                                        {PoppetNutScheduledReceipts.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}></TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                                */}
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Planned Receipts</b></TableCell>
                                                                        {SpiderBoltPlannedReceipts.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Projected Available Balance </b><br />
                                                                            <span style={{ fontSize: '75%' }}><i>On-Hand: <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={SpiderBoltOnHand} onInput={e => setSpiderBoltOnHand(e.target.value)} /></i></span>
                                                                        </TableCell>
                                                                        {SpiderBoltBalanceList.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Planned Order Releases </b></TableCell>
                                                                        {SpiderBoltScheduledReceipts.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                            </Table>
                                                        </div>
                                                        {/* Level 2: Lower Disc MRP records (from Spider Assembly) */}
                                                        <div className='featuredItem4'>
                                                            <div className={classes.sticky2}>
                                                                <span style={{ fontSize: 20, paddingLeft: 20, paddingTop: 20 }}>Lower Disc, 1/2" - 1" 720 </span><b><i>721B-34</i></b><br />
                                                                <div style={{ fontSize: '75%', paddingLeft: 20 }}><i>
                                                                    Lot Size = <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={SpiderDiscLot} onInput={e => setSpiderDiscLot(e.target.value)} /><br />
                                                                    Safety Stock = <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={SpiderDiscSS} onInput={e => setSpiderDiscSS(e.target.value)} /><br />
                                                                    Lead Time = <b>{SpiderDiscLT} week(s)</b></i>
                                                                </div>
                                                            </div>
                                                            <Table sx={{ width: "100%" }} aria-label="simple table" style={{ tableLayout: "fixed" }}>
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Date</b></TableCell>
                                                                        {dateInWeeks.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Gross Requirement</b></TableCell>
                                                                        {SpiderScheduledReceipts.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                                {/*
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Scheduled Receipts</b></TableCell>
                                                                        {PoppetWasherScheduledReceipts.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}></TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                                */}
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Planned Receipts</b></TableCell>
                                                                        {SpiderDiscPlannedReceipts.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Projected Available Balance </b><br />
                                                                            <span style={{ fontSize: '75%' }}><i>On-Hand: <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={SpiderDiscOnHand} onInput={e => setSpiderDiscOnHand(e.target.value)} /></i></span>
                                                                        </TableCell>
                                                                        {SpiderDiscBalanceList.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Planned Order Releases </b></TableCell>
                                                                        {SpiderDiscScheduledReceipts.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                            </Table>
                                                        </div>
                                                        {/* Level 2: Spider Part MRP records (from Spider Assembly) */}
                                                        <div className='featuredItem4'>
                                                            <div className={classes.sticky2}>
                                                                <span style={{ fontSize: 20, paddingLeft: 20, paddingTop: 20 }}>Spider, 1/2" - 1" 720 </span><b><i>721-31</i></b><br />
                                                                <div style={{ fontSize: '75%', paddingLeft: 20, }}><i>
                                                                    Lot Size = <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={SpiderPartLot} onInput={e => setSpiderPartLot(e.target.value)} /><br />
                                                                    Safety Stock = <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={SpiderPartSS} onInput={e => setSpiderPartSS(e.target.value)} /><br />
                                                                    Lead Time = <b>{SpiderPartLT} week(s)</b></i>
                                                                </div>
                                                            </div>
                                                            <Table sx={{ width: "100%" }} aria-label="simple table" style={{ tableLayout: "fixed" }}>
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Date</b></TableCell>
                                                                        {dateInWeeks.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Gross Requirement</b></TableCell>
                                                                        {SpiderScheduledReceipts.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                                {/*
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Scheduled Receipts</b></TableCell>
                                                                        {PoppetDiscScheduledReceipts.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}></TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                                */}
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Planned Receipts</b></TableCell>
                                                                        {SpiderPartPlannedReceipts.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Projected Available Balance </b><br />
                                                                            <span style={{ fontSize: '75%' }}><i>On-Hand: <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={SpiderPartOnHand} onInput={e => setSpiderPartOnHand(e.target.value)} /></i></span>
                                                                        </TableCell>
                                                                        {SpiderPartBalanceList.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Planned Order Releases </b></TableCell>
                                                                        {SpiderPartScheduledReceipts.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                            </Table>
                                                        </div>
                                                        {/* Level 2: Nut MRP records (from Spider Assembly) */}
                                                        <div className='featuredItem4'>
                                                            <div className={classes.sticky2}>
                                                                <span style={{ fontSize: 20, paddingLeft: 20, paddingTop: 20 }}>Nut, 8-32 x .620 Pan HD SS </span><b><i>721-9A</i></b><br />
                                                                <div style={{ fontSize: '75%', paddingLeft: 20, }}><i>
                                                                    Lot Size = <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={SpiderNutLot} onInput={e => setSpiderNutLot(e.target.value)} /><br />
                                                                    Safety Stock = <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={SpiderNutSS} onInput={e => setSpiderNutSS(e.target.value)} /><br />
                                                                    Lead Time = <b>{SpiderNutLT} week(s)</b></i>
                                                                </div>
                                                            </div>
                                                            <Table sx={{ width: "100%" }} aria-label="simple table" style={{ tableLayout: "fixed" }}>
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Date</b></TableCell>
                                                                        {dateInWeeks.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Gross Requirement</b></TableCell>
                                                                        {SpiderScheduledReceipts.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                                {/*
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Scheduled Receipts</b></TableCell>
                                                                        {PoppetPartScheduledReceipts.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}></TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                                */}
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Planned Receipts</b></TableCell>
                                                                        {SpiderNutPlannedReceipts.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Projected Available Balance </b><br />
                                                                            <span style={{ fontSize: '75%' }}><i>On-Hand: <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={SpiderNutOnHand} onInput={e => setSpiderNutOnHand(e.target.value)} /></i></span>
                                                                        </TableCell>
                                                                        {SpiderNutBalanceList.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className={classes.sticky}><b>Planned Order Releases </b></TableCell>
                                                                        {SpiderNutScheduledReceipts.map((item, index) => {
                                                                            return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                                        })}
                                                                    </TableRow>
                                                                </TableBody>
                                                            </Table>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })()}
                                        {/* Level 1: Bolt MRP records*/}
                                        <div className="featured">
                                            <div className='featuredItem3'>
                                                <div className={classes.sticky2}>
                                                    <span style={{ fontSize: 20, paddingLeft: 20, paddingTop: 20 }}>Bolt, 8-32 x 3/8 Fil. SS </span><b><i>721-11</i></b><br />
                                                    <div style={{ fontSize: '75%', paddingLeft: 20 }}><i>
                                                        Lot Size = <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={BoltLot} onInput={e => setBoltLot(e.target.value)} /><br />
                                                        Safety Stock = <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={BoltSS} onInput={e => setBoltSS(e.target.value)} /><br />
                                                        Lead Time = <b>{BoltLT} week(s)</b></i>
                                                    </div>
                                                </div>
                                                <Table sx={{ width: "100%" }} aria-label="simple table" style={{ tableLayout: "fixed" }}>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Date</b></TableCell>
                                                            {dateInWeeks.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Gross Requirement</b></TableCell>
                                                            {PvbScheduledReceipts.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{3 * item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Planned Receipts</b></TableCell>
                                                            {BoltPlannedReceipts.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Projected Available Balance </b><br />
                                                                <span style={{ fontSize: '75%' }}><i>On-Hand: <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={BoltOnHand} onInput={e => setBoltOnHand(e.target.value)} /></i></span>
                                                            </TableCell>
                                                            {BoltBalanceList.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Planned Order Releases</b></TableCell>
                                                            {BoltScheduledReceipts.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </div>
                                        {/* Level 1: Canopy MRP records*/}
                                        <div className="featured">
                                            <div className='featuredItem3'>
                                                <div className={classes.sticky2}>
                                                    <span style={{ fontSize: 20, paddingLeft: 20, paddingTop: 20 }}>Canopy, 1/2" - 1" 720 </span><b><i>721-3</i></b><br />
                                                    <div style={{ fontSize: '75%', paddingLeft: 20 }}><i>
                                                        Lot Size = <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={CanopyLot} onInput={e => setCanopyLot(e.target.value)} /><br />
                                                        Safety Stock = <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={CanopySS} onInput={e => setCanopySS(e.target.value)} /><br />
                                                        Lead Time = <b>{CanopyLT} week(s)</b></i>
                                                    </div>
                                                </div>
                                                <Table sx={{ width: "100%" }} aria-label="simple table" style={{ tableLayout: "fixed" }}>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Date</b></TableCell>
                                                            {dateInWeeks.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Gross Requirement</b></TableCell>
                                                            {PvbScheduledReceipts.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{3 * item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Planned Receipts</b></TableCell>
                                                            {CanopyPlannedReceipts.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Projected Available Balance </b><br />
                                                                <span style={{ fontSize: '75%' }}><i>On-Hand: <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={CanopyOnHand} onInput={e => setCanopyOnHand(e.target.value)} /></i></span>
                                                            </TableCell>
                                                            {CanopyBalanceList.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Planned Order Releases</b></TableCell>
                                                            {CanopyScheduledReceipts.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </div>
                                        {/* Level 1: Bonnet MRP records*/}
                                        <div className="featured">
                                            <div className='featuredItem3'>
                                                <div className={classes.sticky2}>
                                                    <span style={{ fontSize: 20, paddingLeft: 20, paddingTop: 20 }}>Bonnet, 1/2" - 1" 720 </span><b><i>721-20</i></b><br />
                                                    <div style={{ fontSize: '75%', paddingLeft: 20 }}><i>
                                                        Lot Size = <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={BonnetLot} onInput={e => setBonnetLot(e.target.value)} /><br />
                                                        Safety Stock = <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={BonnetSS} onInput={e => setBonnetSS(e.target.value)} /><br />
                                                        Lead Time = <b>{BonnetLT} week(s)</b></i>
                                                    </div>
                                                </div>
                                                <Table sx={{ width: "100%" }} aria-label="simple table" style={{ tableLayout: "fixed" }}>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Date</b></TableCell>
                                                            {dateInWeeks.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Gross Requirement</b></TableCell>
                                                            {PvbScheduledReceipts.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{3 * item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Planned Receipts</b></TableCell>
                                                            {BonnetPlannedReceipts.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Projected Available Balance </b><br />
                                                                <span style={{ fontSize: '75%' }}><i>On-Hand: <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={BonnetOnHand} onInput={e => setBonnetOnHand(e.target.value)} /></i></span>
                                                            </TableCell>
                                                            {BonnetBalanceList.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Planned Order Releases</b></TableCell>
                                                            {BonnetScheduledReceipts.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </div>
                                        {/* Level 1: Plastic Washer MRP records*/}
                                        <div className="featured">
                                            <div className='featuredItem3'>
                                                <div className={classes.sticky2}>
                                                    <span style={{ fontSize: 20, paddingLeft: 20, paddingTop: 20 }}>Plastic Washer, 1/2" - 1" 720 </span><b><i>721A-12</i></b><br />
                                                    <div style={{ fontSize: '75%', paddingLeft: 20 }}><i>
                                                        Lot Size = <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={PlasticWasherLot} onInput={e => setPlasticWasherLot(e.target.value)} /><br />
                                                        Safety Stock = <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={PlasticWasherSS} onInput={e => setPlasticWasherSS(e.target.value)} /><br />
                                                        Lead Time = <b>{PlasticWasherLT} week(s)</b></i>
                                                    </div>
                                                </div>
                                                <Table sx={{ width: "100%" }} aria-label="simple table" style={{ tableLayout: "fixed" }}>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Date</b></TableCell>
                                                            {dateInWeeks.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Gross Requirement</b></TableCell>
                                                            {PvbScheduledReceipts.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{3 * item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Planned Receipts</b></TableCell>
                                                            {PlasticWasherPlannedReceipts.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Projected Available Balance </b><br />
                                                                <span style={{ fontSize: '75%' }}><i>On-Hand: <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={PlasticWasherOnHand} onInput={e => setPlasticWasherOnHand(e.target.value)} /></i></span>
                                                            </TableCell>
                                                            {PlasticWasherBalanceList.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Planned Order Releases</b></TableCell>
                                                            {PlasticWasherScheduledReceipts.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </div>
                                        {/* Level 1: O-ring MRP records*/}
                                        <div className="featured">
                                            <div className='featuredItem3'>
                                                <div className={classes.sticky2}>
                                                    <span style={{ fontSize: 20, paddingLeft: 20, paddingTop: 20 }}>O-Ring, FDA </span><b><i>138N</i></b><br />
                                                    <div style={{ fontSize: '75%', paddingLeft: 20 }}><i>
                                                        Lot Size = <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={ORingLot} onInput={e => setORingLot(e.target.value)} /><br />
                                                        Safety Stock = <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={ORingSS} onInput={e => setORingSS(e.target.value)} /><br />
                                                        Lead Time = <b>{ORingLT} week(s)</b></i>
                                                    </div>
                                                </div>
                                                <Table sx={{ width: "100%" }} aria-label="simple table" style={{ tableLayout: "fixed" }}>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Date</b></TableCell>
                                                            {dateInWeeks.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Gross Requirement</b></TableCell>
                                                            {PvbScheduledReceipts.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                    {/*
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Scheduled Receipts</b></TableCell>
                                                            {ORingScheduledReceipts.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}></TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                    */}
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Planned Receipts</b></TableCell>
                                                            {ORingPlannedReceipts.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Projected Available Balance </b><br />
                                                                <span style={{ fontSize: '75%' }}><i>On-Hand: <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={ORingOnHand} onInput={e => setORingOnHand(e.target.value)} /></i></span>
                                                            </TableCell>
                                                            {ORingBalanceList.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Planned Order Releases </b></TableCell>
                                                            {ORingScheduledReceipts.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </div>
                                        {/* Level 1: Spring MRP records*/}
                                        <div className="featured">
                                            <div className='featuredItem3'>
                                                <div className={classes.sticky2}>
                                                    <span style={{ fontSize: 20, paddingLeft: 20, paddingTop: 20 }}>Spring, 1/2" - 1" 720 </span><b><i>721-33</i></b><br />
                                                    <div style={{ fontSize: '75%', paddingLeft: 20 }}><i>
                                                        Lot Size = <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={SpringLot} onInput={e => setSpringLot(e.target.value)} /><br />
                                                        Safety Stock = <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={SpringSS} onInput={e => setSpringSS(e.target.value)} /><br />
                                                        Lead Time = <b>{SpringLT} week(s)</b></i>
                                                    </div>
                                                </div>
                                                <Table sx={{ width: "100%" }} aria-label="simple table" style={{ tableLayout: "fixed" }}>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Date</b></TableCell>
                                                            {dateInWeeks.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Gross Requirement</b></TableCell>
                                                            {PvbScheduledReceipts.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{3 * item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Planned Receipts</b></TableCell>
                                                            {SpringPlannedReceipts.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Projected Available Balance </b><br />
                                                                <span style={{ fontSize: '75%' }}><i>On-Hand: <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={SpringOnHand} onInput={e => setSpringOnHand(e.target.value)} /></i></span>
                                                            </TableCell>
                                                            {SpringBalanceList.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Planned Order Releases</b></TableCell>
                                                            {SpringScheduledReceipts.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </div>
                                        {/* Level 1: TestCock MRP records*/}
                                        <div className="featured">
                                            <div className='featuredItem3'>
                                                <div className={classes.sticky2}>
                                                    <span style={{ fontSize: 20, paddingLeft: 20, paddingTop: 20 }}>Test Cock, 1/8" x 1/4" </span><b><i>18-860</i></b><br />
                                                    <div style={{ fontSize: '75%', paddingLeft: 20 }}><i>
                                                        Lot Size = <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={TestCockLot} onInput={e => setTestCockLot(e.target.value)} /><br />
                                                        Safety Stock = <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={TestCockSS} onInput={e => setTestCockSS(e.target.value)} /><br />
                                                        Lead Time = <b>{TestCockLT} week(s)</b></i>
                                                    </div>
                                                </div>
                                                <Table sx={{ width: "100%" }} aria-label="simple table" style={{ tableLayout: "fixed" }}>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Date</b></TableCell>
                                                            {dateInWeeks.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Gross Requirement</b></TableCell>
                                                            {PvbScheduledReceipts.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{3 * item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Planned Receipts</b></TableCell>
                                                            {TestCockPlannedReceipts.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Projected Available Balance </b><br />
                                                                <span style={{ fontSize: '75%' }}><i>On-Hand: <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={TestCockOnHand} onInput={e => setTestCockOnHand(e.target.value)} /></i></span>
                                                            </TableCell>
                                                            {TestCockBalanceList.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Planned Order Releases</b></TableCell>
                                                            {TestCockScheduledReceipts.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </div>
                                        <div className="featured">
                                            <div className='featuredItem3'>
                                                <div className={classes.sticky2}>
                                                    <span style={{ fontSize: 20, paddingLeft: 20, paddingTop: 20 }}>Ball Valve, 3/4" </span><b><i>34-850</i></b><br />
                                                    <div style={{ fontSize: '75%', paddingLeft: 20 }}><i>
                                                        Lot Size = <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={BallValveLot} onInput={e => setBallValveLot(e.target.value)} /><br />
                                                        Safety Stock = <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={BallValveSS} onInput={e => setBallValveSS(e.target.value)} /><br />
                                                        Lead Time = <b>{BallValveLT} week(s)</b></i>
                                                    </div>
                                                </div>
                                                <Table sx={{ width: "100%" }} aria-label="simple table" style={{ tableLayout: "fixed" }}>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Date</b></TableCell>
                                                            {dateInWeeks.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Gross Requirement</b></TableCell>
                                                            {PvbScheduledReceipts.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{2 * item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                    {/*
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Scheduled Receipts</b></TableCell>
                                                            {BallValveScheduledReceipts.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}></TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                    */}
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Planned Receipts</b></TableCell>
                                                            {BallValvePlannedReceipts.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Projected Available Balance </b><br />
                                                                <span style={{ fontSize: '75%' }}><i>On-Hand: <input style={{ border: '#FFFFFF', width: '60px', fontWeight: 'bold' }} type="number" value={BallValveOnHand} onInput={e => setBallValveOnHand(e.target.value)} /></i></span>
                                                            </TableCell>
                                                            {BallValveBalanceList.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.sticky}><b>Planned Order Releases </b></TableCell>
                                                            {BallValveScheduledReceipts.map((item, index) => {
                                                                return <TableCell className={classes.cellStyles} key={index}>{item}</TableCell>
                                                            })}
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </div>

                                    </Box>
                                </div>
                            )
                        }
                    })()}
                    <div className='slider4'>
                        <ButtonGroup color="secondary" variant="contained" aria-label="outlined primary button group">
                            <Button
                                style={{
                                    backgroundColor: "#AD6ADF",
                                }}
                                onClick={() => {
                                    setValue('Individual MRP')
                                }}
                            >Individual Components</Button>
                            <Button
                                style={{
                                    backgroundColor: "#AD6ADF",
                                }}
                                onClick={() => {
                                    setValue('BOM')
                                }}
                            >Bill of Materials</Button>
                            <Button
                                style={{
                                    backgroundColor: "#AD6ADF",
                                }}
                                onClick={() => {
                                    setValue('PDS')
                                }}
                            >Product Structure Diagram</Button>
                        </ButtonGroup>
                    </div>
                </div>}
        </div>
    )
}