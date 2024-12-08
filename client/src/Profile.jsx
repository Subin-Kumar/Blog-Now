import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Image from 'react-bootstrap/Image';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBarr from './NavBarr';
import { useDispatch, useSelector } from 'react-redux';
import { DelAcc } from './ApiCall/apiU';

function Profile() {
    const [Tre, setTre] = useState('')
    const [Tbl, setbl] = useState('')
    const AB = useSelector(state => state.BcData.AB)
    const Cu = useSelector(state => state.BcData.Data)
    console.log("Allblogs",AB);
    const nav=useNavigate()
    const dispatch=useDispatch()

    const location = useLocation();
    const UsDe = location.state?.Ud
    console.log("usde name",UsDe);
    console.log("cu name",Cu);
    useEffect(() => {
        const UserBlogs = AB.filter(ab => ab.userFullname===UsDe.username );
        console.log("UseerBlogs:", UserBlogs);
        var tb=UserBlogs.length
        var tr=0

        UserBlogs.map((ubl)=>{
            tr+=ubl.treads
        })
        console.log("tot like",tb,tr);
        setTre(tr.toLocaleString())
        setbl(tb.toLocaleString())
    }, [AB])

    const del=()=>{
        console.log("usdddddde",UsDe);
        DelAcc(UsDe._id,nav,dispatch)


    }
    
  return (
    <div>
      

      <div >
        <div>
            <NavBarr/>
        </div>
      <div style={{display:'flex',flexDirection:'column',alignItems:"center",marginTop:"100px"}}>
                
                <Image  style={{width:'200px',height:'200px'}} src={`/Images/${UsDe.image}`} roundedCircle />
                <h5 style={{color:'red'}}>{UsDe.email}</h5>
                <h2>{UsDe.username}</h2>
             
            </div>
            <div style={{display:'flex',justifyContent:"center"}}>
            <div >
                    <b> {Tbl} Blogs</b>
                    
                </div>
                <div style={{marginLeft:'9px'}}>
                    <b>- {Tre} Reads</b>
                </div>
              
            </div>
            <div style={{display:'flex',justifyContent:"center",marginTop:'10px'}}>
                {
                    UsDe.username==Cu[0]?.username?(
                        <div>
                          
                            <Button style={{borderRadius:'30px'}} variant="outline-warning">Edit Profile</Button>{' '}
                            <Button style={{borderRadius:'30px'}} onClick={()=>del(UsDe)} variant="outline-danger">Delete Profile</Button>{' '}
                        </div>
                    ):(<div></div>)
                }
            </div>
        
       
      </div>
    </div>
  )
}

export default Profile
