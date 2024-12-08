import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { CldataRemove } from './Slice';
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';
import { GiFeather } from "react-icons/gi";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link} from "react-router-dom";
import { CgSearch } from "react-icons/cg";

function NavBarr() {
    const dispatch=useDispatch()
    const ud = useSelector(state => state.BcData.Data)
    // console.log("ud",ud);
    const [Search, setSearch] = useState('')

    const loo = () => {
        dispatch(CldataRemove())
        
    }
  return (
   
       <div>
         <Navbar bg="dark" data-bs-theme="dark">

         <Navbar.Brand href="/"> <img src="/20240616_212040.png" alt="jjj" width="40" height="40"  style={{ marginLeft: '20px' }} /> </Navbar.Brand>
         <div>
         <Form inline='true' style={{marginLeft:'20px'}}>
                        <div style={{display:'flex'}}>
                            <div >
                                <Form.Control type="text" style={{borderRadius:"20px"}} placeholder="Search" className=" mr-sm-2" value={Search} onChange={(e) => setSearch(e.target.value)} />
                            </div>
                            <div >
                                {Search ? (
                                    <Link to='/search' state={{ searchQuery: Search }}>
                                        <Button variant='dark' type="submit" >
                                        <CgSearch />
                                        </Button>
                                    </Link>
                                ) : (
                                    <Button type="submit"  variant='dark' disabled>
                                        <CgSearch />
                                    </Button>
                                )}

                            </div>
                        </div>
                    </Form>
         </div>

        <Container >
         
          <Nav className="ms-auto" >
            {/* <Nav.Link href="/">Dashboard</Nav.Link> */}
            <Nav.Link href="ed"><GiFeather />  Write</Nav.Link>
            
          </Nav>
        </Container>
        <Dropdown align={{ lg: 'end' }}>
                    <Dropdown.Toggle variant='dark' id="dropdown-custom-1"><Image style={{ width: '40px', height: '40px',boxShadow:'0px 0px 10px #ff6969',objectFit: 'cover' }} src={`/Images/${ud[0]?.image}`} roundedCircle /></Dropdown.Toggle>
                    <Dropdown.Menu className="super-colors">
                        <Link to={'/profile'} state={{ Ud: ud[0] }} style={{textDecoration:"none"}}>
                        <Dropdown.Item  href="/" >Profile</Dropdown.Item>
                        </Link>
                        <Link to={'/'}  style={{textDecoration:"none"}}>
                        <Dropdown.Item  href="/" >Dashboard</Dropdown.Item>
                        </Link>
                        {/* <Link to={'dr'}  style={{textDecoration:"none"}}>
                        <Dropdown.Item  href="/" >Drafts</Dropdown.Item>
                        </Link> */}
                        <Dropdown.Item href="/" style={{color:"red"}} onClick={loo}>SignOut</Dropdown.Item>

                    </Dropdown.Menu>
                </Dropdown>
      </Navbar>
     <div>
    
     </div>
    </div>
  )
}

export default NavBarr
