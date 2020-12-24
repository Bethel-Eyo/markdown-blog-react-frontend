import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import axios from "axios";
import { Domain } from "../Domain";
import { useHistory } from "react-router";

function Home() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    getArticles();
  }, [setArticles]);

  const history = useHistory();

  const getArticles = () => {
    axios
      .get(Domain + "articles")
      .then((response) => {
        setArticles(response.data);
        console.log(articles);
      })
      .catch((error) => {
        console.log("An error occured " + error);
      });
  };

  const deleteArticle = (id) => {
    axios.delete(Domain + `articles/${id}`).then(response => {
      console.log(response.data.msg);
      alert(response.data.msg);
      window.location.reload();
    }).catch(error => {
      console.log("An error occured! " + error);
    })
  }

  return (
    <Container>
      <h1 className="mb-4">Blog Articles</h1>
      <Button onClick={() => {history.push('/new')}} variant="success">New Article</Button>{" "}
      {articles.map((article, index) => (
        <div className="card mt-4" key={index}>
          <div className="card-body">
            <h4 className="card-title">{article.title}</h4>
            <div className="card-subtitle text-muted mb2">
              {article.createdAt}
            </div>
            <div className="card-text mb-2">
              {article.description}
            </div>
            <button onClick={() => {history.push(`/article/${article.slug}`)}} className="btn btn-primary">Read More</button>{' '}
            <button onClick={() => {history.push(`/edit/${article._id}`)}} className="btn btn-info">Edit</button>{' '}
            <Button onClick={() => {deleteArticle(article._id)}} variant='danger'>Delete</Button>
          </div>
        </div>
      ))}
    </Container>
  );
}

export default Home;
