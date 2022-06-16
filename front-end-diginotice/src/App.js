import './App.css';
import { Route, BrowserRouter } from 'react-router-dom';
import history from './history';
import NoticeBoard from './Components/NoticeBoard'
import Navbar1 from './Components/Navbar1';
import Home from './Components/Home';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import { Component } from 'react';


class App extends Component {



  render() {
    return (

      <div>
      <Navbar1 />
      <BrowserRouter history={history}>
        <Route exact path="/" component={Home} />
        {/* <Route path="/noticeboard" component={NoticeBoard}  /> */}
          <Route path="/login" component={NoticeBoard} />
          {/* <Route path= "/signup" component={SignUp}/> */}
        </BrowserRouter >
        </div>



    );
  }
}

export default App;
//2666FA
