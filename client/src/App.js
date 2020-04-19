import React from 'react';
import axios from 'axios'


class App extends React.Component {
  
  componentWillMount() {
    axios.get('/api/product/allbrands')
      .then(response => console.log(response))
  }
  
  render() {
    return (
      <div className="App">
        MY APP
      </div>
    );
  }
}

export default App;