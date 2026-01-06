import {useState} from "react";
import axiosClient from "@/api/axiosClient.ts";

function LoginPage(){
    const [username,setUsername]= useState("");
    const [password,setPassword]= useState("");
    async function login(){
        const userID = localStorage.getItem("userID");

        if(!username || !password || userID){
            return false;
        }
        try {
            const loginData={
                username:username,
                password:password
            }
            const response = await axiosClient.post("/login",loginData)
            if(response ===  null) return;
            localStorage.setItem("userID",response.data.userID);
            localStorage.setItem("username",username);
            alert("Đăng nhập thành công")
        } catch(error){
            console.log("Lỗi server: "+error);
        }
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