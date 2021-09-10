
import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => {
    return (
        <nav>
            <ul>
                <li> <Link to="/">홈</Link> </li>
                { userObj.displayName !== null ?
                    <li> <Link to="/profile">{ userObj.displayName }의 마이페이지</Link> </li> :
                    <li> <Link to="/profile">마이페이지</Link> </li>}
            </ul>
        </nav>
    )
};

export default Navigation;

