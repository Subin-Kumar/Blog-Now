import React, { useEffect } from 'react'
import NavBarr from './NavBarr'
import HBlogs from './HBlogs'
import InPageNav from './InPageNav'
import HTrend from './HTrend'
import { GetBlogAll, GetUserAll } from './ApiCall/apiU'
import { useDispatch } from 'react-redux'




function Home() {
    const dispatch=useDispatch()
    useEffect(() => {
        GetBlogAll(dispatch)
        GetUserAll(dispatch)


    }, [])
    return (
        <div className='Lo2'>
            <div>
                <NavBarr />
            </div>
            <div>
                <div>
                    <InPageNav rou={['Home','Trendings']} com ={[HBlogs,HTrend]}/>
                </div>
                <div>
                    
                </div>
            </div>
            

        </div>



    )
}

export default Home
