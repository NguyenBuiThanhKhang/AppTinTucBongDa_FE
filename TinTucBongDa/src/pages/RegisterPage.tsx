import {useState} from "react";
import axiosClient from "@/api/axiosClient.ts";
import {Link, useNavigate} from "react-router-dom";

function RegisterPage(){
    const [username,setUsername]= useState("");
    const [password,setPassword]= useState("");
    const [rePassword,setRePassword]= useState("");
    const [status, setStatus] = useState("o");
    const navigate = useNavigate();
    async function register(){
        try {
            if(!username || !password || !rePassword){
                setStatus("Chưa điền đủ thông tin")
                return;
            }
            if(rePassword !== password){
                setStatus("Mật khẩu và điền lại mật khẩu không khớp")
                return;
            }
            const loginData={
                username:username,
                password:password
            }
            const response = await axiosClient.post("/user/registers",loginData)
            if(response ===  null) {
                setStatus("Server không phản hồi")
                return
            };
            const userID = response.data.userID;
            setStatus("1")
            if(!userID){
                return;
            }
            setStatus("2")
            localStorage.setItem("userId",userID);
            localStorage.setItem("username",username);
            setStatus("Đăng nhập thành công")
            alert("Đăng nhập thành công");
            navigate("/");
        } catch(error){
            if (error.response && error.response.status === 400) {
                setStatus("Tài khoản đã tồn tại!");
            } else {
                setStatus("Lỗi hệ thống, vui lòng thử lại sau.");
            }
        }
    }
    return(
        <div className="login-body">
            <link rel="stylesheet" href="src/scss/LoginStyle.css"/>
            <input type="text" placeholder="Tên đăng nhập..." id="username"
                   name="username" onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" placeholder="Mật khẩu..." id="password"
                   name="password" onChange={(e) => setPassword(e.target.value)}/>
            <input type="password" placeholder="Mật khẩu..." id="rePassword"
                   name="rePassword" onChange={(e) => setRePassword(e.target.value)}/>
            <button className="btn-login" onClick={register}> Đăng ký</button>
            <Link to={"/login"} style={{textDecoration:"none"}}>
                <p style={{color:"black"}}>Bạn đã có tài khoản?Đăng nhập</p>
            </Link>
            <p className="status">
                {status}
            </p>
        </div>
    )
}

export default RegisterPage;