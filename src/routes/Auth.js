
import { useState } from "react";
import { authService, firebaseInstance } from "../fbase";

const Auth = () => {
    const [email, set_email] = useState("");
    const [password, set_password] = useState("");
    const [newAccount, set_newAccount] = useState(true);
    const [error, set_error] = useState("");
    const toggleAccount = () => set_newAccount((prev) => !prev);

    // 소셜 로그인 기능 : 구글, 깃허브 등등 소셜 로그인 목표 확인
    const onSocialClick = async (event) => {
        // console.log(event.target.name);

        let provider;
        const { target: { name } } = event;

        if(name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if(name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }

        const data = await authService.signInWithPopup(provider);
        console.log("onSocialClick data : ", data)
    };

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
        <div>
            <form onSubmit={ onSubmit }>
                <input name="email" value={ email } onChange={ onChange } type="email" placeholder="이메일" required/>
                <input name="password" value={ password } onChange={ onChange } type="password" placeholder="비밀번호" required/>
                <input type="submit" value={ newAccount ? "회원가입" : "로그인" } required/>
                { error }
            </form>
            <span onClick={ toggleAccount }>
                { newAccount ? "로그인" : "회원가입" }
            </span>
            <div>
                <button onClick={ onSocialClick } name="google">구글 로그인</button>
                <button onClick={ onSocialClick } name="github">깃허브 로그인</button>
            </div>
        </div>
    )
}

export default Auth;

