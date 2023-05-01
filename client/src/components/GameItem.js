import React from "react";
import { Button,Container, Row, Col, Form, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const GameItem = props => {
    return (
        <Card>
        <Card.Img variant="top" src={props.game.gameImage} />
        <Card.Body>
            <Card.Title>{props.game.gameName}</Card.Title>
            <Card.Text>${props.game.gamePrice}</Card.Text>
            <Button variant="info">View Details</Button>
        </Card.Body>
        </Card>
    )
}

export default GameItem;