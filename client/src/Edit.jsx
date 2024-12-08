import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { IoClose } from "react-icons/io5";
import { useLocation, useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateBlog } from './ApiCall/apiU';


function Edit() {
  const location = useLocation();
  const Blo = location.state?.Bl
  console.log("Edit blo", Blo);
  console.log("Edit blo img", Blo.image);
  const nav = useNavigate()
  const dispatch = useDispatch()
  const [btag, setbtag] = useState([])
  const [btitle, setbtitle] = useState('')
  const [bdes, setbdes] = useState('')
  const [rt, setrt] = useState(10)
  const [ImageURL, setImageURL] = useState(null)
  const [image, setimage] = useState(null)
  const [pubd, setpubd] = useState(false)
  const [picw, setpicw] = useState(Blo.image.length)

  const ud = useSelector(state => state.BcData.Data)
  console.log(ud[0]._id);

useEffect(() => {

  setbtag(Blo.btag)
  setbtitle(Blo.btitle)
  setbdes(Blo.bdes)
  setImageURL(`BannerImg/${Blo.image}`);
}, [])

const imchange = (tar) => {
  if (tar) {
      const reader = new FileReader();
      reader.onloadend = () => {
          setImageURL(reader.result);
          setimage(tar)
          
      };
      reader.readAsDataURL(tar);
  }
}

useEffect(() => {
  if (btitle.length > 0 && bdes.length > 0 ) {
      setpubd(true)
  }
  else {
      setpubd(false)
  }
}, [btitle, bdes])

const tagadd = (e) => {
  if (e.key === 'Enter') {
      if (!btag.includes(e.target.value)) {
          if (btag.length < 11) {
              var bar = [...btag]
              bar.push(e.target.value)
              setbtag(bar)
          }
      }
      e.target.value = ''
  }
  console.log("b value", btag);
}

useEffect(() => {
  setrt(10 - btag.length)
}, [btag])


const tagrem = (index) => {
  setbtag(btag.filter((_, i) => i !== index));
}

const pub = (e) => {
  e.preventDefault()
  var Fdatas = new FormData()
  Fdatas.append('btitle', btitle)
  Fdatas.append('bdes', bdes)
  Fdatas.append('btag', JSON.stringify(btag))
  Fdatas.append('buser', ud[0].email)
  Fdatas.append('buserimg', ud[0].image)
  Fdatas.append('buserFullname', ud[0].username)
  
  Fdatas.append('treads', Blo.treads)
  Fdatas.append('tlikes', Blo.tlikes)
   const now = new Date();
        const day = now.getDate();
        const month = now.toLocaleString('default', { month: 'long' }); // Get the month in long format (e.g., January)
        const formattedDay = day < 10 ? `0${day}` : day;
        const dateMonth = `${formattedDay} ${month}`;
        Fdatas.append('date', dateMonth)
  if (image) {
    Fdatas.append('image', image);
  } else {
    Fdatas.append('image', Blo.image);
  }

  UpdateBlog(Fdatas,Blo._id,nav,dispatch)
}


  
  return (
    <div>
        <div >
                <Navbar bg="dark" data-bs-theme="dark" fixed='top' className="mx-auto">
                    <Navbar.Brand href="/"> <img src="/20240616_212040.png" alt="jjj" width="40" height="40" style={{ marginLeft: '20px' }} /> </Navbar.Brand>
                    <Nav className="ms-auto">
                        <Nav.Link href="/">Dashboard</Nav.Link>
                    </Nav>
                    <div className="ms-auto">
                        <Button variant='outline-success' style={{ marginRight: '10px', borderRadius: '50px' }} disabled={!pubd} onClick={pub}>Publish</Button>
                        {/* <Button variant='outline-secondary' style={{ marginRight: '10px', borderRadius: '50px' }}>Save Darft</Button> */}
                    </div>
                </Navbar>
            </div>
<div className='ec'>
                <div className='ic'>
                    <Form encType='multipart/form-data'>
                        <Form.Group style={{ display: 'flex', justifyContent: 'center' }} controlId="formBasicEmail">
                            <Form.Control type="file" accept='.png,.jpg,.jpeg' placeholder="Insert image" filename='image' style={{ zIndex: '-1', position: 'absolute', height: '400px', opacity: '0%' }} onChange={(e) => imchange(e.target.files[0])} />
                            <h2 style={{ zIndex: '2', position: 'absolute', color: 'white', marginTop: '170px', opacity: '50%', zIndex: '1' }}>Click to Change</h2>
                            <img src={ImageURL} style={{ height: '400px', width: '100%', objectFit: 'cover', zIndex: '0' }} />
                        </Form.Group>
                    </Form>
                </div>
                <div>
                    <div>
                        <InputGroup size="lg">
                            <InputGroup.Text id="inputGroup-sizing-lg">Blog Title</InputGroup.Text>
                            <Form.Control
                                aria-label="Large"
                                aria-describedby="inputGroup-sizing-sm"
                                placeholder={btitle} value={btitle}
                                onChange={(e) => { setbtitle(e.target.value) }}
                            />
                        </InputGroup>
                    </div>
                    <div style={{ marginTop: '30px' }}>
                        <InputGroup>
                            {/* <InputGroup.Text>Lets write an awsome story</InputGroup.Text> */}
                            <Form.Control  as="textarea" aria-label="With textarea" style={{ height: '315px' }}
                                onChange={(e) => { setbdes(e.target.value) }}  placeholder={bdes} value={bdes} />
                        </InputGroup>
                    </div>
                    <h4></h4>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: "30px" }}>
                <div style={{ width: '390px' }}>
                    <InputGroup size="sm">
                        <InputGroup.Text id="inputGroup-sizing-sm">Blog Topics</InputGroup.Text>
                        <Form.Control
                            aria-label="Large"
                            aria-describedby="inputGroup-sizing-sm"
                            onKeyDown={tagadd}
                            placeholder="Add a tag and press Enter"
                            disabled={btag.length >= 10}
                        />
                    </InputGroup>
                </div>
                <div style={{ marginTop: '10px' }}>
                    <p>{rt} more tags left</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: "10px", flexWrap: 'wrap' }}>
                    {
                        btag.map((bt, index) => (
                            bt.length > 0 && (
                                <Toast key={index} style={{ width: '150px', borderRadius: '30px', margin: '5px' }} bg='dark'>
                                    <Toast.Body style={{ color: 'white' }}>
                                        <Button variant="dark" onClick={() => tagrem(index)} size="sm"><IoClose /></Button> {bt}
                                    </Toast.Body>
                                </Toast>
                            )
                        ))
                    }
                </div>
            </div>
    </div>
  )
}

export default Edit
