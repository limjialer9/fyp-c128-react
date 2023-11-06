import React from 'react'
import './Topbar.css'
//import HomeIcon from '@mui/icons-material/Home';
//import { Link } from "react-router-dom";

export default function Topbar() {
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <div className='logo'>
                        FYP<span style={{ color: '#AD6ADF', fontWeight: 'bold' }}> C126</span> Dashboard
                    </div>
                </div>
                {/*
                <div className="topRight">
                    <Link to="/" className="link">
                        <div className="topbarIcons">
                            <HomeIcon />
                        </div>
                    </Link>
                </div>
                */}
            </div>
        </div>
    )
}