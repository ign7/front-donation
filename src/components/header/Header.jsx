import logoimg from '../../img/LogoDonation.jpeg'; 
import React from 'react';
import './Header.css';


function Header() {
    return (
    <div className='title'>
        <header>

            <div className='logo-title' >
                <img  className='logo' src={logoimg} alt="" />
                <h1>Donation System</h1>
            </div>
            
            <nav>
                <ul>
                    <li>HOME</li>
                    <li>SOBRE</li>
                    <li>BLOG</li>
                </ul>
            </nav>
        </header>
    </div>
    );
}

export default Header;
