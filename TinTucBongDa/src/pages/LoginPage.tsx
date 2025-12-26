import {useState} from "react";

function LoginPage(){
    const [username,setUsername]= useState("");
    const [password,setPassword]= useState("");
    function login(){
        if(!username || !password){
            return true;
        }
        return false
    }
    return(
        <div className="login-body">
            <input type="text" placeholder="Tên đăng nhập..." id="username"
                   name="username" onChange={(e)=>setUsername(e.target.value)}/>
            <input type="password" placeholder="Mật khẩu..." id="password"
            name="password" onChange={(e)=>setPassword(e.target.value)}/>
            <button className="btn-login" onClick={login}> Đăng nhập</button>
        </div>
    )
}
export default LoginPage;