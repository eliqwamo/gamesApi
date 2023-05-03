import React, {useState, useEffect} from 'react';
import { Button,Container, Row, Col, Form, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GameItem from './components/GameItem';

function App() {

  const baseURL = 'http://localhost:3001/api';
  const [games, setAllGames] = useState([]);
  const [genres, setAllGenres] = useState([]);

  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedGameName, setSelectedGameName] = useState("");
  const [selectedGamePrice, setSelectedGamePrice] = useState("");
  const [selectedDescription, setSelectedDesription] = useState("");
  const [selectedGameImage, setSelectedGameImage] = useState("");

  const loadAllGames = async() => {
    const response = await fetch(baseURL + "/readAllGames", {
      method: 'GET'
    });
    const data = await response.json();
    setAllGames(data.message);
  }
  const loadGenres = async() => {
    const response = await fetch(baseURL + "/readAllGenres", {
      method: 'GET'
    });
    const data = await response.json();
    setAllGenres(data.message);
  }
  useEffect(() => {
    loadAllGames();
    loadGenres();
  },[]);

  const addNewGame = async() => {
    if(selectedGameName !== "" && selectedGamePrice !== "" && selectedGenre !== ""){


      const response = await fetch(baseURL + "/createGame", {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          genreId: selectedGenre,
          gameName: selectedGameName,
          gamePrice: selectedGamePrice,
          gameDescription: selectedDescription,
          gameImage: selectedGameImage
        })
      });

      setSelectedGameName("");

      const data = await response.json();
      toast.success(`${data.message.gameName} was created`);
      loadAllGames();
    } else {
      toast.error("Game name and price is require!!")
    }
  }




  return (
    <Container>
      <ToastContainer />

      <Row>
        <Col></Col>
      </Row>

      <Row style={{marginTop:100}}>
        <Col xl={3} xs={12}>

          <Form>

          <Form.Select onChange={(e) => {setSelectedGenre(e.target.value)}}>
            <option>Open this select menu</option>
            {
              genres.length > 0 && 
              genres.map((genre) => (
                <option value={genre._id}>{genre.genreName}</option>
              ))
            }
          </Form.Select>

          <Form.Control type="text" value={selectedGameName} 
            onChange={(e) => {setSelectedGameName(e.target.value)}} 
            placeholder="Game name" style={{marginTop:10}} />

          <Form.Control type="text" value={selectedGamePrice} 
            onChange={(e) => {setSelectedGamePrice(e.target.value)}} 
            placeholder="Game price" style={{marginTop:10}} />

          <Form.Control type="text" value={selectedDescription} 
            onChange={(e) => {setSelectedDesription(e.target.value)}} 
            placeholder="Game description" style={{marginTop:10}} />

          <Form.Control type="text" value={selectedGameImage} 
            onChange={(e) => {setSelectedGameImage(e.target.value)}} 
            placeholder="Game image url" style={{marginTop:10}} />


            <Button variant='info' onClick={addNewGame} style={{marginTop:10, width:'100%'}}>Add New Game</Button>

          </Form>

        </Col>
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
