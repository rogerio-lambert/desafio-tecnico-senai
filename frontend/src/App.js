import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Device from './pages/Device';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme'

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/device" component={ Device } />
          <Route path="/dashboard" component={ Dashboard } />
          <Route component={ NotFound } />        
        </Switch>
      </ThemeProvider>

    </BrowserRouter>
  );
}

export default App;
