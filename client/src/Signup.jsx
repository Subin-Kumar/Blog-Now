import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { Signin } from './ApiCall/apiU';

function Signup() {

  const [username, setusername] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [image, setimage] = useState({})
  const nav = useNavigate()

  const disp = (e) => {
    e.preventDefault()
    var FormDatas = new FormData()
    FormDatas.append('username', username)
    FormDatas.append('email', email)
    FormDatas.append('image', image)
    FormDatas.append('password', password)
    FormDatas.append('drafts', [])

    // console.log(FormDatas);
    console.log("formdatas==", username, email, password);

    // Signin({username,email,password,image})
    Signin(FormDatas)
    nav('/')
  }

  return (
    <div>
      <div className='Lo'>

        <div className='Lout'>


          <div className='Til'>
            <h5 >SignUp</h5>
          </div>

          <Form onSubmit={disp} encType='multipart/form-data'>

            <Form.Group style={{ paddingBottom: '20px' }} controlId="formBasicEmail">
              <Form.Label style={{ color: 'white' }}>UserName</Form.Label>
              <Form.Control type="text" placeholder="Enter UserName" value={username} onChange={(e) => setusername(e.target.value)} />
            </Form.Group>

            <Form.Group style={{ paddingBottom: '20px' }} controlId="formBasicEmail">
              <Form.Label style={{ color: 'white' }}>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setemail(e.target.value)} />
            </Form.Group>


            <Form.Group style={{ paddingBottom: '20px' }} controlId="formBasicEmail">
              <Form.Label style={{ color: 'white' }}>Image</Form.Label>
              <Form.Control type="file" accept='.png,.jpg,.jpeg' placeholder="Insert image" filename='image' onChange={(e) => setimage(e.target.files[0])} />
            </Form.Group>

            <Form.Group style={{ paddingBottom: '20px' }} controlId="formBasicPassword">
              <Form.Label style={{ color: 'white' }}>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setpassword(e.target.value)} />
            </Form.Group>
            <div style={{ display: 'flex', paddingBottom: '20px' }}>
              <div className='but'>
                <Button variant="outline-success" type="submit">
                  Submit
                </Button>
              </div>
              <div className='but'>
                <Link to={'/'}><Button variant='outline-warning'>I have an Account</Button></Link>
              </div>
            </div>
          </Form>
        </div>

      </div>
    </div>
  )
}

export default Signup
