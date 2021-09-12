import {useState} from "react";
import {authService} from "../fbase";

const AuthForm = () => {
    const [email, set_email] = useState("");
    const [password, set_password] = useState("");
    const [newAccount, set_newAccount] = useState(true);
    const [error, set_error] = useState("");
    const toggleAccount = () => set_newAccount((prev) => !prev);

    const onChange = (event) => {
        // console.log(event.target.name);
        const { target : { name, value } } = event;
        if(name === "email") {
            set_email(value);
        } else if(name === "password") {
            set_password(value);
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;

            if(newAccount) {
                data = await authService.createUserWithEmailAndPassword(email, password)
            } else {
                data = await authService.signInWithEmailAndPassword(email, password)
            }
            console.log("데이터 : ", data);
        } catch (error) {
            // console.log("에러 : ", error)
            set_error(error.message)
        }
    }

    return (
        <>
            <form onSubmit={ onSubmit } className="container">
                <input className="authInput" name="email" value={ email } onChange={ onChange } type="email" placeholder="이메일" required/>
                <input className="authInput" name="password" value={ password } onChange={ onChange } type="password" placeholder="비밀번호" required/>
                <input className="authInput authSubmit" type="submit" value={ newAccount ? "회원가입" : "로그인" } required/>
                { error && <span className="authError">{ error }</span>}
            </form>
            <span onClick={ toggleAccount } className="authSwitch">
                { newAccount ? "로그인" : "회원가입" }
            </span>
        </>

    )

}

export default AuthForm;