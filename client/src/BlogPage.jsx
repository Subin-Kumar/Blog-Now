import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NavBarr from './NavBarr';
import { useDispatch, useSelector } from 'react-redux';
import { AddComment, AddL, AddLP, AddR, DelBlog, RemLP } from './ApiCall/apiU';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { MdEdit } from "react-icons/md";
import { FaHeart, FaComment } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';




function BlogPage() {

  var AllB = useSelector(state => state.BcData.AB)
  const ud = useSelector(state => state.BcData.Data)
  const [clf, setclf] = useState(false)
  const [LikVar, setLikVar] = useState('light')
  console.log("udd", ud);
  const [Blog, setBlog] = useState()
  const location = useLocation();
  const Blo = location.state?.Bl
  console.log("check", Blo);
  const dispatch = useDispatch()
  const nav = useNavigate()
const [CurB, setCurB] = useState(AllB.filter(b=>b._id==Blo._id))
  const [SHoBlo, setSHoBlo] = useState([])
  const [Hico, setHico] = useState(false)
  const [commentsN, setcommentsN] = useState('')
  const [commentsA, setCommentsA] = useState(CurB.comments || [])
  useEffect(() => {
    if (Blo) {
      setBlog(Blo);
      // console.log("blocom",Blo.commentsN[0].comment);
      const filteredBlogs = AllB.filter(blog => blog.btag.includes(Blo.btag[0]) && blog.btitle != Blo.btitle);
      console.log("Filtered Blogs:", filteredBlogs);
      if (ud[0].likedpost.includes(Blo._id)) {
        setLikVar('danger')
      }
      setSHoBlo(filteredBlogs)
    
    }
    

  }, [Blo])

  console.log("image", Blo.image);

  useEffect(() => {
    if (Blog) {
      const AddRead = () => {
        console.log("Blo", Blog._id);
        var tre = Blog.treads + 1;
        console.log("traeds", Blog.treads, tre);
        AddR(tre, Blog._id, dispatch);
      }
      AddRead();
    }


  }, [Blog, dispatch]);

  const del = () => {
    console.log("Delete id", Blo._id);
    DelBlog(Blo._id, nav, dispatch)

  }
  const lik = () => {

    if (ud[0].likedpost.includes(Blog._id)) {
      var tl = Blog.tlikes - 1;
      console.log("likes", Blog.tlikes, tl);
      AddL(tl, Blog._id, dispatch);
      RemLP(Blog._id, ud[0]._id, dispatch);


    }
    else {
      console.log("Blo", Blog._id);
      var tl = Blog.tlikes + 1;
      console.log("likes", Blog.tlikes, tl);
      AddL(tl, Blog._id, dispatch);
      AddLP(Blog._id, ud[0]._id, dispatch);
      // setclf(clf == false ? true : false)
    }

  }

  useEffect(() => {
    console.log("entered  useeffect", ud[0].likedpost);


    if (ud[0].likedpost.includes(Blo._id)) {
      console.log("changed color to danger");

      setLikVar('danger')
      setclf(true)
    }
    else if (!ud[0].likedpost.includes(Blo._id)) {
      console.log("changed color to light");
      setLikVar('light')
    }

  }, [ud])

  const AddCom =() => {
    console.log("id comments", Blog._id, commentsN);
    AddComment(Blog._id, commentsN, dispatch);
    
    window.location.reload()
  
  
  }







  return (
    <div >
      <div>
        <NavBarr />
      </div>
      <div className='HbContainer'>
        <div className='HbMain'>

          <div style={{ marginTop: '60px', display: "flex", justifyContent: 'center' }}>
            <Image style={{ height: '400px', width: '60%', objectFit: 'cover', objectPosition: 'center' }} src={`/BannerImg/${Blo.image}`} rounded />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <h2>{Blo.btitle}</h2>
          </div>
          <div>
            <div className='Bnp' style={{ display: 'flex', justifyContent: 'space-between', marginLeft: "350px", marginRight: '350px' }}>
              <div style={{ display: 'flex' }}>
                <Image style={{ width: '20px', height: '20px', marginRight: '10px' }} src={`/Images/${Blo.userimage}`} roundedCircle />
                <p><b>{Blo.userFullname}</b></p>
              </div>
              <div>
                <p style={{ marginLeft: '10px' }}> Published on <b>{Blo.date}</b> </p>
              </div>

            </div>

          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ marginTop: '20px' }}>
              <h4>{Blo.bdes}</h4>

            </div>
          </div >
          <div className='ButBlo' style={{ display: 'flex', justifyContent: 'space-between', marginLeft: "350px", marginRight: '350px' }}>
            <div>
              <Button className='Lbut' style={{borderRadius:'30px'}} onClick={lik} type="submit" variant={LikVar} >
                <FaHeart />
              </Button>
              <Button style={{borderRadius:'30px'}} onClick={() => setHico(Hico ? false : true)} type="submit" variant='light' >
                <FaComment />
              </Button>
            </div>
            <div>
              <Link to='/edit' state={{ Bl: Blo }} style={{ textDecoration: 'none', color: 'inherit' }} >

                <Button style={{borderRadius:'30px'}} className='Lbut' type="submit" variant='light' >
                  <MdEdit />
                </Button>
              </Link>
              <Button style={{borderRadius:'30px'}} type="submit" variant='light' onClick={del}>
                <FaTrash />
              </Button>

            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '30px' }}>

            <div style={{ display: 'flex', justifyContent: 'center', }}>
              {SHoBlo.length > 0 ? (
                SHoBlo.map((ab, index) => (

                  <div key={index} style={{ padding: '30px', paddingTop: "5px", display: "flex", flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                      <h6>SimilarBlogs</h6>
                    </div>
                    <div >
                      <Link to='/Bp' state={{ Bl: ab }} style={{ textDecoration: 'none', color: 'inherit' }} >
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                          <div style={{ display: 'flex' }}>
                            <Image style={{ width: '20px', height: '20px', marginRight: '10px' }} src={`/Images/${ab.userimage}`} roundedCircle />
                            <p><b>{ab.userFullname}</b></p>
                            <p style={{ marginLeft: '10px' }}> on {ab.date}</p>
                          </div>
                          <div>
                            <h3>{ab.btitle}</h3>
                          </div>
                          <div><p>Author: {ab.user}</p></div>
                          <div>
                            <h6 className='descr'>{ab.bdes}</h6>
                          </div>
                        </div>
                      </Link>

                      {/* <hr style={{ position: 'relative', width: `${linew}px` }} /> */}

                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Image style={{ width: '80px', height: '40px', boxShadow: '0px 0px 10px black', objectPosition: 'center' }} src={`/BannerImg/${ab.image}`} rounded />
                    </div>

                  </div>
                ))
              ) : (
                <div style={{ display: 'flex', justifyContent: "center" }}><p></p></div>
              )}
            </div>
          </div>

        </div>

        {Hico && (
          <div className='Comments' >
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type="submit" variant='light' onClick={() => setHico(false)}>
                <IoClose />
              </Button>

            </div>

            <div style={{ margin: '10px' }}>
              <h5>Comments</h5>
              <InputGroup>
                {/* <InputGroup.Text>Lets write an awsome story</InputGroup.Text> */}
                <Form.Control placeholder='Leave a comment' as="textarea" aria-label="With textarea" style={{ height: '200px', width: '100%', resize: "none", overflow: 'auto' }}
                  value={commentsN} onChange={(e) => { setcommentsN(e.target.value) }} />
              </InputGroup>
              <Button type="submit" variant='dark' style={{ marginTop: "10px", borderRadius: '30px' }} onClick={AddCom}>
                Comment
              </Button>

              <div style={{display:'flex',flexDirection:'column'}}>
                { commentsA.map((c) => (
                  <div>
                  {c.comment}
                  </div>))}
              </div>
            </div>
          </div>
        )}


      </div>


    </div>
  )
}

export default BlogPage
