import React, { useEffect, useState } from 'react'
import { Modal, FormControl, Button, Alert } from 'react-bootstrap'
import useDebounce from '../../Hooks/UseDebounce';
import UseHttpRequest from '../../Hooks/UseHttpRequest';

import './CreateModal.scss'
export default function CreateModal({ closeModal, addNewWorkspace }) {
    const [suggestDomains, setSuggestDomains] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    useEffect(
        () => {
            if (debouncedSearchTerm) {
                searchCharacters(debouncedSearchTerm)
            } else {
                setResults([]);
            }
        },
        [debouncedSearchTerm]
    );
    const searchCharacters = async (debouncedSearchTerm) => {
        const data = await UseHttpRequest({
            url: '/suggested-subDomain', method: 'POST', data: {
                subDomain: debouncedSearchTerm
            }, token: localStorage.getItem('token')
        })
        setResults(data.data);
    }

    const handleSave = async (e) => {
        if(name.trim() && debouncedSearchTerm.trim()){
            const data = await UseHttpRequest({
                url: '/workspace', method: 'POST', data: {
                    name,
                    subDomain: debouncedSearchTerm
                }, token: localStorage.getItem('token')
            })
            if (data.success) {
                addNewWorkspace(data)
                setErrorMessage('')
                closeModal()
            }else{
                setErrorMessage(data.message)
            }
        }
      
    }
    return (
        <div className='modal-container'>
            {errorMessage && <Alert variant={'danger'} className='alert'>
                {errorMessage}
            </Alert>}
            <Modal.Dialog style={{ width: '35%' }}>
                <Modal.Header >
                    <Modal.Title>Create New Workspace</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <FormControl placeholder='Input Name' onChange={(e) => setName(e.target.value)} />
                    <FormControl onChange={e => setSearchTerm(e.target.value)} placeholder='Input SubDomain' />


                    <div className='debouncing'>
                        {results.map((result, index) => (
                            <div key={index} className='debouncing-result'>
                                {result}
                            </div>
                        ))}
                    </div>

                </Modal.Body>
                {suggestDomains.map((domain, index) => {
                    <div key={index}>{domain}</div>
                })}
                <Modal.Footer style={{ marginTop: '50px' }}>
                    <Button variant="secondary" onClick={closeModal}>Cancel</Button>
                    <Button variant="primary" onClick={handleSave}>Create</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    )
}
