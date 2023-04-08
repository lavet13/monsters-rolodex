import { useState, useEffect, Component } from 'react';
import './App.css';
import SearchBox from './components/search-box/search-box.component';
import CardList from './components/card-list/card-list.component';

// Functional components do NOT go through life cycles the way
// that we typically think about when we're talking about
// class components. It's almost an entirely different mental
// model. There's NO life cycles when it comes to functional
// components. You have to think about it in a completely
// different way, and the way you want to think about them
// is in the concept of functions(pure and impure functions)
// and side effects.

// pure function, there are mainly two things to consider:
// 1) What a pure function should do is return the exact same
// thing, no matter how many times it gets called, when it's
// given the same arguments.
// It should solely be dependent on the props being passed in,
// not some external variable that outside of the function.
// 2) Pure function should NOT produce side effects.
// (i.e. changing some external variable, logging something to
// the console, modifying some node in the DOM). Side effect is when
// a function creates some kind of effect outside of it's scope.

const App = () => {
  // useState essentially gives us the ability to encapsulate local state
  // in a functional component
  const [searchField, setSearchField] = useState(''); // [value, setValue]
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilterMonsters] = useState(monsters);

  console.log('rendered');
  // infinite loop happens because of getting a different array in memory
  // (it comes from outside of our browser). It's not about the values
  // in the array, it's about whether or not that array points to the same
  // reference in memory(monsters). And every time this happens,
  // it's a different array in memory.(users => setMonsters(users))

  // most likely dependencies are going to be: state values, props values.
  // Whenever any of the values inside of this dependency array change is
  // when i'm going to run this callback function
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(users => setMonsters(users));
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter(({ name }) =>
      name.toLocaleLowerCase().includes(searchField)
    );

    setFilterMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = e => {
    const searchFieldString = e.target.value.toLocaleLowerCase();

    setSearchField(searchFieldString);
    // if the current string value of our state is the same as the new string value coming in
    // literally the string value, so the exact same then we won't re-render
    // setSearchField(searchField);
  };

  return (
    <div className='App'>
      <h1 className='app-title'>Monsters Rolodex</h1>

      <SearchBox
        className='monsters-search-box'
        onChangeHandler={onSearchChange}
        placeholder='search monsters'
      />

      <CardList monsters={filteredMonsters} />
    </div>
  );
};

// class App extends Component {
//   constructor() {
//     super();

//     // local state or just state for short is just some info that only this component is aware of and can modify
//     // and could read from
//     // initial state of monsters is empty array, because if you fail in a middle of API request,
//     // then what would it matter for a user to see? The user should not see anything that they
//     // should just see the fact there is empty array(nothing should display them)
//     // because nothing was properly fetched.
//     this.state = {
//       monsters: [],
//       searchField: '', // null case or empty case of what this will be, so the empty case of that is an empty string
//     };
//   }

//   // When do I get the list? How do I get the list? Where do I put the list?(it's gonna be in our state)
//   // Mounting is the first time a component gets placed on to the DOM. So the first time React renders
//   // a component onto the page that is mounting. It only happens once through a component's life.
//   // The only time when a component might re-mounts is if it's been unmounting, meaning it's been
//   // completely removed from the DOM and you could almost argue that it's a different component.
//   // Whenever we have a component(a class component specifically), that needs to leverage some kind of
//   // API call in order to get data that it needs in order to display the appropriate UI, you wanna put that
//   // inside of your componentDidMount lifecycle method.
//   componentDidMount() {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then(res => res.json())
//       .then(users => this.setState(() => ({ monsters: users })));
//   }

//   // second optimization: making app a little bit more performance by not
//   // unnecessarily rendering extra anonymous function whenever the render method is
//   // being called.
//   onSearchChange = e => {
//     const searchField = e.target.value.toLocaleLowerCase();

//     this.setState(() => ({
//       searchField,
//     }));
//   };

//   render() {
//     // general best practice is to always use non modifying methods, meaning
//     // if you going to modify an array, you want to generate a new one.(concept is called immutability)

//     // first optimization: more readable(destructuring "this" and this.state)
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;

//     const filteredMonsters = monsters.filter(({ name }) =>
//       name.toLocaleLowerCase().includes(searchField)
//     );

//     return (
//       <div className='App'>
//         <h1 className='app-title'>Monsters Rolodex</h1>
//         <SearchBox
//           className='monsters-search-box'
//           onChangeHandler={onSearchChange}
//           placeholder='search monsters'
//         />
//         <CardList monsters={filteredMonsters} />
//       </div>
//     );
//   }
// }

export default App;
