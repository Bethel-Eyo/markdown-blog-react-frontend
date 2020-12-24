import React, { useState, useEffect } from "react";
import axios from "axios";
import { Domain } from "../Domain";
import { useHistory } from "react-router";

const ArticleForm = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [markdown, setMarkdown] = useState("");
  const history = useHistory();

  useEffect(() => {
    if(props.params === ''){
      // do nothing
    } else {
      findArticleToEdit();
    }
  }, []);

  const findArticleToEdit = () => {
    axios.get(Domain + 'articles/getId/' + props.params).then(res => {
      console.log('find edit called')
      console.log(res.data);
      let content = res.data
      setTitle(content.title);
      setDescription(content.description);
      setMarkdown(content.markdown)
    }).catch(err => {
      console.log('An error occured! ' + err);
    })
  }

  const addArticle = () => {
    let article = {
      title,
      description,
      markdown,
    };
    console.log(article);
    axios
      .post(Domain + "articles/new", article)
      .then((response) => {
        if(response.data.type === 'success'){
          console.log("Status: " + response.data.msg);
          history.push(`/article/${response.data.slug}`);
        } else {
          console.log("Status: " + response.data.msg);
        }
      })
      .catch((error) => {
        console.log("An error occured" + error);
      });
  };

  const saveArticle = () => {
    if(props.params === ''){
      addArticle();
    } else {
      updateArticle();
    }
  }

  const updateArticle = () => {
    let article = {
      title,
      description,
      markdown,
      id: props.params
    };
    console.log(article);
    axios
      .put(Domain + "articles/edit", article)
      .then((response) => {
        if(response.data.type === 'success'){
          console.log("Status: " + response.data.msg);
          history.push(`/article/${response.data.slug}`);
        } else {
          console.log("Status: " + response.data.msg);
        }
      })
      .catch((error) => {
        console.log("An error occured" + error);
      });
  }

  return (
    <div>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          className="form-control"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          type="text"
          className="form-control"
          id="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
        />
      </div>
      <div className="form-group">
        <label>Markdown</label>
        <textarea
          type="text"
          className="form-control"
          id="markdown"
          onChange={(e) => setMarkdown(e.target.value)}
          value={markdown}
          required
        />
      </div>
      <button className="btn btn-secondary">Cancel</button>{" "}
      <button className="btn btn-primary" onClick={saveArticle}>Save</button>
    </div>
  );
};

export default ArticleForm;
