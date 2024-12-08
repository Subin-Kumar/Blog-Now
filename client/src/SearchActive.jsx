import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import Image from 'react-bootstrap/Image';
import { FaHeart, FaComment } from "react-icons/fa";
import { Link } from 'react-router-dom';


function SearchActive({ searchQuery }) {
    var AllB = useSelector(state => state.BcData.AB)

    const [SHoBlo, setSHoBlo] = useState([])
    const bdiv = useRef(null)
    const idiv = useRef(null)
    const divRef = useRef(null);
    const [linew, setlinew] = useState(0)




    useEffect(() => {

        const filteredBlogs = AllB.filter(blog => blog.btag.includes(searchQuery));
        console.log("Filtered Blogs:", filteredBlogs);

        setSHoBlo(filteredBlogs)



    }, [searchQuery])

    useEffect(() => {
        updateMaxHeight();
        window.addEventListener('resize', updateMaxHeight);
        window.addEventListener('resize', calculateLineWidth);
        return () => {
            window.removeEventListener('resize', calculateLineWidth);
            window.removeEventListener('resize', updateMaxHeight);
        };
    }, []);


    useEffect(() => {
        console.log("calc lw()");
        calculateLineWidth();
        // setSHoBlo(AllB)
    }, [SHoBlo]);

    const calculateLineWidth = () => {
        console.log("enterd lw()");

        if (bdiv.current && idiv.current) {
            // console.log("bdiv idiv" ,bdiv.current.offsetWidth,idiv.current.offsetWidth);
            const newWidth = bdiv.current.offsetWidth - idiv.current.offsetWidth - 20;

            setlinew(newWidth);
            console.log("linew",linew);
        }
    };

    const updateMaxHeight = () => {
        if (divRef.current) {
            const screenHeight = window.innerHeight;
            const divTopOffset = divRef.current.offsetTop;
            const newMaxHeight = screenHeight - divTopOffset - 20;
            divRef.current.style.maxHeight = `${newMaxHeight}px`;
        }
    };



    return (
        <div>
            <div className="blogs-container">


                <div className="scrollable-div" ref={divRef}>
                    {SHoBlo.length > 0?(
                        SHoBlo.map((ab, index) => (

                            <div ref={bdiv} key={index} className="blog-entry">

                                <div className="blog-content">
                                    <Link to='/Bp' state={{ Bl: ab }} style={{ textDecoration: 'none', color: 'inherit' }} >
                                        <div style={{ display: 'flex' }}>
                                            <Image style={{ width: '20px', height: '20px', marginRight: '10px' }} src={`/Images/${ab.userimage}`} roundedCircle />
                                            <p><b>{ab.userFullname}</b></p>
                                            <p style={{ marginLeft: '10px' }}> on {ab.date}</p>
                                        </div>
                                        <h3>{ab.btitle}</h3>
                                        <p>Author: {ab.user}</p>
                                        <h6 className='descr'>{ab.bdes}</h6>
                                        <div className="tags-container">

                                            <div className='tag'>
                                                {ab.btag[0]}
                                            </div>
                                            <div style={{ display: 'flex', marginTop: "5px", marginLeft: '5px' }}>
                                                <div style={{ marginRight: '25px' }}>
                                                    <FaHeart /> {ab.tlikes}
                                                </div>
                                                <div>
                                                    <FaComment /> {ab.tcomments}
                                                </div>
                                            </div>
                                        </div>

                                    </Link>

                                    <hr style={{ position: 'relative', width: `${linew}px` }} />

                                </div>
                                <div ref={idiv} className="image-container">
                                    <Image style={{ width: '120px', height: '80px', boxShadow: '0px 0px 10px black', objectPosition: 'center' }} src={`/BannerImg/${ab.image}`} rounded />
                                </div>

                            </div>
                        ))
                    ):(
                        <div style={{display:'flex',justifyContent:"center"}}><p>No blogs found.</p></div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default SearchActive
