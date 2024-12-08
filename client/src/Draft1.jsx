import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import NavBarr from './NavBarr';
import { GetCurrUser } from './ApiCall/apiU';

function Draft1() {
    const ud = useSelector(state => state.BcData.Data)
    console.log("uuud", ud);
    const dr=useSelector(state => state.BcData.Drafts)
    console.log("dru draft", dr);


    return (
        <div>
            {/* <div>
                <NavBarr />
            </div>
            <div style={{ display: "flex", justifyContent: 'center', marginTop: "100px",flexWrap:'wrap' }}>
                {
                    dr.map((d,i) =>
                    (<div key={i}>
                        <Link to='/ed' state={{ Bl: d }} style={{ textDecoration: 'none', color: 'inherit' }} >
                            <div  style={{ width: '300px', height: "200px", marginRight: '30px',marginBottom:"40px", display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                                <h5 style={{ zIndex: '2', position: 'absolute', color: 'white', opacity: '100%', zIndex: '1', textShadow: '-1px -1px 0 black,1px -1px 0 black,-1px 1px 0 black,1px 1px 0 black' }}>{d.btitle}</h5>
                                <img src={`/BannerImg/${d.image}` || '/BannerImg/painting-mountain-lake-with-mountain-background.jpg'} style={{ height: '200px', width: '100%', objectFit: 'cover', zIndex: '0', filter: `blur(1px)`, boxShadow: '0px 0px 10px black', }} />

                            </div>
                        </Link>
                    </div>

                    ))
                }
            </div> */}
        </div>

    )
}

export default Draft1
