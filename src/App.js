import { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import './App.css';

import CreateImage from "./components/CreateImage";
import Home from "./components/Home";

class App extends Component {

  render() {
    return(
      <BrowserRouter>
        <Route path="/image" component={CreateImage} />
        <Route path="/" exact component={Home} />
      </BrowserRouter>
    );
  }
}

export default App;
