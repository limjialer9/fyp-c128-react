import React from 'react'
import './Sidebar.css'
import ArchitectureIcon from '@mui/icons-material/Architecture';
import TimelineIcon from '@mui/icons-material/Timeline';
import EventNoteIcon from '@mui/icons-material/EventNote';
import InventoryIcon from '@mui/icons-material/Inventory';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import RestoreIcon from '@mui/icons-material/Restore';
import { Link } from "react-router-dom";

export default function Sidebar(){
    return(
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="siderbarMenu">
                    <h4 className="siderbarTitle">
                        Ordering
                    </h4>
                    <ul className="sidebarList">
                        <Link to="/ordering" className="link">
                            <li className="sidebarListItem">
                                <HistoryEduIcon className="sidebarListItemIcon"/>
                                Order Form
                            </li>
                        </Link>
                        <Link to="/orderinghistory" className="link">
                            <li className="sidebarListItem">
                                <RestoreIcon className="sidebarListItemIcon"/>
                                Order History
                            </li>
                        </Link>
                    </ul>
                    <h4 className="siderbarTitle">
                        Functions
                    </h4>
                    <ul className="sidebarList">
                        <Link to="/forecasting" className="link">
                        <li className="sidebarListItem">
                            <TimelineIcon className="sidebarListItemIcon"/>
                            Demand Forecast
                        </li>
                        </Link>
                        <Link to="/mps" className="link">
                        <li className="sidebarListItem">
                            <EventNoteIcon className="sidebarListItemIcon"/>
                            Master Production Schedule
                        </li>
                        </Link>
                        <Link to="/mrp" className="link">
                        <li className="sidebarListItem">
                            <InventoryIcon className="sidebarListItemIcon"/>
                            Material Requirement Plan
                        </li>
                        </Link>
                    </ul>
                    <h4 className="siderbarTitle">
                        About
                    </h4>
                    <ul className="sidebarList">
                        <Link to="/architecture" className="link">
                        <li className="sidebarListItem">
                            <ArchitectureIcon className="sidebarListItemIcon"/>
                            Design Architecture
                        </li>
                        </Link>
                        <Link target='_blank' to={"//www.linkedin.com/in/darentwh"} className="link">
                        <li className="sidebarListItem">
                            <LinkedInIcon className="sidebarListItemIcon"/>
                            Developer
                        </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}