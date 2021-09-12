
import { dbService, storageService } from "../fbase";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Tweet = ({ tweetObj, isOwner }) => {
    const [editing, set_editing] = useState(false);
    const [newTweet, set_newTweet] = useState(tweetObj.text);

    const toggleEditing = () => set_editing((prev) => !prev);

    const onChange = (event) => {
        const { target: { value } } = event;
        set_newTweet(value);
    }

    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까?");
        // console.log("ok : ", ok)
        if(ok) {
            // console.log("tweetObj.id : ", tweetObj.id);
            await dbService.doc(`tweets/${tweetObj.id}`).delete() // 작은 따옴표가 아닌 1 옆의 백틱
            // console.log("onDeleteClick data : ", data)
            if(tweetObj.attachmentUrl !== "") {
                await storageService.refFromURL(tweetObj.attachmentUrl).delete();
            }
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        // console.log("tweetObj.id, newTweet : ", tweetObj.id, newTweet)
        await dbService.doc(`tweets/${tweetObj.id}`).update({ text: newTweet });
        set_editing(false);
    }

    return (
        <div className="tweet">
            { editing ? (
                <>
                    <form onSubmit={ onSubmit } className="container tweetEdit">
                        <input onChange={ onChange } value={ newTweet } required placeholder="수정하기" autoFocus
                               className="formInput"/>
                        <input type="submit" value="수정하기" className="formBtn"/>
                    </form>
                    <button onClick={ toggleEditing } className="formBtn cancelBtn">취소</button>
                </>
            ) : (
                <>
                    <h4>{ tweetObj.text }</h4>
                    { tweetObj.attachmentUrl && (
                        <img src={ tweetObj.attachmentUrl } width="50px" height="50px" />
                    ) }
                    { isOwner && (
                            <div className="tweet__actions">
                                <span onClick={ onDeleteClick }>
                                    <FontAwesomeIcon icon={ faTrash } />
                                </span>
                                <span onClick={ toggleEditing }>
                                    <FontAwesomeIcon icon={ faPencilAlt } />
                                </span>
                            </div>
                        )
                    }
                </>
            )
            }

        </div>
    )
};

export default Tweet;

