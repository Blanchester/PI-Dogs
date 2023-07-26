import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NavBar } from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import { Create } from './components/Create/Create';
import Detail from './components/Detail/Detail';
import Footer from './components/Footer/Footer';
import LandingPage from './components/LandingPage/LandingPage';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Route path="/" component={NavBar} />
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route path="/home" component={Home}/>
        <Route path="/dogs/:id" component={Detail}/> 
        <Route path="/create" component={Create}/>
      </Switch> 
        <Route path="/" component={Footer} />
    </div>
    </BrowserRouter>
  );
}

export default App;
