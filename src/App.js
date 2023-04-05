import { Component } from 'react';
import './App.css';
import SearchBox from './components/search-box/search-box.component';
import CardList from './components/card-list/card-list.component';

// local state or just state for short is just some info that only this component is aware of and can modify
// and could read from
export default class App extends Component {
  constructor() {
    super();

    // initial state of monsters is empty array, because if you fail in a middle of API request,
    // then what would it matter for a user to see? The user should not see anything that they
    // should just see the fact there is empty array(nothing should display them)
    // because nothing was properly fetched.
    this.state = {
      monsters: [],
      searchField: '', // null case or empty case of what this will be, so the empty case of that is an empty string
    };
  }

  // When do I get the list? How do I get the list? Where do I put the list?(it's gonna be in our state)
  // Mounting is the first time a component gets placed on to the DOM. So the first time React renders
  // a component onto the page that is mounting. It only happens once through a component's life.
  // The only time when a component might re-mounts is if it's been unmounting, meaning it's been
  // completely removed from the DOM and you could almost argue that it's a different component.
  // Whenever we have a component(a class component specifically), that needs to leverage some kind of
  // API call in order to get data that it needs in order to display the appropriate UI, you wanna put that
  // inside of your componentDidMount lifecycle method.
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(users => this.setState(() => ({ monsters: users })));
  }

  // second optimization: making app a little bit more performance by not
  // unnecessarily rendering extra anonymous function whenever the render method is
  // being called.
  onSearchChange = e => {
    const searchField = e.target.value.toLocaleLowerCase();

    this.setState(() => ({
      searchField,
    }));
  };

  render() {
    // general best practice is to always use non modifying methods, meaning
    // if you going to modify an array, you want to generate a new one.(concept is called immutability)

    // first optimization: more readable(destructuring "this" and this.state)
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter(({ name }) =>
      name.toLocaleLowerCase().includes(searchField)
    );

    return (
      <div className='App'>
        <SearchBox
          className='monsters-search-box'
          onChangeHandler={onSearchChange}
          placeholder='search monsters'
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}
