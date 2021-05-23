import React, { useEffect, useState } from 'react'
import { Button, Alert } from 'react-bootstrap'
import { Table } from 'react-bootstrap'
import { useHistory } from 'react-router'
import CreateModal from '../../Components/CreateModal/CreateModal'
import UseHttpRequest from '../../Hooks/UseHttpRequest'
import './Dashboard.scss'
export default function Dashboard() {
    const [workspaces, setWorkspaces] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [createModal, setCreateModal] = useState(false)
    const history = useHistory()
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const data = await UseHttpRequest({ url: '/workspace', method: 'GET', token: localStorage.getItem('token') })
        setWorkspaces(data)
    }

    const onDelete = async (id, index) => {
        const data = await UseHttpRequest({ url: `/workspace/${id}`, method: 'DELETE', token: localStorage.getItem('token') })
        if (data.success) {
            let tmp = JSON.parse(JSON.stringify(workspaces))
            tmp.splice(index, 1)
            setWorkspaces(tmp)
        }

    }

    const handleCreate = (workspace) => {
        let tmp = JSON.parse(JSON.stringify(workspaces))
        tmp.push(workspace.data)
        setWorkspaces(tmp)
    }
    const logOut = () => {
        localStorage.removeItem('token')
        history.push('/signin')
    }

    return (
        <div className='dashboard-container'>
            {errorMessage && <Alert variant={'danger'} className='alert'>
                {errorMessage}
            </Alert>}
            {createModal && <CreateModal closeModal={() => setCreateModal(false)} addNewWorkspace={handleCreate} />}
            <div className='dashboard-container-button'><Button onClick={() => setCreateModal(true)}>Create</Button></div>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Workspace</th>
                        <th>Url</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {workspaces?.map((workspace, index) =>
                    (<tr key={index}>
                        <td>{index + 1}</td>
                        <td>{workspace.name}</td>
                        <td>{workspace.subDomain}</td>
                        <td><Button variant='danger' onClick={() => onDelete(workspace.id, index)}>Delete</Button></td>
                    </tr>)
                    )}


                </tbody>
            </Table>
            <div className='dashboard-container-button'><Button onClick={logOut}>LogOut</Button></div>

        </div>
    )
}
