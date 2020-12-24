import React from "react";
import Home from "./articles";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import AddArticles from "./articles/AddArticle";
import Article from "./articles/Article";
import EditArticle from "./articles/EditArticle";
function App() {

  return (
    <Router>
      <Switch>
        <Route path="/new" component={AddArticles} />
        <Route path="/article/:slug" component={Article} />
        <Route path="/edit/:id" component={EditArticle} />
        <Route path="/" component={Home} />
      </Switch>
    </Router> 
  );
}

export default App;
