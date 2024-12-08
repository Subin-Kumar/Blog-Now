import React, { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';

function InPageNav({ rou,com }) {
    const [actrou, setactrou] = useState(0)
    const actref = useRef()
    const firstButtonRef = useRef()
    const [values, setValues] = useState([]);


    const ButCli = (i, e) => {
        setactrou(i)
        actref.current.style.width = e.target.offsetWidth + 'px'
        actref.current.style.left = e.target.offsetLeft + 'px'

    }

    


    useEffect(() => {
        if (firstButtonRef.current) {
            const buttonWidth = firstButtonRef.current.offsetWidth;
            const buttonLeft = firstButtonRef.current.offsetLeft;
            actref.current.style.width = buttonWidth + 'px';
            actref.current.style.left = buttonLeft + 'px';
        }

    }, [])

    const ActiveComponent = com[actrou];
    
    const NActiveComponent = com[actrou===0?1:0];



    const handleValues = (newValues) => {
      setValues(newValues);
    };

    return (
        <div>
            <div style={{ marginTop: "20px", marginLeft: "20px", }}>
                <div style={{ display: 'flex' }}>
                    {
                        rou.map((r, i) => (
                            <div key={i} style={{ marginRight: '10px' }} className={window.innerWidth >= 768 && i !== 0 ? 'hide-on-small-screen' : ''}>
                                <Button variant="link" ref={i === 0 ? firstButtonRef : null} style={{ textDecoration: 'none', color: actrou === i ? 'black' : 'grey' }} size='sm' active={actrou === i} onClick={(e) => ButCli(i, e)}>{r}</Button>
                            </div>
                        ))
                    }
                </div>
                <hr ref={actref} style={{ position: 'absolute', backgroundColor: 'black', transitionProperty: 'width,left', transitionDuration: '300ms', transitionTimingFunction: 'ease-in-out' }} />
            </div>

            <div style={{display:'flex'}}>
                <div className='Homemain'>
                {
                    ActiveComponent && <ActiveComponent  />
                }
                </div>
               <div  className='Homesec'>
                {
               NActiveComponent && <NActiveComponent />
                }
               </div>
            </div>
        </div>
    )
}

export default InPageNav
