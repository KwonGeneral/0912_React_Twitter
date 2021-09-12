
import { useState } from "react";
import { authService, firebaseInstance } from "../fbase";
import AuthForm from "../components/AuthForm";

const Auth = () => {

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



    return (
        <div>
            <AuthForm />
            <div>
                <button onClick={ onSocialClick } name="google">구글 로그인</button>
                <button onClick={ onSocialClick } name="github">깃허브 로그인</button>
            </div>
        </div>
    )
}

export default Auth;

