import React, { useState, useEffect } from 'react';
import { Container } from "react-bootstrap";
import axios from "axios";
import { Domain } from "../Domain";
import { useHistory } from "react-router";
import sanitizeHtml from 'sanitize-html';

const Article = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [id, setId] = useState(null);
  const history = useHistory();
  
  useEffect(() => {
    getArticleById();
  }, [setTitle, setDescription, setDate]);

  const defaultOptions = {
    allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ],
    allowedAttributes: {
      'a': [ 'href' ]
    },
    allowedIframeHostnames: ['www.youtube.com']
  };
  
  const sanitize = (dirty, options) => ({
    __html: sanitizeHtml( dirty, {options: { ...defaultOptions, ...options }}
    )
  });
  
  const SanitizeHTML = ({ html, options }) => (
    <div dangerouslySetInnerHTML={sanitize(html, options)} />
  );

  const getArticleById = () => {
    axios.get(Domain + 'articles/' + props.match.params.slug).then(res => {
      console.log(res.data);
      let content = res.data
      setId(content._id);
      setTitle(content.title);
      setDate(content.createdAt);
      setDescription(content.sanitizedHtml);
    }).catch(err => {
      console.log('An error occured! ' + err);
    })
  }

  return ( 
    <Container>
      <h1 className="mb-1">{title}</h1>
      <div className="text-muted mb-2">{date}</div>
      <button onClick={() => {history.push('/')}} className="btn btn-secondary">All Articles</button>{" "}
      <button onClick={() => {history.push(`/edit/${id}`)}} className="btn btn-info">Edit</button>
      <SanitizeHTML html={description} />
    </Container>
   );
}
 
export default Article;