
import {Button, Input, Space,} from 'antd'
import { useNavigate } from 'react-router-dom'
const Admin=(props)=>{
    const navigate=useNavigate();
    return(
        <div className="admin">
            <Space>
                <Input type='text' placeholder='Enter Your UserName'></Input>           
                <Input type='password' placeholder='Enter Your Password'></Input>
                <Button onClick={()=>navigate('/home')}>Login</Button>
                

            </Space>
        </div>
    )
}
export default Admin