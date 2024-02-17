import './UsersCells.css';
import UserCell from '../UserCell/UserCell';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
const UsersCells = ({ users }) => {
    const [isPageLoading, setIsPageLoading] = useState(users === undefined);
    const token = useSelector((state) => state.user.token);
    const myID = useSelector((state) => state.user.user).id;

    useEffect(() => {
        if (users !== undefined && token && myID) {
            setIsPageLoading(false);
            console.log(users);
        }
    }, [users, token, myID]);

    if (isPageLoading) {
        return (
            <LoadingPage/>
        );
    }

    if (users.length === 0) {
        return <></>;
    }

    return (
        <div className="users-cells-container">
            {users.map((user) => (
                <UserCell
                    key={user.id}
                    id={user.id}
                    name={user.name}
                    username={user.username}
                    avatar={user.avatar}
                    bio={user.bio === 'null' ? '' : user.bio}
                    followsMe={user.followsMe}
                    followedByMe={user.followedByMe}
                    blocksMe={user.blocksMe}
                    blockedByMe={user.blockedByMe}
                    token={token}
                    myID={myID}
                />
            ))}
        </div>
    );
};

export default UsersCells;
