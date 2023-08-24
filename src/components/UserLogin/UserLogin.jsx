import { Form, Input } from "antd"

const UserLogin=()=>{


    return(
        <div>
            <Form style={{marginBlock:'50px',padding:'50px',background:'red'}}>
                <Input type='text' placeholder="Enter your Email or Phone Number"></Input>
                <Input type='password' placeholder="Enter your Password"></Input>
            </Form>
        </div>
    )
}
export default UserLogin;