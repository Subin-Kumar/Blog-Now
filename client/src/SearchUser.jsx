import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import { FaUser } from "react-icons/fa";
import { GetUserAll } from './ApiCall/apiU';


function SearchUser({ searchQuery }) {
  
   
    console.log("search query",searchQuery);
    
    const AllU = useSelector(state => state.BcData.AU)
    console.log("Allu",AllU);
    const [SHoBlo, setSHoBlo] = useState([])
    const tdiv = useRef(null)
    const [linew, setlinew] = useState(0)

    const calculateLineWidth = () => {
        if (tdiv.current) {

            const newWidth = tdiv.current.offsetWidth - 20;
            setlinew(newWidth);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', calculateLineWidth);
        return () => {
            window.removeEventListener('resize', calculateLineWidth);
        };
    }, []);

    useEffect(() => {
        calculateLineWidth();
    }, [SHoBlo]);


    useEffect(() => {
      
        const filteredUsers = AllU.filter(us => us.username.toLowerCase().includes(searchQuery.toLowerCase()) || us.email.toLowerCase().includes(searchQuery.toLowerCase()));
        console.log("Filtered User:", filteredUsers);
        setSHoBlo(filteredUsers)

    }, [searchQuery])

    return (
        <div>
            <div style={{display:'flex'}}>
                <p style={{marginRight:'20px'}}><b>Users related to search</b></p><div><FaUser  /> </div>
            </div>
            {SHoBlo.length > 0?(
                SHoBlo.map((us, index) => (
                    <Link to='/profile' state={{ Ud: us }} style={{ textDecoration: 'none', color: 'inherit' }} >
                        <div ref={tdiv} key={index} style={{ marginBottom: '20px', marginTop: '10px' }}>
                            <div style={{ display: 'flex' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <h1 className='Trtr'>{index < 10 ? '0' + (index + 1) : index + 1}</h1>
                                </div>
                                <div style={{ marginLeft: "10px" }}>
                                    <div style={{ display: 'flex', }}>
                                        <Image style={{ width: '40px', height: '40px', marginRight: '20px',marginTop:'15px' }} src={`/Images/${us.image}`} roundedCircle />
                                        <div style={{display: 'flex', flexDirection:"column" }}>
                                        <div>
                                            <p><b>{us.username}</b></p>
                                        </div>
                                        <div >
                                            <p><b>@ {us.email}</b></p>
                                        </div>
                                        </div>
                                        
                                    </div>
                                   
                                </div>

                            </div>
                            <hr style={{ width: `${linew}px` }} />

                        </div>

                    </Link>

                ))
              ):(
                <div style={{display:'flex',justifyContent:"center"}}><p>No User found.</p></div>
            )}
        </div>
    )
}

export default SearchUser
