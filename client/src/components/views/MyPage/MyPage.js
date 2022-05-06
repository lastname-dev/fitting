import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Input } from "antd";
import ProfileUpload from "../../utils/ProfileUpload";
function MyPage(props) {
    const [Images, setImages] = useState([]);
    const updateImages = (newImages) => {
        setImages(newImages);
    };
    const submitHandler = (event) => {
        event.preventDefault();
        const body = {
            images: Images,
            email: props.user.userData.email,
        };
        axios.post("/api/product/hi", body).then((response) => {
            if (response.data.success) {
                alert("프로필 업로드에 성공 했습니다.");
                props.history.push("/");
            } else {
                alert("프로필 업로드에 실패 했습니다.");
            }
        });
    };
    useEffect(() => {
        axios.get("/api/product/").then((response) => {
            if (response.data.success) {
                props.history.push("/");
            } else {
                alert("Failed to enter mypage");
            }
        });
    }, []);

    return (
        <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <h2>Mypage</h2>
            </div>
            <Form on onSubmit={submitHandler}>
                <ProfileUpload refreshFunction={updateImages} />
                <br />
                <br />
                <div style={{ textAlign: "center" }}>
                    <Button htmlType="submit">Submit</Button>
                </div>
            </Form>
        </div>
    );
}

export default MyPage;
