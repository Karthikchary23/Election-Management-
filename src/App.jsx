import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminLogin from './Admin/AdminLogin';
import LoadPage from './LoadPage';
import Voters_Registration from './Voters/Voters_Registration';
import Voter_Login from './Voters/Voters_Login';
import Aadhar_entry_by_admin from './Aadhar_entry_by_admin/Aadhar_entry_by_admin';
import Admin_add from './Admin/Admin_add';
import Admin_page from './Admin/Admin_page';
import ProtectedRoute from './Admin/ProtectedRoute';
import Voter_home_page from './Voters/Voter_home_page';
import Layout from './Admin/Layout';
import Position from './Admin/Position';
import Add_candidates from './Admin/Add_candidates';
import Contact from './Voters/Contact';
import Results from './Admin/Results';

function App() {
  
  // Define the routes
  const router = createBrowserRouter([
    {
      path: '/',
      element: <><LoadPage /><Voter_Login /></>
    },
    {
      path: '/admin_login',
      element: <><LoadPage /><AdminLogin /></>
    },
    {
      path: '/voter_registration',
      element: <><LoadPage /><Voters_Registration /></>
    },
    {
      path: '/voterhomepage',
      element: <><LoadPage /><Voter_home_page /></>
    },
    {
      path: '/contact',
      element: <><LoadPage /><Contact /></>
    },
    {
      path: '/',
      element: <ProtectedRoute><Layout /></ProtectedRoute>,
      children: [
        {
          path: 'adminhomepage',
          element: <Admin_page />
        },
        {
          path: 'aadharbyadmin',
          element: <Aadhar_entry_by_admin />
        },
        {
          path: 'addadmin',
          element: <Admin_add />
        },
        {
          path: 'position',
          element: <Position/>
        },
        {
          path: 'addcandidate',
          element: <Add_candidates />
        },{
          path: 'results',
          element: <Results />
        },
      ]
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
