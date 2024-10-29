import logo from './logo.svg';
import './App.css';
import Login from './pages/login';
import Reg from './pages/reg';
import HomePage from './pages/HomePage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

import Navbar from './components/Navbar';
import CalendarView from './pages/Calendar';
import EventPage from './pages/eventpage';



const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/> ,
  },
  {
    path: "/cal",
    element:<><Navbar/> <CalendarView /></> ,
  },
  {
    path: "/event",
    element:<><Navbar/> <EventPage /></> ,
  },
  {
    path: "/login",
    element:<Login></Login>,
  },
  {
    path: "/reg",
    element:<Reg></Reg>,
  },
]);
function App() {
  return (
    <div className="App">
      
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
