import {useState} from "react";
import axiosClient from "@/api/axiosClient.ts";
import {Link, useNavigate} from "react-router-dom";

function LoginPage(){
    const [username,setUsername]= useState("");
    const [password,setPassword]= useState("");
    const [statusLogin, setStatusLogin] = useState("o");
    const navigate = useNavigate();
    async function login(){

        if(!username || !password){
            return false;
        }
        try {
            const loginData={
                username:username,
                password:password
            }
            const response = await axiosClient.post("/user/login",loginData)
            if(response ===  null) {
                setStatusLogin("Server không phản hồi")
                return
            };
            const userID = response.data.userID;
            if(!userID){
                return;
            }
            localStorage.setItem("userId",userID);
            localStorage.setItem("username",username);
            alert("Đăng nhập thành công");
            navigate("/");
        } catch(error){
            if (error.response && error.response.status === 401) {
                setStatusLogin("Sai tài khoản hoặc mật khẩu!");
            } else {
                setStatusLogin("Lỗi hệ thống, vui lòng thử lại sau.");
            }
        }
    }
    return(
        <div className="login-body">
            <link rel="stylesheet" href="src/scss/LoginStyle.css"/>
            <input type="text" placeholder="Tên đăng nhập..." id="username"
                   name="username" onChange={(e)=>setUsername(e.target.value)}/>
            <input type="password" placeholder="Mật khẩu..." id="password"
            name="password" onChange={(e)=>setPassword(e.target.value)}/>
            <button className="btn-login" onClick={login}> Đăng nhập</button>
            <Link to={"/register"} style={{textDecoration:"none"}}>
                <p style={{color:"black"}}>Bạn chưa có tài khoản?Đăng ký</p>
            </Link>
            <p className="status">
            {statusLogin}
            </p>
        </div>
    )
}
export default LoginPage;