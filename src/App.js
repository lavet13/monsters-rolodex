import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';

// local state or just state for short is just some info that only this component is aware of and can modify
// and could read from
export default class App extends Component {
  constructor() {
    super();

    this.state = {
      name: { firstName: 'Yihua', lastName: 'Zhang' },
      company: 'ZTM',
    };
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />

          <p>
            Hi {this.state.name.firstName} {this.state.name.lastName}, I work at{' '}
            {this.state.company}
          </p>

          <button
            onClick={() => {
              // shallow merge technique(merging given object with the current state object) that is happening asynchronously
              // first function is a updater function and that is going to be some function where you return an object that it
              // will then use to shallow merge against state. Arguments: state, props(which are totally optional)
              // second function is going to run only after the state is fully updated(optional)
              this.setState(
                () => ({
                  name: {
                    firstName:
                      this.state.name.firstName === 'Yihua'
                        ? 'Andrei'
                        : 'Yihua',
                    lastName:
                      this.state.name.lastName === 'Zhang'
                        ? 'Neaogie'
                        : 'Zhang',
                  },
                }),
                () => {
                  console.log(this.state);
                }
              );
            }}
          >
            Change Name
          </button>
        </header>
      </div>
    );
  }
}
