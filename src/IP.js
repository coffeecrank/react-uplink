import React from 'react';
import './IP.css'

class IP extends React.Component {
	componentDidMount() {
		fetch('https://api.ipify.org?format=json')
			.then(response => response.json())
				.then(data => this.props.setUserIP(data.ip));
	}

	render() {
		return <p id="ip">{this.props.userIP}</p>;
	}
}

export default IP;