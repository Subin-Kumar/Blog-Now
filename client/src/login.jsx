import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import './cli.css'
import { LoginF } from './ApiCall/apiU';
import { useDispatch } from 'react-redux';
import { CldataRemove } from './Slice';



function Login() {

    const [emaillog, setemaillog] = useState('')
    const [passwordlog, setpasswordlog] = useState('')
    const dispatch = useDispatch()

    const logg = () => {
        console.log("log details", emaillog, passwordlog);
        LoginF(dispatch, { emaillog, passwordlog })
    }

    const loo = () => {
        dispatch(CldataRemove())
        
    }

    return (

        <div className='Lo'>
            {/* <div className='imaL'>
                <img src="Images/SS2.png" alt="" />
            </div> */}
            <div className='Lout'>
                <div className='Til'>
                <img src="/20240616_212040.png" alt="jjj" width="60" height="60" className="d-inline-block align-top" style={{ marginRight: '20px', marginLeft: '20px',marginBottom:'5px' }} /> 
                    <h5 >Sign in</h5>
                </div>
                <div className='eml'>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><MdEmail /></InputGroup.Text>
                        <Form.Control
                            placeholder="Email id"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value={emaillog} onChange={(e) => setemaillog(e.target.value)}
                        />
                    </InputGroup>
                </div>
                <div className='eml'>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><RiLockPasswordFill /></InputGroup.Text>
                        <Form.Control
                            placeholder="Password"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value={passwordlog} onChange={(e) => setpasswordlog(e.target.value)}
                        />
                    </InputGroup>

                </div>
                <div className='ForP'><Link to={'Fpass'} style={{ textDecoration: 'none', color: '#ff6969', marginBottom: '30px' }}>Forgot Password...?</Link></div>
                <div className='but'>
                    <Button variant='outline-success' onClick={logg}>Login</Button>
                </div>
                 <div className='log'>
                    <Button variant='danger' onClick={loo}>Clear Slice</Button>
                </div> 

                <div className='but'>

                    <Link to={'sign'} style={{ textDecoration: 'none' }}><Button variant='outline-info' >Join us now</Button></Link>
                </div>
            </div>
        </div>

    )
}

export default Login
