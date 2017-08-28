import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import IP from './IP';
import Messages from './Messages';

describe('App', () => {
	it('renders without crashing', () => {
	  const div = document.createElement('div');
	  ReactDOM.render(<App />, div);
	});
});

describe('IP', () => {
	it('renders without crashing', () => {
	  const div = document.createElement('div');
	  ReactDOM.render(<IP />, div);
	});
});

describe('Messages', () => {
	it('renders without crashing', () => {
	  const div = document.createElement('div');
	  ReactDOM.render(<Messages />, div);
	});
});
