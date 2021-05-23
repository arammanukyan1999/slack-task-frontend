import React, { useEffect, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router'
import UseHttpRequest from '../../Hooks/UseHttpRequest'
import './SignIn.scss'
export default function SignIn() {
    const [message, setMessage] = useState('')
    const history = useHistory()
    useEffect(() => {
        if (localStorage.getItem('token')) {
            history.push('/')
        }
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target[0]?.value
        const password = e.target[1]?.value
        const user = {
            email,
            password
        }
        const data = await UseHttpRequest({ url: '/signin', method: 'POST', data: user })
        if (!data.success) {
            setMessage(data.message)
        } else {
            history.push('/')
            localStorage.setItem('token', data.token)
        }
    }
    return (
        <div className='signIn' >
            {message && <Alert variant={'danger'} className='alert'>
                {message}
            </Alert>
            }
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                 </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
            </Button>
            </Form>
        </div>
    )
}
