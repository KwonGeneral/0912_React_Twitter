
import { useState } from "react";
import { authService, firebaseInstance } from "../fbase";
import AuthForm from "../components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";

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
        <div className="authContainer">
            <FontAwesomeIcon icon={ faTwitter } color={ "#04AAFF" } size="3x" style={{ marginBottom: 30 }} />
            <AuthForm />
            <div className="authBtns">
                <button onClick={ onSocialClick } name="google" className="authBtn">
                    구글 로그인 <FontAwesomeIcon icon={ faGoogle } />
                </button>
                <button onClick={ onSocialClick } name="github" className="authBtn">
                    깃허브 로그인 <FontAwesomeIcon icon={ faGithub } />
                </button>
            </div>
        </div>
    )
}

export default Auth;

