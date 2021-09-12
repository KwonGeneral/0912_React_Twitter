import {dbService, storageService} from "../fbase";
import {v4 as uuidv4} from "uuid";
import {useState} from "react";

const TweetFactory = ({ userObj }) => {
    const [tweet, set_tweet] = useState("");
    const [attachment, set_attachment] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        /*
        await dbService.collection("tweets").add({
            text: tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        })
        set_tweet("");
         */

        let attachmentUrl = "";

        if(attachment !== "")  {
            // storageService.ref().child와 같이 스토리지 레퍼런스의 함수인 child를 사용하면 폴더, 파일 이름을 설정할 수 있다.
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`)

            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
            console.log("response 1 : ", response);
            console.log("response 2 : ", await response.ref.getDownloadURL());
        }

        await dbService.collection("tweets").add({
            text: tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl
        })
        set_tweet("");
        set_attachment("");
    }

    const onChange = (event) => {
        event.preventDefault();
        const { target: { value } } = event;

        set_tweet(value);
    }

    const onFileChange = (event) => {
        // console.log(event.target.files);
        const { target: { files } } = event;  // files = event.target.files
        const theFile = files[0]
        const reader = new FileReader();

        reader.onloadend = (finishedEvent) => {
            // console.log(finishedEvent);
            const { currentTarget : { result } } = finishedEvent  // result = finishedEvent.currentTarget.result
            set_attachment(result);
        };

        // readAsDataURL 함수는 파일 정보를 인자로 받아서 파일 위치를 URL로 반환해 준다.
        // 이ㅏ 함수는 리액트 생명주기 함수처럼 파일 선택 후, '웹 브라우저가 파일을 인식하는 시점', '웹 브라우저 파일 인식이 끝난 시점' 등을
        // 포함하고 있어서 시점까지 함께 관리해줘야 URL을 얻을 수 있다.
        reader.readAsDataURL(theFile)
    };

    // 파일 취소
    const onClearAttachment = () => set_attachment("");

    return (
        <form onSubmit={ onSubmit }>
            <input type="text" value={ tweet } onChange={ onChange } placeholder="당신의 생각은?" maxLength={ 120 } />
            <input type="file" accept="image/*" onChange={ onFileChange } />
            <input type="submit" value="Tweet"/>
            { attachment && (
                <div>
                    <img src={ attachment } width="50px" height="50px" />
                    <button onClick={ onClearAttachment }>초기화</button>
                </div>
            )}
        </form>
    )
};

export default TweetFactory;