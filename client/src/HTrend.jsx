import React, { useEffect, useRef, useState } from 'react'
import { GetBlogTrend } from './ApiCall/apiU'
import { useDispatch, useSelector } from 'react-redux'
import { FaArrowTrendUp } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
// import Button from 'react-bootstrap/Button';


function HTrend({ onValuesChange }) {
  const dispatch = useDispatch()
  const tdiv = useRef(null)
  const [linew, setlinew] = useState(0)


  useEffect(() => {
    GetBlogTrend(dispatch)
  }, [])

  var TrB = useSelector(state => state.BcData.TB)
 
  

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
  }, [TrB]);


  return (
    <div>
      <div style={{ marginLeft: '5px' }}>

        <p><b> Trending <FaArrowTrendUp /></b></p>
        {
          TrB.map((tb, index) => (
            <Link to='/Bp' state={{ Bl: tb }} style={{ textDecoration: 'none', color: 'inherit' }} >
              <div ref={tdiv} key={index} style={{ marginBottom: '20px', marginTop: '10px' }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h1 className='Trtr'>{index < 10 ? '0' + (index + 1) : index + 1}</h1>
                  </div>
                  <div style={{ marginLeft: "10px" }}>
                    <div style={{ display: 'flex', height: '25px' }}>
                      <Image style={{ width: '20px', height: '20px', marginRight: '10px' }} src={`/Images/${tb.userimage}`} roundedCircle />
                      <div style={{ display: 'flex' }}>
                        <p><b>{tb.userFullname}</b></p>
                        <p style={{ marginLeft: '10px' }}> on {tb.date}</p>
                      </div>
                    </div>
                    <div style={{ marginLeft: "10px" }}>
                      <h2 style={{ fontSize: '30px' }}>{tb.btitle}</h2>
                    </div>
                  </div>

                </div>
                <hr style={{ width: `${linew}px` }} />

              </div>

            </Link>

          ))
        }


      </div>

    </div>
  )
}

export default HTrend
