import { Link } from 'react-router-dom';
import pawprint from './assets/images/pawprint.png'
import './App.css';
import Container from './Container';

function App() {
  return (
    <div>
      <div className="header">
          <Link to="/barkspace">
            <img src={pawprint} className="App-logo" alt="logo" />
          </Link>
          <h2>
            BarkSpace
          </h2>
      </div>
      <Container />
    </div>
  );
}

export default App;
