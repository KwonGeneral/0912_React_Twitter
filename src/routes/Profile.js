
import {authService, dbService} from "../fbase";
import { useHistory } from "react-router-dom";
import {useEffect, useState} from "react";

const Profile = ({ userObj, refreshUser }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName != null ? userObj.displayName : "");

    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    }

    const onChange = (event) => {
        const { target: { value } } = event;
        setNewDisplayName(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({ displayName: newDisplayName });
            refreshUser();
        }
    };

    /*
    const getMyTweets = async () => {
        const tweets = await dbService
                        .collection("tweets")
                        .where("creatorId", "==", userObj.uid)
                        .orderBy("createdAt", "asc")
                        .get();
        
        console.log(tweets.docs.map((doc) => doc.data()))
    };
     */
    
    // Profile 컴포넌트가 렌더링 된 이후, 실행 될 함수 ( useEffect )
    useEffect(() => {
        // getMyTweets();
    }, [])

    return (
        <div className="container">
            <form onSubmit={ onSubmit } className="profileForm">
                <input type="text" placeholder="닉네임" onChange={ onChange } value={ newDisplayName } autoFocus
                       className="formInput"/>
                <input type="submit" value="프로필 수정" className="formBtn" style={{ marginTop: 10 }}/>
            </form>
            <span onClick={ onLogOutClick } className="formBtn cancelBtn logOut">
                로그아웃
            </span>
        </div>
    )
}

export default Profile;

