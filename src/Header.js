import React from 'react';
import './Header.css';
import headerCircleImgSrc from './header-circle.png';
import headerLineImgSrc from './header-line.png';
import headerLocalImgSrc from './header-local.png';
import headerServerImgSrc from './header-server.png';

function Header(props) {
	return (
		<div>
			<div id="header">
	      <div id="header-logo">
			    <img id="header-logo-local" src={headerLocalImgSrc} alt="Local machine" />
			     <img id="header-logo-line" src={headerLineImgSrc} alt="Line" />
			     <img id="header-logo-circle" src={headerCircleImgSrc} alt="Circle" />
			     <img id="header-logo-server" src={headerServerImgSrc} alt="Server" />
	      </div>
        <div id="header-ip"><h5>Your IP:&nbsp;{props.children}</h5></div>
      	<div id="header-title"><h1>Welcome to Uplink Message Server</h1></div>
    	</div>
    	<div id="header-footer"></div>
  	</div>
	);
}

export default Header;