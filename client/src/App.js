import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Form, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import GameItem from "./components/GameItem";
import axios from 'axios';

function App() {
  const baseURL = "http://localhost:3001/api";
  const [games, setAllGames] = useState([]);
  const [genres, setAllGenres] = useState([]);

  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedGameName, setSelectedGameName] = useState("");
  const [selectedGamePrice, setSelectedGamePrice] = useState("");
  const [selectedDescription, setSelectedDesription] = useState("");
  const [selectedGameImage, setSelectedGameImage] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  const loadAllGames = async () => {
    const response = await fetch(baseURL + "/readAllGames", {
      method: "GET",
    });
    const data = await response.json();
    setAllGames(data.message);
  };
  const loadGenres = async () => {
    const response = await fetch(baseURL + "/readAllGenres", {
      method: "GET",
    });
    const data = await response.json();
    setAllGenres(data.message);
  };
  useEffect(() => {
    loadAllGames();
    loadGenres();
  }, []);

  const deleteGameById = async (gid) => {
    try {
      const response = await fetch(baseURL + "/deleteGame/" + gid, {
        method: "DELETE",
      });
      const data = await response.json();
      toast.success(data.message);
      loadAllGames();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addNewGame = async () => {
    if (
      selectedGameName !== "" &&
      selectedGamePrice !== "" &&
      selectedGenre !== ""
    ) {
      const response = await fetch(baseURL + "/createGame", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          genreId: selectedGenre,
          gameName: selectedGameName,
          gamePrice: selectedGamePrice,
          gameDescription: selectedDescription,
          gameImage: selectedGameImage,
        }),
      });

      setSelectedGameName("");

      const data = await response.json();
      toast.success(`${data.message.gameName} was created`);
      loadAllGames();
    } else {
      toast.error("Game name and price is require!!");
    }
  };


  const createNewAccount = async() => {
    if(firstName !== "" && lastName !== "" && email !== "" && password !== ""){
      const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        mobile: mobile
      }
      axios.post(baseURL + '/account/createAccount',{user})
      .then(results => {
        toast.success(results.data.message.email);
      })
      .catch(error => {
        toast.error(error.response.data.message);
      })
    } else {
      toast.error("All inputs are required!!!");
    }
  }

  const login = async() => {

    if(email !== "" && password !== ""){
      const user = {
        email: email,
        password: password
      }

      axios.post(baseURL + '/account/login',{user})
      .then(results => {
        toast.success(results.data.message);
      })
      .catch(error => {
        toast.error(error.response.data.message);
      })
    } else {
      toast.error("All inputs are required!!!");
    }
  }


  return (
    <Container>
      <ToastContainer />

      <Header />

      <Row style={{ marginTop: 100 }}>
        <Col xl={3} xs={12}>
          <Form>
            <Form.Control
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              placeholder="First name"
              style={{ marginTop: 10 }}
            />

            <Form.Control
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              placeholder="Last name"
              style={{ marginTop: 10 }}
            />

            <Form.Control
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
              style={{ marginTop: 10 }}
            />

            <Form.Control
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
              style={{ marginTop: 10 }}
            />

            <Form.Control
              type="phone"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
              }}
              placeholder="Mobile"
              style={{ marginTop: 10 }}
            />

            <Button
              variant="info"
              onClick={createNewAccount}
              style={{ marginTop: 10, width: "100%" }}>
              Sign Up
            </Button>

            <Button
              variant="primary"
              onClick={login}
              style={{ marginTop: 10, width: "100%" }}>
              Login
            </Button>
          </Form>



          {/* <Form>
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

          </Form> */}
        </Col>
        <Col xl={9} xs={12}>
          <Row>
            {games.length > 0 ? (
              games.map((item) => (
                <Col xl={3}>
                  <GameItem
                    deleteGameClick={() => {
                      deleteGameById(item._id);
                    }}
                    game={item}
                    loadAllGames={loadAllGames}
                  />
                </Col>
              ))
            ) : (
              <p>NOPE</p>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
