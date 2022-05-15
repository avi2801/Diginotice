import './App.css';
import { Route, BrowserRouter } from 'react-router-dom';
import history from './history';
import NoticeBoard from './Components/NoticeBoard'
import Navbar1 from './Components/Navbar1';
import Home from './Components/Home';
import Diginotice from './abis/Diginotice.json';
import Login from './Components/Login';
import Web3 from 'web3'


import { Component } from 'react';


class App extends Component {
  async componentDidMount() {
    this.loadWeb3()
    this.loadBlockchainData()
  }
  async loadWeb3() {
    if (window.ethereum) {
      window.Web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.Web3) {
      window.Web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert("Non ethereum project detected")
    }
  }
  async loadBlockchainData() {
    const web3 = window.Web3
    const accounts = await web3.eth.getAccounts()
    console.log(accounts[0])
    this.setState({
      account: accounts[0]
    })
    const networkId = await web3.eth.net.getId()
    const networkData = Diginotice.networks[networkId]

    if (networkData) {
      const diginotice = web3.eth.Contract(Diginotice.abi, networkData.address)
      this.setState({ diginotice })
      const postCount = await diginotice.methods.postCount().call()
      this.setState({ postCount })
      this.setState({ loading: false })
    } else {
      window.alert('Diginotice contract is not deployed to detected network')
    }
  }

  captureFile = event => {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log(this.state.buffer)
    }

  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      diginotice: null,
      posts: [],
      loading: true
    }
  }


  render() {
    return (

      <div>

      <Navbar1 />
      <BrowserRouter history={history}>
        <Route exact path="/" component={Home} />
        <Route path="/noticeboard" component={NoticeBoard} />
        <Route path="/login" component={Login} />
        </BrowserRouter >
        </div>



    );
  }
}

export default App;
