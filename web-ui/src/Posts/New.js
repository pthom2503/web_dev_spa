import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import { create_post, fetch_posts } from '../api';

export default function PostsNew() {
  let history = useHistory();
  let [post, setPost] = useState({"date": new Date()});

  function submit(ev) {
    ev.preventDefault();
    create_post(post).then((resp) => {
      if (resp["errors"]) {
        console.log("errors", resp.errors);
      }
      else {
        history.push("/");
        fetch_posts();
      }
    });
  }

  function updateDescription(ev) {
    let p1 = Object.assign({}, post);
    p1["description"] = ev.target.value;
    setPost(p1);
  }

  function updateName(ev) {
    let p1 = Object.assign({}, post);
    p1["name"] = ev.target.value;
    setPost(p1);
  }

  function updateDate(ev) {
    console.log(ev);
    let p1 = Object.assign({}, post);
    p1["date"] = ev;
    setPost(p1);
  }

  return (
    <Row>
      <Col>
        <h2>New Post</h2>
	<div>Date</div>
	<DateTimePicker onChange={(ev) => updateDate(ev)} value={post.date} />
        <Form onSubmit={submit}>
	  <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control as="textarea"
                          rows={1}
                          onChange={updateName}
                          value={post.name} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea"
                          rows={4}
                          onChange={updateDescription}
                          value={post.description} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Create Event!
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
