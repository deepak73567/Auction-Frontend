import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SideDrawer from './layout/SideDrawer';
import  Home  from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SubmitCommission from './pages/SubmitCommission';
import HowItWorks from './pages/HowItWorks';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import { fetchLeaderboard, FetchUser } from './store/slices/userSlice';
import About from './pages/About';
import { getAllAuctionItems } from './store/slices/auctionSlice';
import Leaderboard from './pages/Leaderboard';
import Not from './pages/Not';
import Auction from './pages/Auction';
import AuctionItem from './pages/AuctionItem';
import CreateAuction from './pages/createAuction';
import ViewMyAuctions  from './pages/view-my-auctions';
import ViewAuctionDetail from './pages/viewAuctionDetail';
import Dashboard from './pages/dashboard/Dashboard';
import Contact from './pages/Contact';
import UserProfile from './pages/UserProfile';
import ServerStatus from './pages/ServerStatus';
const App = () => {
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(FetchUser());
    dispatch(getAllAuctionItems());
    dispatch(fetchLeaderboard());
  },[])
  return (
    <>
      <Router>
        <SideDrawer/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/sign-up' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/submit-commission' element={<SubmitCommission/>}/>
          <Route path='/how-it-works-inf0' element={<HowItWorks/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/leaderboard' element={<Leaderboard/>}/>
          <Route path='/auctions' element={<Auction/>}/>
          <Route path='/auction/item/:id' element={<AuctionItem/>}/>
          <Route path='/create-auction' element={<CreateAuction/>}/>
          <Route path='/view-my-auctions' element={<ViewMyAuctions/>}/>
          <Route path='/auction/details/:id' element={<ViewAuctionDetail/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/me' element={<UserProfile/>} />
          <Route path='/status' element={<ServerStatus/>}/>
          <Route path='/:id' element={<Not/>}></Route>
        </Routes>
      <ToastContainer position='top-right'/>
      </Router>
    </>
  );
};

export default App