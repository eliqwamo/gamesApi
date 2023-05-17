import React, {useState, useEffect} from "react";
import { Button, Container, Row, Col, Form, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

const Login = props => {

    const baseURL = "http://localhost:3001/api";

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [loginView, setLoginView] = useState(true);


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







    return(
        
        <>
        
        <Container>
            <ToastContainer />
            <Row>
                <Col xl={4}></Col>
                <Col xl={4} style={{
                    marginTop:100, 
                    padding:50, textAlign:'center',
                    backgroundColor:'#ffffff', borderRadius:20}}>


                    <img src="../../logo.png" style={{width:200}} />


                    {
                        loginView ? 
                        (
                    <>
                        <h3 style={{marginTop:15}}>Welcome Aboard</h3>
                        <p>Type your email and password to login</p>
                        <Form>
                            <Form.Group>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
                            </Form.Group>

                            <Button variant="primary" style={{width:'100%', marginTop:15}} onClick={login}>Sign In</Button>
                        </Form>
                        <Button style={{marginTop:12}} variant="light" onClick={() => {setLoginView(!loginView)}}>Don't have an account? Signup Now!</Button>
                    </>
                        ) 
                        : 
                        (
                    <>
                        <h3 style={{marginTop:15}}>Create New Account</h3>
                        <p>Type your first and last name, mobile, email and password to sign up</p>
                        <Form>
                            <Form.Group>
                                <Form.Label>First name</Form.Label>
                                <Form.Control type="text" value={firstName} onChange={(e) => {setFirstName(e.target.value)}} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Last name</Form.Label>
                                <Form.Control type="text" value={lastName} onChange={(e) => {setLastName(e.target.value)}} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Mobile</Form.Label>
                                <Form.Control type="text" value={mobile} onChange={(e) => {setMobile(e.target.value)}} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
                            </Form.Group>

                            <Button variant="primary" style={{width:'100%', marginTop:15}} onClick={createNewAccount}>Sign Up</Button>
                        </Form>
                        <Button style={{marginTop:12}} variant="light" onClick={() => {setLoginView(!loginView)}}>Back to login</Button>
                    </>
                        )
                    }

                    

                </Col>
                <Col xl={4}></Col>
            </Row>
        </Container>
        
        </>

    )
}

export default Login;