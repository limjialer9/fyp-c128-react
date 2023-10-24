import * as React from 'react'
import Architecutre from "./FYP-Diagram.drawio.png"
import './Architecture.css'
import { Box } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat) {
    return { name, calories, fat};
}
  
const rows = [
    createData(1, 'GitHub', 'Repository to store source codes. Enables automatic CI/CD of Web App whenever a new code commit.'),
    createData(2, 'ReactJS', 'React is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta and a community of individual developers and companies.'),
    createData(3, 'JavaScript', 'Language used for Web App functions, for internal functionalities and external API calls.'),
    createData(4, 'CSS', 'Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.'),
    createData(5, 'AWS Lambda', 'AWS Lambda is a serverless computing platform by Amazon Web Services. It is used in the Web App as the REST API for the different functionalities required.'),
    createData(6, 'AWS Elastic Beanstalk','AWS Elastic Beanstalk is an easy-to-use service for deploying and scaling web applications and services developed with Java, .NET, PHP, Node.js, Python, Ruby, Go, and Docker on familiar servers such as Apache, Nginx, Passenger, and IIS. It is used to host our React Web App'),
];

export default function Architecture(){
    return(
        <div className="architecture">
            <div className="mainWrapper">
            <Box
                sx={{
                    // mt: 3,
                    // mx: 2,
                    height: '90vh',
                    overflowX: "hidden",
                    borderRadius: '10px',
                    // boxShadow: 3
                    }}
            >
                <div className="imageStyle">
                    <img src={Architecutre} alt="fireSpot" width={'85%'}/>
                </div>
                <br/>
                <TableContainer component={Paper} align='center'>
                    <Table sx={{ minWidth: 650 , maxWidth:1000}} aria-label="simple table" style={{ width: '80%' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Component</TableCell>
                                <TableCell>Resource</TableCell>
                                <TableCell>Usage</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row" style={{ width: '5%' }}>
                                {row.name}
                            </TableCell>
                            <TableCell style={{ width: '20%' }}>{row.calories}</TableCell>
                            <TableCell style={{ width: '75%' }}>{row.fat}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </Box>
            </div>
        </div>
    )
}