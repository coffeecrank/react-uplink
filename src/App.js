import React from 'react';
import Header from './Header';
import IP from './IP';
import Messages from './Messages';
import './App.css';

/*
App is the only statefull component.
Child components receive props from App which allow them to call App's methods.
Once a method is called, App will update its state.
App renders all child components.
*/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [], // Messages, initially fetched from an external API
      userIP: '' // User IP fetched from an external API
    }
    this.setMessages = this.setMessages.bind(this);
    this.setMessagesNew = this.setMessagesNew.bind(this);
    this.setUserIP = this.setUserIP.bind(this);
  }

  setMessages(messages) {
    this.setState({ messages: messages });
  }

  setMessagesNew(count) {
    this.setState({ messagesNew: count });
  }

  setUserIP(ip) {
    this.setState({ userIP: ip });
  }

  render() {
    return (
      <div className="container-fluid">
        <Header>
          <IP setUserIP={this.setUserIP} userIP={this.state.userIP} />
        </Header>
        <Messages 
          setMessages={this.setMessages} 
          setMessagesNew={this.setMessagesNew} 
          messages={this.state.messages} 
          messagesNew={this.state.messagesNew} />
      </div>
    );
  }
}

export default App;
