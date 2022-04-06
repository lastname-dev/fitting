import React from "react";
import { Icon, Col, Row, Card, Carousel } from "antd";
function ImageSlider(props) {
    return (
        <div>
            <Carousel autoplay>
                {props.images.map((image, index) => (
                    <div key={index}>
                        <img
                            style={{ width: "100%", maxHeight: "150px" }}
                            src={`http://localhost:4000/${image}`}
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    );
}

export default ImageSlider;
