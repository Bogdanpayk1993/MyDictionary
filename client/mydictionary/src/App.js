import './App.css';
import LoginButton from "./components/Auth0/LoginButton"
import LogoutButton from './components/Auth0/LogoutButton';
import Profile from './components/Auth0/Profile';

function App() {
  return (
    <div className="App">
      <LoginButton />
      <LogoutButton />
      <Profile />
    </div>
  );
}

export default App;
