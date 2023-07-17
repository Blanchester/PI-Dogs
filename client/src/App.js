import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NavBar } from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import { Create } from './components/Create/Create';
import Detail from './components/Detail/Detail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Route path="/" component={NavBar} />
      <Switch>
        <Route path="/home" component={Home}/>
        {/* <Route exact path="/" component={LandingPage}/>
        */}
        <Route path="/dogs/:id" component={Detail}/> 
        <Route path="/create" component={Create}/>
      </Switch> 
    </div>
    </BrowserRouter>
  );
}

export default App;
