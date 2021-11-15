import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Device from './pages/Device';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/device" component={ Device } />
        <Route path="/dashboard" component={ Dashboard } />
        <Route component={ NotFound } />        
      </Switch>
    </BrowserRouter>
  );
}

export default App;
