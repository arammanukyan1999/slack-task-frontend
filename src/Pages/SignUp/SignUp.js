import React, { useEffect, useState } from 'react'
import { Button, Form,Alert } from 'react-bootstrap'
import { useHistory } from 'react-router'
import UseHttpRequest from '../../Hooks/UseHttpRequest'
import './SignUp.scss'
export default function SignUp() {
    const [message, setMessage] = useState('')
    const [success, setSuccess] = useState(false)
    const history = useHistory()
    useEffect(() => {
        if(localStorage.getItem('token')){
            history.push('/')
        }
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target[0]?.value
        const fullName = e.target[1]?.value
        const password = e.target[2]?.value
        const confirmPassword = e.target[3]?.value
        const user = {
            email,
            fullName,
            password
        }
        if (password === confirmPassword) {
            const data = await UseHttpRequest({ url: '/signup', method: 'POST', data: user })
            if(data.success) setSuccess(true)
            setMessage(data?.message)

        }
    }
    return (
        <div className='signUp'>
            {message && <Alert variant={!success ? 'danger' : 'success'} className='alert'>
                {message}
            </Alert>
            }
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control required type="text" placeholder="Enter Your Name" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control required type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}
