import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import FileUpload from "../../utils/FileUpload";
import Axios from "axios";

const { TextArea } = Input;

const clothes = [
    { key: 1, value: "상의" },
    { key: 2, value: "하의" },
    { key: 3, value: "한벌옷" },
    { key: 4, value: "신발" },
    { key: 5, value: "모자" },
    { key: 6, value: "가방" },
    { key: 7, value: "악세사리" },
];

function UploadProductPage(props) {
    const [Title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Price, setPrice] = useState(0);
    const [Clothes, setClothes] = useState(1);
    const [Images, setImages] = useState([]);
    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value);
    };
    const DescriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value);
    };

    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value);
    };
    const clothesChangeHandler = (event) => {
        setClothes(event.currentTarget.value);
    };
    const updateImages = (newImages) => {
        setImages(newImages);
    };
    const submitHandler = (event) => {
        event.preventDefault();
        if (!Title || !Description || !Price || !Clothes || !Images)
            return alert("모든 값을 넣어주세요.");
        const body = {
            writer: props.user.userData._id,
            title: Title,
            description: Description,
            price: Price,
            images: Images,
            clothes: Clothes,
        };
        Axios.post("/api/product", body).then((response) => {
            if (response.data.success) {
                alert("상품 업로드에 성공 했습니다.");
                props.history.push("/");
            } else {
                alert("상품 업로드에 실패 했습니다.");
            }
        });
    };
    return (
        <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <h2>Upload</h2>
            </div>

            <Form onSubmit={submitHandler}>
                <FileUpload refreshFunction={updateImages} />
                <br />
                <br />
                <label>Name</label>
                <Input onChange={titleChangeHandler} value={Title} />
                <br />
                <br />
                <label>Description</label>
                <TextArea
                    onChange={DescriptionChangeHandler}
                    value={Description}
                />
                <br />
                <br />
                <label>Price</label>
                <Input
                    type="number"
                    onChange={priceChangeHandler}
                    value={Price}
                />
                <br />
                <br />
                <select onChange={clothesChangeHandler} value={Clothes}>
                    {clothes.map((item) => (
                        <option key={item.key} value={item.key}>
                            {item.value}
                        </option>
                    ))}
                </select>
                <br />
                <br />
                <Button htmlType="submit">Submit</Button>
            </Form>
        </div>
    );
}

export default UploadProductPage;
