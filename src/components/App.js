import {useEffect, useState} from "react";
import React from "react";
// import AppRouter from "components/Router";
import AppRouter from "./Router";
import { authService } from "../fbase";


function App() {
    const [init, set_init] = useState(false);
    // const [isLogin, set_isLogin] = useState(false);
    const [userObj, set_userObj] = useState(null);

    // console.log(authService.currentUser)
    // setTimeout(() => console.log(authService.currentUser), 2000);
    useEffect(() => {
        // authService.onAuthStateChanged((user) => console.log(user));
        authService.onAuthStateChanged((user) => {
            if(user) {
                // set_isLogin(user);
                set_userObj({
                    uid: user.uid,
                    displayName: user.displayName,
                    updateProfile: (args) => user.updateProfile(args)
                });
            } else {
                // set_isLogin(false);
                set_userObj(false);
            }
            set_init(true);
        });
    }, []);

    const refreshUser = () => {
        // set_userObj(authService.currentUser);
        const user = authService.currentUser;
        set_userObj({
            uid: user.uid,
            displayName: user.displayName,
            updateProfile: (args) => user.updateProfile(args)
        })
    };

    return (
        <>
            { init ? ( <AppRouter isLogin={ Boolean(userObj) } userObj={ userObj } refreshUser={ refreshUser } /> ) : ( "초기화중..." ) }
            {/*{ init ? ( <AppRouter isLogin={ isLogin } userObj={ userObj } refreshUser={ refreshUser } /> ) : ( "초기화중..." ) }*/}
        {/*<footer>&copy; {new Date().getFullYear()} Twitter</footer>*/}
        </>
    );
}

// 구조 분해 할당
// function App({ isLogin }) {
//   return (
//       <>
//         <AppRouter isLogin={ isLogin } />
//         <footer>&copy; {new Date().getFullYear()} Twitter</footer>
//       </>
//   );
// }

// 기존 방법
// function App() {
//   const [isLogin, set_isLogin] = useState(false);
//   return (
//       <>
//         <AppRouter isLogin={ isLogin } />
//         <footer>&copy; {new Date().getFullYear()} Twitter</footer>
//       </>
//   );
// }

export default App;


