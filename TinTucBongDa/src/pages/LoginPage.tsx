import {useState} from "react";
import axiosClient from "@/api/axiosClient.ts";
import {useNavigate} from "react-router-dom";

function LoginPage(){
    const [username,setUsername]= useState("");
    const [password,setPassword]= useState("");
    const [statusLogin, setStatusLogin] = useState("");
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
            const response: any = await axiosClient.post("/user/login",loginData)
            const serverResponse = (response && response.token) ? response : response.data;
            if(response ===  null) {
                setStatusLogin("Server không phản hồi")
                return
            };
            const { token, data: userInfo } = serverResponse;

            localStorage.setItem("access_token", token);
            localStorage.setItem("user_info", JSON.stringify(userInfo));
            localStorage.setItem("userId", userInfo.userID);
            localStorage.setItem("username", userInfo.username);

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
                   name="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <input type="password" placeholder="Mật khẩu..." id="password"
            name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button className="btn-login" onClick={login}> Đăng nhập</button>
            <p className="status">
                {statusLogin}
            </p>
        </div>
    )
}
export default LoginPage;