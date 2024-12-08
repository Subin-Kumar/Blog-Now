import React from 'react'
import NavBarr from './NavBarr'
import InPageNav from './InPageNav'
import { useLocation } from 'react-router-dom';
import HTrend from './HTrend';
import SearchActive from './SearchActive';
import SearchUser from './SearchUser';

function SearchResults() {

    const location = useLocation();
    const searchQuery = location.state?.searchQuery
    console.log("SeachQuery", searchQuery);

    const components = [
        (props) => <SearchActive {...props} searchQuery={searchQuery} />,
        (props) => <SearchUser {...props} searchQuery={searchQuery}/>
    ];

  return (
    <div className='Lo2'>
        <div>
                <NavBarr />
            </div>
       <div>
                    <InPageNav rou={[`Search results for ${searchQuery}`,'Searc Results for Users']} com ={components}/>
                </div>
    </div>
  )
}

export default SearchResults
