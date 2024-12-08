import React, { useEffect, useState } from 'react'
import Image from 'react-bootstrap/Image';
import { FaHeart, FaComment } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { AddR, GetBlogAll } from './ApiCall/apiU';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import ToggleButton from 'react-bootstrap/ToggleButton';


function HBlogs() {
    const bdiv = useRef(null)
    const idiv = useRef(null)
    const divRef = useRef(null);

    const [linew, setlinew] = useState(0)
    const [SHoBlo, setSHoBlo] = useState([])
    const [ATgs, setATgs] = useState([])
    const [tagsc, settagsc] = useState([])



    var AllB = useSelector(state => state.BcData.AB)||[]
    // var AllDrafts = useSelector(state => state.BcData.Drafts)||[]



    console.log("Check All", AllB);
    // console.log("Check All drafts", AllDrafts);
    console.log("Check All Show", SHoBlo);


    const calculateLineWidth = () => {
        if (bdiv.current && idiv.current) {
            // console.log("bdiv idiv" ,bdiv.current.offsetWidth,idiv.current.offsetWidth);
            const newWidth = bdiv.current.offsetWidth - idiv.current.offsetWidth - 20;
            setlinew(newWidth);
        }
    };

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
        calculateLineWidth();
        setSHoBlo(AllB)
    }, [AllB]);

 




    useEffect(() => {
        var tb = AllB.flatMap((ab) => ab.btag);

        for (let i = tb.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tb[i], tb[j]] = [tb[j], tb[i]];
        }

        tb = Array.from(new Set(tb));
        setATgs(tb)

    }, [AllB])

    const tacli = (t) => {

        if (!tagsc.includes(t)) {
            const taga = [...tagsc, t]
            settagsc(taga)
            console.log("tag on tagsc", tagsc);
        }
        else {
            const tagr = tagsc.filter(item => item !== t);
            settagsc(tagr)
            console.log("elsetest", tagr);
        }
    }
    useEffect(() => {

        const filteredBlogs = AllB.filter(blog => tagsc.some(tag => blog.btag.includes(tag)));
        console.log("Filtered Blogs:", filteredBlogs);
        if (filteredBlogs.length == 0) {
            setSHoBlo(AllB)

        }
        else {
            setSHoBlo(filteredBlogs)

        }

    }, [tagsc])


  const updateMaxHeight = () => {
    if (divRef.current) {
      const screenHeight = window.innerHeight;
      const divTopOffset = divRef.current.offsetTop;
      const newMaxHeight = screenHeight - divTopOffset - 20;
      divRef.current.style.maxHeight = `${newMaxHeight}px`;
    }
  };
  
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
        return `${text.substring(0, maxLength)}...`;
    }
    return text;
};



    return (
        <div className="blogs-container">

            <div style={{ marginTop: '15px' }} >
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <p>Strories from all interests</p>
                </div>

                <div style={{ display: "flex", flexWrap: 'wrap', justifyContent: 'center' }}>
                    {

                        ATgs.map((tbt, i) => (
                            <div key={i} style={{ marginLeft: "10px", marginBottom: '10px' }}>
                                <ToggleButton className="mb-2" id={`toggle-check-${i}`} type="checkbox" variant="outline-secondary" size='sm' checked={tagsc.includes(tbt)} value={i}
                                    onChange={() => tacli(tbt)} style={{ borderRadius: '20px' }}>{tbt}</ToggleButton>

                            </div>

                        )
                        )
                    }
                </div>
            </div>
            <div className="scrollable-div" ref={divRef}>
                {SHoBlo.map((ab, index) => (

                    <div ref={bdiv} key={index} className="blog-entry">

                        <div className="blog-content">
                            <Link to='/Bp' state={{ Bl: ab }}  style={{ textDecoration: 'none', color: 'inherit' }} >
                                <div style={{ display: 'flex' }}>
                                    <Image style={{ width: '20px', height: '20px', marginRight: '10px' }} src={`/Images/${ab.userimage}`} roundedCircle />
                                    <p><b>{ab.userFullname}</b></p>
                                    <p style={{ marginLeft: '10px' }}> on {ab.date}</p>
                                </div>
                                <h3>{ab.btitle}</h3>
                                <p>Author: {ab.user}</p>
                                <div style={{display:"flex",flexWrap:"wrap"}}>
                                <h6 className='descr'>{truncateText(ab.bdes, 100)}</h6>

                                </div>
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
                                        {/* <div style={{marginLeft:'10px'}}>
                                            <FaComment /> {ab.treads}
                                        </div> */}
                                    </div>
                                </div>

                            </Link>

                            <hr style={{ position: 'relative', width: `${linew}px` }} />

                        </div>
                        <div ref={idiv} className="image-container">
                            <Image style={{ width: '120px', height: '80px', boxShadow: '0px 0px 10px black', objectPosition: 'center' }} src={`/BannerImg/${ab.image}`} rounded />
                        </div>

                    </div>
                ))}
            </div>

        </div>
    )
}

export default HBlogs
