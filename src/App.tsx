import { BrowserRouter as Router } from 'react-router-dom'; 
import Pages from './components/pages';
import { ConfigProvider } from 'antd';

function App() {
  return (
    <Router>
      <ConfigProvider theme={{ token: {colorPrimary: "#50cf70"} }}>
        <Pages />
      </ConfigProvider>
    </Router>
  );
}

export default App;
