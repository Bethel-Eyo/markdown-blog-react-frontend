import React from 'react';
import { Container, Button } from "react-bootstrap";
import ArticleForm from './ArticleForm';

const AddArticles = () => {
  return ( 
    <Container>
      <h1 className="mb-4">New Article</h1>
      <ArticleForm type='add' params='' />
    </Container>
   );
}
 
export default AddArticles;