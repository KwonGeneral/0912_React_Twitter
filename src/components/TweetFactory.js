import {dbService, storageService} from "../fbase";
import {v4 as uuidv4} from "uuid";
import {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const TweetFactory = ({ userObj }) => {
    const [tweet, set_tweet] = useState("");
    const [attachment, set_attachment] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        if(tweet === "") {
            return
        }
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
        // reader.readAsDataURL(theFile)
        if(Boolean(theFile)) {
            reader.readAsDataURL(theFile)
        }
    };

    // 파일 취소
    const onClearAttachment = () => set_attachment("");

    return (
        <form onSubmit={ onSubmit } className="factoryForm">
            <div className="factoryInput__container">
                <input className="factoryInput__input" type="text" value={ tweet } onChange={ onChange }
                       placeholder="당신의 생각은?" maxLength={ 120 } />
                <input type="submit" value="&rarr;" className="factoryInput__arrow" />
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>사진 추가</span>
                <FontAwesomeIcon icon={ faPlus } />
            </label>
            <input id="attach-file" type="file" accept="image/*" onChange={ onFileChange } style={{ opacity: 0 }} />
            <input type="submit" value="Tweet"/>
            { attachment && (
                <div className="factoryForm__attachment">
                    <img src={ attachment } width="50px" height="50px" style={{ backgroundImage: attachment }}/>
                    <div className="factoryForm__clear" onClick={ onClearAttachment }>
                        <span>초기화</span>
                        <FontAwesomeIcon icon={ faTimes } />
                    </div>
                </div>
            )}
        </form>
    )
};

export default TweetFactory;