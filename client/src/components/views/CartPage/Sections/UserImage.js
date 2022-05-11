import React from "react";

function userImage(props) {
    const renderUserImage = (images) => {
        if (images.length > 0) {
            let image = images[0];
            return `http://localhost:4000/${image}`;
        }
    };
    return <img src={renderUserImage(props.user.images)} />;
}

export default userImage;
