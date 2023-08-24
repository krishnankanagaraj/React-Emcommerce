import {Menu} from 'antd'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginContext from '../../store/LoginContext';


const HomePageHeader=(props)=>{
    let loginctx=useContext(LoginContext);
    let {filter,setFilter}=props;
    const navigate=useNavigate();
    return(
        <div>
            <Menu style={{height:'100%',position:'fixed',width:'250px',paddingBlock:"125px"}} onClick={(key)=>{
                if(key.key==''){
                    setFilter('')
                }
                else{
                    setFilter(key.key)
                }
                console.log(filter)
            }} defaultSelectedKeys={[]}
            items={[
                {
                    label:"Home",
                    key:"",
                    onClick:()=>{
                        navigate(`/home/`)
                    }
                },
                {
                    label:"Men's",
                    key:"men's",
                    children:[
                        {
                        label:"Men's Shoes",
                        key:'mens-shoes'
                        },
                        {
                            label:"Men's Watches",
                            key:'mens-watches'
                        },
                        {
                            label:"Men's Shirts",
                            key:"mens-shirts"
                        },
                        {
                            label:'Sunglasses',
                            key:'sunglasses'
                        }
                ]
                },
                {
                    label:"Women's",
                    key:"women's",
                    children:[{
                        label:"Women's Dresses",
                        key:"womens-dresses"
                        },
                        {
                            label:"Women's Shoes",
                            key:'mens-shoes'
                        },
                        {
                            label:"Women's Watches",
                            key:'womens-watches'
                        },
                        {
                            label:"Women's Bags",
                            key:"womens-bags"
                        },
                        {
                            label:"Women's Tops",
                            key:'tops'
                        }
                    ]
                },
                {
                    label:"Electronics",
                    key:"electronics",
                    children:[
                        {
                            label:"SmartPhones",
                            key:'smartphones'
                        },
                        {
                            label:'Laptops',
                            key:'laptops'
                        },
                        {
                            label:"Men's Watches",
                            key:'mens-watches'
                        },
                        {
                            label:"Women's Watches",
                            key:'womens-watches'
                        }, 
                    ]
                },
                {
                    label:"Jewelery",
                    key:"jewelery",
                    children:[{
                        label:'Womens Jwellery',
                        key:'womens-jewellery'
                    }]
                },
                {
                    label:'Cosmetics',
                    key:'cosmetics',
                    children:[
                        {
                            label:'Fragrances',
                            key:'fragrances'
                        },
                        {
                            label:'Skincare',
                            key:'skincare'
                        },
                        
                    ]
                },
                {
                    label:'Home Needs',
                    key:'home-decors',
                    children:[
                        {
                            label:'Home Decoration',
                            key:'home-decoration'
                        },
                        {
                            label:"Furniture",
                            key:'furniture'
                        },
                        {
                            label:'Groceries',
                            key:'groceries'
                        },
                        {
                            label:'Lighting',
                            key:'lighting'
                        }

                    ]
                },
                {
                    label:'Automotive',
                    key:'automotive',
                    children:[
                        {
                            label:'Automotive',
                            key:'automotive'
                        },
                        {
                            label:'Motorcycle',
                            key:'motorcycle'
                        }
                    ]
                },
                {
                    label:`${loginctx.isLoggedIn?`LogOut`:''}`,
                    key:'',
                    onClick:()=>{loginctx.setIsLoggedIn(false);console.log(loginctx.isLoggedIn)}
                }
            ]}
            ></Menu>
        
        </div>
    )
}
export default HomePageHeader