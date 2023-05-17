import React from "react";
import { Button, Container, Row, Col, Form, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


const Dashboard = props => {
    return(

        <>
        <p>Dashboard</p>
        <Button variant="danger" onClick={() => {localStorage.removeItem("token")}}>Logout</Button>
        </>
    )
}

export default Dashboard;