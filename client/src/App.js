import React, {useState, useEffect} from 'react';
import { Button,Container, Row, Col, Form, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GameItem from './components/GameItem';

function App() {

  const baseURL = 'http://localhost:3001/api';

  const [games, setAllGames] = useState([]);

  const loadAllGames = async() => {
    const response = await fetch(baseURL + "/readAllGames", {
      method: 'GET'
    });
    const data = await response.json();
    setAllGames(data.message);
  }

  useEffect(() => {
    loadAllGames();
  },[]);

  return (
    <Container>
      <ToastContainer />

      <Row>
        <Col></Col>
      </Row>

      <Row style={{marginTop:100}}>
        <Col xl={3} xs={12}></Col>
        <Col xl={9} xs={12}>
          <Row>
          {
            games.length > 0 ? 

              games.map((item) => (
                <Col xl={3}>
                  <GameItem game={item} />
                </Col>
              ))
            : 
            <p>NOPE</p>
          }
          </Row>
        </Col>
      </Row>

    </Container>
  );
}

export default App;
