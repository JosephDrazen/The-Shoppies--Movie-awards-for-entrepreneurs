import { AppProvider } from '@shopify/polaris';
import { Router, Switch, Route } from "react-router-dom";
import './App.css';
import Index from './pages/index.js'
import Main from './pages/main.js'
import history from './history';

function App() {
  return (
    <AppProvider>
      <Router history={history}>
        <div className="App">
          <Switch>
            <Route path='/' exact component={Index} />
            <Route path="/home" component={Main} />
          </Switch>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
