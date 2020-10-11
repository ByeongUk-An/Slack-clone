import React from 'react'
import { Menu } from 'semantic-ui-react';
import './SideMenu.css'
import UserInfo from './UserInfo/UserInfo'
function SideMenu() {
    return (
        <Menu vertical fixed="left" className="side-nav" borderless size="large">
            <UserInfo/>
        </Menu>
    )           
}

export default SideMenu
