import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import { useState } from "react";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";
import Profile from "../routes/Profile";


// Switch를 사용하면 여러가지 라우터 중 하나만 렌더링할 수 있게 해준다.
// 특정 작업 후, 페이지 이동은 Redirect나 history.push를 사용한다.
const AppRouter = ({ isLogin, userObj, refreshUser }) => {
    return (
        <Router>
            { isLogin && <Navigation userObj={ userObj } /> }
            <Switch>
                { isLogin ? (
                    <>
                        <Route exact path="/">
                            <Home userObj={ userObj } />
                        </Route>
                        <Route exact path="/profile">
                            <Profile userObj={ userObj } refreshUser={ refreshUser } />
                        </Route>
                    </>
                ) : (
                    <Route exact path="/">
                        <Auth />
                    </Route>
                ) }

                {/*<Redirect from="*" to="/" />*/}
            </Switch>
        </Router>
    )
}

export default AppRouter;


