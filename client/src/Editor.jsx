import React, { useEffect, useRef, useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Toast from 'react-bootstrap/Toast';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { IoClose } from "react-icons/io5";
import { Adddraft, CreateBlog, RemDraft } from './ApiCall/apiU';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Cldru } from './Slice';


function Editor() {

    const imgRef = useRef(null);
    const [imgWidth, setImgWidth] = useState('100%px');
    console.log("dimg width",imgWidth);
    
    const [image, setimage] = useState(null)
    const [btitle, setbtitle] = useState('')
    const [bdes, setbdes] = useState('')
    const [rt, setrt] = useState(10)
    const [btag, setbtag] = useState([])
    const [blur, setblur] = useState(2)
    const [ImageURL, setImageURL] = useState(null)
    const [pubd, setpubd] = useState(false)
    // const [Drafr, setDrafr] = useState(false)
    const ud = useSelector(state => state.BcData.Data)
    // console.log(ud[0]._id);

    // const location = useLocation();
    // const Blo = location.state?.Bl

    const dispatch = useDispatch()
    const nav=useNavigate()

    // console.log("data ", image);
    const imchange = (tar) => {
        if (tar) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageURL(reader.result);
                setimage(tar)
                setblur(0)
            };
            reader.readAsDataURL(tar);
        }
    }
    const handleImageLoad = () => {
        if (imgRef.current) {
            setImgWidth(imgRef.current.offsetWidth + 'px'); // Get the width of the image
        }
    };
    useEffect(() => {
        if (btitle.length > 0 && bdes.length > 0) {
            setpubd(true)
        }
        else {
            setpubd(false)
        }
    }, [btitle, bdes, image])
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

    const pub = async (e) => {
        e.preventDefault()
        var Fdatas = new FormData()
        Fdatas.append('btitle', btitle)
        Fdatas.append('bdes', bdes)
        // Fdatas.append('image', image)
        Fdatas.append('btag', JSON.stringify(btag))
        Fdatas.append('buser', ud[0].email)
        Fdatas.append('buserimg', ud[0].image)
        Fdatas.append('buserFullname', ud[0].username)
        Fdatas.append('treads', 0)
        Fdatas.append('tlikes', 0)
        Fdatas.append('tcomments', 0)
        Fdatas.append('tparentcomments', 0)
        if (image) {
            Fdatas.append('image', image);
        } else {
            // Fdatas.append('image', Blo.image);
        }
        const now = new Date();
        const day = now.getDate();
        const month = now.toLocaleString('default', { month: 'long' }); 
        const formattedDay = day < 10 ? `0${day}` : day;
        const dateMonth = `${formattedDay} ${month}`;
        Fdatas.append('date', dateMonth)
        await CreateBlog(Fdatas,nav)
        // if (Drafr) {
        //     await RemDraft(btitle, ud[0]._id, dispatch)
        // }

    }

    // const dra = async (e) => {
    //     e.preventDefault();
    //     const ddata = new FormData();
    //     ddata.append('btitle', btitle);
    //     ddata.append('bdes', bdes);
    //     ddata.append('image', image);
    //     ddata.append('btag', JSON.stringify(btag));

    //     await Adddraft(ddata, ud[0]._id, dispatch);
    // }

    // useEffect(() => {
    //     if (Blo) {
    //         console.log("Blo from draft", Blo);
    //         setbtitle(Blo.btitle)
    //         setbdes(Blo.bdes)
    //         setImageURL(`/BannerImg/${Blo.image}`)
    //         setbtag(Blo.btag)
    //         setblur(0)
    //         // setDrafr(true)
    //         console.log("dataaaaaa-=-=-", btitle, bdes, ImageURL, btag);
    //     }
    // }, [Blo])



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
                        {/* <Button variant='outline-secondary' style={{ marginRight: '10px', borderRadius: '50px' }} onClick={dra}>Save Darft</Button> */}
                    </div>
                </Navbar>
            </div>
            <div className='ec'>
                <div className='ic'>
                    <Form encType='multipart/form-data'>
                        <Form.Group style={{ display: 'flex', justifyContent: 'center' }} controlId="formBasicEmail">
                            <Form.Control type="file" accept='.png,.jpg,.jpeg' placeholder="Insert image" filename='image' style={{ zIndex: '2', position: 'absolute', height: '400px', width: `${imgWidth}`,  opacity: '0%' }} onChange={(e) => imchange(e.target.files[0])} />
                            <h2 style={{ zIndex: '2', position: 'absolute', color: 'white', marginTop: '170px', opacity: '50%', zIndex: '1' }}>Click to Add</h2>
                            <img  ref={imgRef}  onLoad={handleImageLoad} src={ImageURL || '/791a3f6f965cffe40b61361d2b3714d0.jpg'} style={{ height: '400px', width: 'imgWidth', objectFit: 'cover', zIndex: '0', filter: `blur(${blur}px)` }} />
                        </Form.Group>
                    </Form>
                </div>
                {/* style={{position:'absolute',zIndex:'5'}} */}
                <div >
                    <div>
                        <InputGroup size="lg">
                            <InputGroup.Text id="inputGroup-sizing-lg">Blog Title</InputGroup.Text>
                            <Form.Control
                                aria-label="Large"
                                aria-describedby="inputGroup-sizing-sm"
                                value={btitle}
                                onChange={(e) => { setbtitle(e.target.value) }}
                            />
                        </InputGroup>
                    </div>
                    <div style={{ marginTop: '30px' }}>
                        <InputGroup>
                            {/* <InputGroup.Text>Lets write an awsome story</InputGroup.Text> */}
                            <Form.Control placeholder='Lets write your amazing story...' as="textarea" aria-label="With textarea" style={{ height: '315px',resize:"none",overflow:'auto' }}
                                value={bdes} onChange={(e) => { setbdes(e.target.value) }} />
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

export default Editor
