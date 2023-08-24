import { Fragment, useContext, useRef } from 'react';
import CartContext from '../../store/cartContext';
import LoginContext from '../../store/LoginContext';
import type from '../stateManager/types/product.types';
import { insertProduct_data } from "../stateManager/actions/getData.action";
import axios from "axios"
import { useEffect, useState } from "react"
import HomePageHeader from "./HomePageHeader";
import {Alert, Badge, Card, Drawer, Empty,Input} from 'antd'
import {Menu,Modal,Button} from 'antd'
import { Layout } from 'antd';
import {Rate,Spin} from 'antd'
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
const { Header, Footer, Sider, Content } = Layout;
const {Meta}=Card;

const HomePage=(props)=>{
    const cartctx=useContext(CartContext);
    const loginctx=useContext(LoginContext);
    let{loginForm}=props;
 
   
    const quantityRef=useRef();
    let[products,setProducts]=useState([]);

    let[filter,setFilter]=useState("");

    let[sort,setSort]=useState('')
    let [order,setOrder]=useState(false)


    let[showModal,setShowModal]=useState(false)
    let[showDrawer,setShowDrawer]=useState(false);

    let[product1,setProduct1]=useState({})

    // let[cartLength,setCartLength]=useState(null)
    let cartCount=cartctx.items&&cartctx.items.reduce((acc,item)=>{
        return acc=Number(acc)+Number(item.quantity)
    },0)
    const addItem=(quantity)=>{
        console.log('call')
        cartctx.addItems({
            id:product1.id,
            image:product1.images[0],
            title:product1.title,
            rating:product1.rating,
            price:product1.price,
            quantity:quantity,
            stock:product1.stock
        })
    }

    const remove=(item)=>{
      cartctx.removeItems(item);

    }

    const submitHandler=(e)=>{
        e.preventDefault();
        const quantity=quantityRef.current.input.value;
        addItem(quantity);
        quantityRef.current.input.value=1;
    }
    const emptyCart=()=>{
        cartctx.emptyCart();
    }
    const placeOrder=()=>{
        if(loginctx.isLoggedIn){
           setOrder(true)
           setTimeout(()=>{setOrder(false);emptyCart();},2500)  
        }
    }

    
 

    const dispatch=useDispatch();

    const productData=useSelector((state)=>state);

    useEffect(()=>{
    
        axios('https://dummyjson.com/products?limit=100').then((response)=>{
       dispatch(
        insertProduct_data({
            type:type.SAVE_PRODUCTS,
            data:response.data.products
        })
       )
}).catch(err=>{console.log(err.message)})
},[])
useEffect(()=>{
    setProducts(productData?.productData?.productData)
    console.log(products)
},[productData,products])
useEffect(()=>{
 axios('https://dummyjson.com/products/categories').then((response)=>{
    console.log(response.data)
}).catch(err=>console.log(err.message))
},[])

return(
<Fragment>
    <Layout>
      <Header style={{height:'5rem',position:'fixed',zIndex:'99',width:'100vw'}} >
        <Menu style={{height:'100%',width:'100vw',marginLeft:'-50px',paddingInline:'25px',display:'flex',justifyContent:'flex-end',paddingRight:'100px'}} onClick={(key)=>{setSort(key.key);key.key=='userLogin'&&loginctx.isLoggedIn===false?loginForm(true):loginForm('')}} mode='horizontal'
            items={[
                {
                    label:'AMAZON',
                    key:'/',
                    style:{marginRight:'auto',marginLeft:'100px',fontWeight:'bold',color:'green',fontSize:'2rem'},
                },
                {
                    label:`${loginctx.isLoggedIn?`Welcome ${loginctx.user}`:'Login'}`,
                    key:'userLogin',
                },
                {
                    label:'Sort By',
                    key:'sort by',
                    children:[
                    {
                        label:'Price: Low To High',
                        key:'lowToHigh'
                    },
                    {
                        label:'Price: High TO Low',
                        key:'highToLow',
                    },
                    {
                        label:"A-Z",
                        key:'aToz'
                    },
                    {
                        label:'Z-A',
                        key:'zToa'
                    }
                ]
                },
                {
                    label:'Reset',
                    key:''
                },
                {
                    icon:<Badge style={{marginTop:'15px'}} count={cartCount} showZero><ShoppingCartOutlined onClick={()=>{setShowDrawer(true)}} style={{fontSize:"40px",marginLeft:"auto",marginTop:'15px'}}/></Badge>,
                    key:''
                }
                
        
            ]}>
            </Menu>
            </Header>
      <Layout hasSider>
        <Sider style={{height:'100%'}}><HomePageHeader filter={filter} setFilter={setFilter}/></Sider>
        <Content><div style={{display:'flex',flexWrap:'wrap',gap:'8px',padding:'125px',height:'max-content',}}>
            {products.length==0&&<Spin style={{position:'absolute',top:'50%',left:'50%',translate:'-50% -50%'}}></Spin>}
            {products&&products.filter((product)=>{
                return filter==""? product: product.category==filter
            }).sort((a,b)=>{
                if(sort==""||sort=='userLogin'){
                    return a
                }
                else if(sort=="lowToHigh"){
                    return a.price-b.price
                }
                else if(sort=="highToLow"){
                    return b.price-a.price
                }
                else if(sort=="aToz"){
                    return a.title.localeCompare(b.title)
                }
                else if(sort="zToa"){
                    return b.title.localeCompare(a.title)
                }
                else{
                    return a
                }
            }).map((product,index)=>{
        return(
        <div>
        <Card onClick={()=>{setProduct1(product); setShowModal(true);}} hoverable style={{width: 240,padding:'10px'}}
        cover={<img style={{height:"150px",objectFit:'scale-down'}} alt="example" src={product.images[0]} />} >
        <Meta title={product.title} />
        <Rate value={product.rating} disabled allowHalf></Rate>({product.stock})
        <p style={{fontWeight:'semi-bold',textAlign:'center'}}>Price: ${product.price} <span style={{textDecoration:'line-through',marginInline:'25px',color:'red'}}>MRP:${(parseFloat(product.price+(product.price/10))).toFixed(2)}</span></p>
        </Card>
        </div>
          )
        })}
        </div>
        {/* <HomePageFooter></HomePageFooter> */}
        </Content>
      </Layout>
      <Footer></Footer>
    </Layout>
    <Modal open={showModal} onCancel={()=>{setShowModal(false)}} onOk={()=>{setShowModal(false);setProduct1([])}}>
       {product1&&<Card style={{padding:'50px',border:'none'}}
        cover={<img style={{height:"150px",objectFit:'scale-down'}} alt="example" src={product1?.images?product1?.images[0]:''} />} >
        <Meta title={product1?.title} description={product1?.description} />
        <Rate value={product1?.rating} disabled allowHalf></Rate>({product1?.stock})
        <p style={{fontWeight:'semi-bold',textAlign:'center'}}>Price: ${product1.price} <span style={{textDecoration:'line-through',marginInline:'25px',color:'red'}}>MRP:${(parseFloat(product1.price+(product1.price/10))).toFixed(2)}</span></p>
        <form action="" onSubmit={submitHandler} style={{display:'flex',alignItems:'center',justifyContent:'space-evenly',width:'100%'}}>
            <label htmlFor="">Quantity : </label>
            <Input ref={quantityRef} type='number'style={{width:'50px'}} max={10} min={1} step={1} defaultValue={1} ></Input>
            <Button type='primary' htmlType='submit' style={{background:'green'}}>Add To Cart</Button>
        </form>
        <Button type="primary" style={{width:'100%',marginTop:'25px'}} danger>Buynow</Button>
        </Card>}
    </Modal> 
<Drawer open={showDrawer} width={600} onClose={()=>setShowDrawer(false)}>
      
        {cartctx.items&&cartctx.items.length==0&&<Empty></Empty>}
        {cartctx.items&&cartctx.items.map((item,index)=>{
        
    return(
        
        <div>
        <div style={{padding:'20px',border:'none',display:'flex',gap:'20px',flexDirection:'row',width:'100%',justifyContent:'space-between',alignItems:'center'}}>
        <span>{index+1}</span>
         <div style={{fontWeight:'bold'}}>{item?.title}</div>
        <div><Rate value={item?.rating} disabled allowHalf></Rate>({item.stock})</div>
        <div style={{fontWeight:'semi-bold',textAlign:'center'}}>Price: ${item.price}</div>
        <span style={{fontSize:'1.5rem',fontWeight:'bold',textAlign:'center'}}> <span style={{fontWeight:'lighter'}}>X</span>{item.quantity}</span>
        <div style={{display:'flex',justifyContent:'space-evenly',alignItems:'center',gap:'3px'}}>
        <Button type='primary'  style={{display:'flex',justifyContent:'center',alignItems:'center', fontSize:'1.5rem'}} onClick={()=>{cartctx.addItems({...item,quantity:1})}} ghost>+</Button>
        <Button type='primary'  style={{display:'flex',justifyContent:'center',alignItems:'center', fontSize:'1.5rem'}} onClick={remove.bind(null,item)}>-</Button>
        </div>
        </div>
        </div>
        )
        })}
       
        {cartctx.items&&cartctx.items.length!==0&&<div style={{display:'flex',justifyContent:'flex-end',alignItems:'center',flexDirection:'column',position:'fixed',bottom:'20px'}}>
        <p>Total Cart Value:{cartctx.totalAmount}</p>
        <Button type='primary' block style={{backgroundColor:'green'}} onClick={loginctx.isLoggedIn? placeOrder:()=>loginForm(true)}>Proced to Checkout</Button>
        </div>}
       
</Drawer>
<Modal open={order} footer={[]}><Alert
      message="Order Placed sucessfully"
      description= {`Your Order for the Amount of $${cartctx.totalAmount}`}
      type="success"
      showIcon
    /></Modal>
</Fragment>
    )
}
export default HomePage