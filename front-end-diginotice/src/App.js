import './App.css';
import { Route, BrowserRouter } from 'react-router-dom'
import history from './history'
import NoticeBoard from './Components/NoticeBoard'
import Navbar1 from './Components/Navbar1';
import Home from './Components/Home'
import Login from './Components/Login'

function App() {
  return (
    <BrowserRouter history={history}>
        <div>
          <Navbar1/>
        </div>
        <div >
          <Route exact path="/" component={Home} />
          <Route path="/noticeboard" component={NoticeBoard} />
		      <Route path="/login" component={Login} />
        </div>
      </BrowserRouter >
  );
}

export default App;
