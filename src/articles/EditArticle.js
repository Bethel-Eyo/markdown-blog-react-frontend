import React from 'react';
import { Container, Button } from "react-bootstrap";
import ArticleForm from './ArticleForm';

const EditArticle = (props) => {
  return ( 
    <Container>
      <h1 className="mb-4">New Article</h1>
      <ArticleForm type='edit' params={props.match.params.id} />
    </Container>
   );
}
 
export default EditArticle;