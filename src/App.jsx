import './App.css';
import HomePage from './components/UserHomePage/HomePage';
import { useState } from 'react';
import { Route, Routes, } from 'react-router-dom';
import { Button, Input, Modal, Space, Typography } from 'antd';
import CartProvider from './store/CartProvider';
import LoginContext from './store/LoginContext';

function App() {
  let [showModal,setShowModal]=useState(false);
  let [isLoggedIn,setIsLoggedIn]=useState(false)
  let [err,setErr]=useState({valid:'false',message:''});
  let [emailVal,setEmailVal]=useState('');
  let [passVal,setPassVal]=useState('');
 
  let [loggedinUser,setLoggedinUser]=useState('');

  let [register,setRegister]=useState(false);
  
  let users=[
    {
      email:'krishnan@gmail.com',
      password:'krishnan@123',
      name:'Krishnan'
    },
    {
      email:'uthay@gmail.com',
      password:'uthay@123',
      name:'Uthay'
    },
    {
      email:'jagan@gmail.com',
      password:'jagan@123',
      name:'Jagan'
    },
    {
      email:'diwakar@gmail.com',
      password:'diwakar@123',
      name:'Diwakar'
    }
  ]
  const valiadateUser=(e)=>{
    e.preventDefault();
   if(!emailVal.includes('@')||passVal.trim().length<8){
      setErr({...err,valid:'true',message:'Please enter a Valid Email and password'});
    }
    else if(users.findIndex(user=>user.email===emailVal)===-1|| users.findIndex(user=>user.password===passVal)===-1){
      console.log('working')
      setErr({...err,valid:'true',message:'Login Credentials are wrong'})
      console.log(err.valid);
      console.log(err.message)
   }
   else{
    let user=users.findIndex(user=>user.email===emailVal)
    setLoggedinUser((perv)=>perv=users[user].name)
    setErr({...err,valid:'false'})
    setIsLoggedIn(true);
    setEmailVal('');
    setPassVal('')
    setShowModal(false)
   }
    
  }
  

  return (
    <LoginContext.Provider value={{isLoggedIn:isLoggedIn,setIsLoggedIn:setIsLoggedIn,user:loggedinUser}}>
    <CartProvider>
    <div className="App">      
      <Routes>       
        <Route path='/' element={<HomePage onLoad={()=>setShowModal(true)} loginForm={setShowModal}/>}/>
        <Route path="/home/" element={<HomePage loginForm={setShowModal} />}/>
      </Routes>
      <Modal open={showModal} footer={[]} keyboard onCancel={()=>{setShowModal(false)}} onOk={()=>{setShowModal(false)}}>
        <div>
        <Space.Compact direction='vertical' style={{width:'100%',padding:'15px',gap:'25px',marginTop:'50px'}}>
          <Input style={{height:'3rem'}} type='text' placeholder='Enter Your Email or Phone Number' onChange={(e)=>setEmailVal(e.target.value)}value={emailVal} ></Input>
          <Input style={{height:'3rem'}} type='password' placeholder='Enter Your Password min 8 letters' value={passVal} onChange={(e)=>setPassVal(e.target.value)} ></Input>
          {err.valid==='true'&&<p>{err.message}</p>}
          <Button type='primary' htmlType='submit' style={{height:'2.5rem', borderRadius:'8px'}} onClick={valiadateUser}>Sign In</Button>
          <Typography.Text style={{textAlign:'center'}}>Forgot Password?  <Typography.Link underline href='#'>Click here</Typography.Link></Typography.Text>
         <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'}}>
          <Typography.Text style={{textAlign:'center'}}>New User?</Typography.Text> <Button style={{borderRadius:'10px',width:'max-content'}} onClick={()=>setRegister(true)} type='primary'>Click Here to Register</Button>
          </div>

        </Space.Compact>
        </div>
      </Modal>
      <Modal open={register} onCancel={()=>setRegister(false)} onOk={()=>setRegister(false)} footer={[]}>
        <form style={{marginTop:'20px',marginBottom:'50px',display:'flex',justifyContent:'space-evenly',alignItems:'center',flexDirection:'column',gap:'15px'}}>
      <p style={{textAlign:'center',fontSize:'2rem',fontWeight:'bold'}}>Registration Form</p>
          <Input size='large' type='text' placeholder='Enter Your Name' required></Input>
          <Input size='large' type='email' placeholder='Enter Your Email'></Input>
          <Input size='large' type="password" placeholder='Enter Your password' ></Input>
          <Input size='large' type='password' placeholder='Reenter Your Password'></Input>
          <Button size='large' type='primary'>Submit</Button>
        </form>
      </Modal>
    </div>
    </CartProvider>
    </LoginContext.Provider>
  );
}

export default App;
