
import {useEffect, useState} from "react";
import { dbService, storageService } from "../fbase";
import Tweet from "../components/Tweet";
import { v4 as uuidv4 } from "uuid";
import TweetFactory from "../components/TweetFactory";

const Home = ({ userObj }) => {
    // console.log("Home userObj : ", userObj)
    const [tweets, set_tweets] = useState([]);

    // const getTweets = async () => {
    //     const dbTweets = await dbService.collection("tweets").get();
    //     // dbTweets.forEach((document) => console.log("document.data() : ", document.data()))
    //     // dbTweets.forEach((document) => set_tweets((prev) => [document.data(), ...prev]))
    //     dbTweets.forEach((document) => {
    //         const tweetObject = { ...document.data(), id: document.id };
    //         set_tweets((prev) => [tweetObject, ...prev])
    //     })
    // }

    useEffect(() => {
        // onSnapshot 함수도 get 함수와 마찬가지로 스냅샷을 반환한다.
        // 스냅샷에는 문서 스냅샷들이 포함되어 있는데, 문서 스냅샷들은 snapshot.docs와 같이 얻어낼 수 있다.
        // 여기에 map 함수를 적용해서 문서 스냅샷에서 원하는 값만 뽑아서 다시 배열화 할 수 있다.
        // forEach 함수는 배열 요소를 순회하면서 매 순회마다 set_tweets 함수를 사용해야 하지만,
        // map 함수는 순회하며 만든 배열을 반환하므로 반환한 배열을 1번만 set_tweets 함수에 전달하면 되니 훨씬 효율적이다.
        dbService
            .collection("tweets")
            .orderBy("createdAt", "desc")
            .onSnapshot((snapshot => {
            const newArray = snapshot.docs.map((document) => ({
                id: document.id, ...document.data()
            }));
            set_tweets(newArray)
        }))
    }, [])
    // console.log("tweets : ", tweets);



    return (
        <div className="container">
            <TweetFactory userObj={ userObj } />
            <div style={{ marginTop: 30 }}>
                { tweets.map((tweet) => (
                    // <div key={ tweet.id }>
                    //     <h4>{ tweet.text }</h4>
                    // </div>
                    <Tweet key={ tweet.id } tweetObj={ tweet } isOwner={ tweet.creatorId === userObj.uid } />
                )) }
            </div>
        </div>

    )
}

export default Home;


