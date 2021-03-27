import { Row, Col, Card, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


function Post({post}) {
  return (
    <tr>
      <td>{post.name}</td>
      <td>{post.user.name}</td>
      <td>{post.date}</td>
      <td>{post.description}</td>
      <td>
	<Link to="/events/edit">
	  Edit
	</Link>
      </td>
    </tr>
  );
}

function Feed({posts}) {
  let cards = posts.map((post) => <Post post={post} key={post.id} />);
  return (
    <div>
      <Row>
        <Col>
	  <h2> List Events </h2>
	  <p>
            <Link to="/posts/new">
	      New Event
	    </Link>
	  </p>
	</Col>
	<Table striped bordered>
         <thead>
           <tr>
             <th>Name</th>
             <th>Owner</th>
             <th>Date</th>
             <th>Description</th>
           </tr>
         </thead>
         <tbody>
	  { cards }
         </tbody>
       </Table>
      </Row>
    </div>
  );
}

export default connect(({posts}) => ({posts}))(Feed);
