import {Typography} from 'antd'

const HomePageFooter=()=>{

    return(
        <div style={{backgroundColor:'gray',width:'96%',padding:'25px',marginLeft:'auto'}}>
    
                <Typography.Title>Links</Typography.Title>
                <Typography.Paragraph Value='' onClick={(e)=>{console.log(e.target.Value)}}>Home</Typography.Paragraph>
                <Typography.Paragraph Value="men's clothing" onClick={(e)=>{console.log(e.target.Value)}}>Men's Clothing</Typography.Paragraph>
                <Typography.Paragraph Value="women's clothing" onClick={(e)=>{console.log(e.target.Value)}}>Women's Clothing</Typography.Paragraph>
                <Typography.Paragraph Value="jewelery" onClick={(e)=>{console.log(e.target.Value)}}>Jewelery</Typography.Paragraph>
                <Typography.Paragraph Value="electronics" onClick={(e)=>{console.log(e.target.Value)}}>Electronics</Typography.Paragraph>
                
            
        </div>
    )
}
export default HomePageFooter