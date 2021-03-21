// React Modules
import { BrowserRouter as Router } from 'react-router-dom';

// Routes
import Routes from './routes';

// CSS
import GlobalStyle from './styles/global';


// APP
const App = () => (
  <>
    <GlobalStyle />
    <Router>
      <Routes />
    </Router>
  </>
);

export default App;
