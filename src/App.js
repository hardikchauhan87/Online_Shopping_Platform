import './App.css';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Screens/Home';
import Login from './Screens/Login';
import SignUp from './Screens/SignUp';
import { CartProvider } from './Components/ContextReducer';
import Cart from './Screens/Cart';
import MyOrder from './Screens/MyOrder';
import DataUpload from './Admin/DataUpload';
import UploadCat from './Admin/UploadCat';
import Dashboard from './Admin/Dashboard';
import UserView from './Admin/UserView';
import OrderView from './Admin/ViewOrder';
import CustomerCare from './Components/Custumercare';
import CustomerCareExecutive from './Components/CustomerExecutive';
import AddSupportUser from './Admin/AddSupportUser';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar /> {/* It's a good idea to include Navbar here for all routes */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/createuser' element={<SignUp />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/myOrder' element={<MyOrder />} />
          <Route path='/uploaddata' element={<DataUpload />} />

          <Route path='/uploadcat' element={<UploadCat />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/userview' element={<UserView />} />
          <Route path='/vieworder/:email' element={<OrderView />} />
          <Route path='Help' element={<CustomerCare/>}/>
          <Route path='care' element={<CustomerCareExecutive/>}/>
          <Route path='addSupportUser' element={<AddSupportUser/>}/>
        </Routes>
        <Footer /> {/* You might also want to include Footer here for all routes */}
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
