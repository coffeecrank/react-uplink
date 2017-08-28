import React from 'react';
import './Messages.css';
import messageDeleteImgSrc from './message-delete.png';
import messageNewImgSrc from './message-new.png';
import messageOldImgSrc from './message-old.png';

class Messages extends React.Component {
	constructor() {
		super();
		this.deleteMessage = this.deleteMessage.bind(this);
		this.openMessage = this.openMessage.bind(this);
		this.removePopup = this.removePopup.bind(this);
	}

	componentDidMount() {
		fetch('https://api.myjson.com/bins/11cntp')
			.then(response => response.json())
				.then(data => this.props.setMessages(data.Payload));
	}

	deleteMessage(e) {
		var parentRow = e.target.parentNode.parentNode;
		var messageId = parseInt(parentRow.getAttribute('id'), 10);
		var newMessages = [];
		for (var i = 0; i < this.props.messages.length; i++) {
			if (this.props.messages[i].id !== messageId) {
				newMessages.push(this.props.messages[i]);
			}
		}
		this.props.setMessages(newMessages);
		document.getElementsByClassName('popup')[0].classList.remove('popup-visible');
	}

	getMessagesJSX(messages) {	
		var messagesJSX = [];
		for (var i = 0; i < messages.length; i++) {
			var isRead = messages[i].isRead;
			var date = this.parseDate(messages[i].sentDate);
			messagesJSX.push(
				<tr id={messages[i].id} key={i}>
					<td className="message-open-container">
						<img
							className={isRead ? "message-old" : "message-new"}
							src={isRead ? messageOldImgSrc : messageNewImgSrc} 
							alt={isRead ? "Old message" : "New message"}
							onClick={this.openMessage} />
					</td>
					<td>{messages[i].sender}</td>
					<td>{messages[i].recipient}</td>
					<td>{messages[i].title}</td>
					<td>{date}</td>
					<td className="message-delete-container"><img className="message-delete" src={messageDeleteImgSrc} alt="Delete message" onClick={this.deleteMessage} /></td>
				</tr>
			);
		}
		return messagesJSX;
	}

	getNewMessages(messages) {
		var newMessages = 0;
		for (var i = 0; i < messages.length; i++) {
			if (!messages[i].isRead) {
				newMessages++;
			}
		}
		return newMessages;
	}

	openMessage(e) {
		e.target.src = messageOldImgSrc;
		var parentRow = e.target.parentNode.parentNode;
		var messageId = parseInt(parentRow.getAttribute('id'), 10);
		var messageBody = '';
		var newMessages = [];
		for (var i = 0; i < this.props.messages.length; i++) {
			var message = this.props.messages[i];
			if (message.id === messageId) {
				message.isRead = true;
				messageBody = message.body.replace(/<(?:.|\n)*?>/gm, '');
			}
			newMessages.push(message);
		}
		this.props.setMessages(newMessages);
		document.getElementsByClassName('popup')[0].classList.add('popup-visible');
		document.getElementsByClassName('popup')[0].innerHTML = '<p>' + messageBody + '</p>';
	}

	parseDate(string) {
		var cutoff = string.substring(0, string.indexOf('T'));
		var date = '';
		var year = cutoff.substring(0, cutoff.indexOf('-'));
		cutoff = cutoff.substring(cutoff.indexOf('-') + 1);
		var monthIndex = parseInt(cutoff.substring(0, cutoff.indexOf('-')), 10);
		var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][monthIndex - 1];
		cutoff = cutoff.substring(cutoff.indexOf('-') + 1);
		var day = cutoff;
		date = month + ' ' + day + ', ' + year;
		return date;
	}

	removePopup(e) {
		e.target.classList.remove('popup-visible');
	}

	render() {
		return (
			<div id="messages">
				<table id="messages-table" className="table">
					<thead>
		  			<tr>
		    			<th></th>
		    			<th>FROM</th>
		    			<th>TO</th>
		    			<th>SUBJECT</th>
		    			<th>DATE</th>
		    			<th></th>
		  			</tr>
					</thead>
					<tbody>
		  			{this.getMessagesJSX(this.props.messages)}
					</tbody>
					<tfoot>
						<tr>
							<td colSpan="6">{this.getNewMessages(this.props.messages)} NEW MESSAGES</td>
						</tr>
					</tfoot>
				</table>
				<div className="popup" onClick={this.removePopup}></div>
			</div>
		);
  }
}

export default Messages;