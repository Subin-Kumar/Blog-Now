
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './login';
import Signup from './Signup';
import { useSelector } from 'react-redux';
import Home from './Home';
import NavBarr from './NavBarr';
import Editor from './Editor';
import HBlogs from './HBlogs';
import HTrend from './HTrend';
import BlogPage from './BlogPage';
import SearchResults from './SearchResults';
import SearchActive from './SearchActive';
import Profile from './Profile';
import Edit from './Edit';
import Draft1 from './Draft1';




function App() {

  const Udata = useSelector(state => state.BcData.Data)
  // console.log("udata--", Udata[0]);
  if (Udata[0]) {
    var token = Udata[0].accesstoken
  }

  const router = createBrowserRouter([
    {
      path:'/',
      element:token?<Home/>:<Login/>
    },
    {
      path: 'sign',
      element: <Signup />
    },
    {
      path: 'nav',
      element: <NavBarr />
    },
    {
      path: 'ed',
      element: <Editor />
    },
    {
      path: 'Hb',
      element: <HBlogs />
    },
    {
      path: 'Ht',
      element: <HTrend />
    },
    {
      path: 'Bp',
      element: <BlogPage />
    },
    {
      path: 'search',
      element: <SearchResults />
    },
    {
      path: 'searchA',
      element: <SearchActive />
    },
    {
      path: 'profile',
      element: <Profile/>
    },
    {
      path: 'edit',
      element: <Edit/>
    },
    {
      path: 'dr',
      element: <Draft1/>
    },
  ])
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>

    </div>
  );
}

export default App;
