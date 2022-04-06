import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import axios from "axios";
import { Icon, Col, Row, Card, Carousel } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../utils/ImageSlider";
import CheckBox from "./Sections/CheckBox";
import { clothes } from "./Sections/Datas";
import SearchFeature from "./Sections/SearchFeature";
function LandingPage() {
    const [Products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(8);
    const [PostSize, setPostSize] = useState(0);
    const [Filters, setFilters] = useState({
        clothes: [],
        price: [],
    });
    const [SearchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        let body = {
            skip: Skip,
            limit: Limit,
        };

        getProducts(body);
    }, []);

    const getProducts = (body) => {
        axios.post("/api/product/products", body).then((response) => {
            if (response.data.success) {
                console.log(response.data);
                if (body.loadMore) {
                    setProducts([...Products, ...response.data.productInfo]);
                } else {
                    setProducts(response.data.productInfo);
                }
                setPostSize(response.data.postSize);
            } else {
                alert("상품들을 가져오는데 실패 하였습니다.");
            }
        });
    };
    const loadMoreHandler = () => {
        let skip = Skip + Limit;
        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true,
        };
        getProducts(body);
        setSkip(skip);
    };

    const renderCards = Products.map((product, index) => {
        return (
            <Col lg={6} md={8} xs={24} key={index}>
                <Card
                    cover={
                        <a href={`/product/${product._id}`}>
                            <ImageSlider images={product.images} />
                        </a>
                    }
                >
                    <Meta
                        title={product.title}
                        description={`$${product.price}`}
                    />
                </Card>
            </Col>
        );
    });
    const showFilterResults = (filters) => {
        let body = {
            skip: 0,
            limit: Limit,
            filters: filters,
        };
        getProducts(body);
        setSkip(0);
    };
    const handleFilters = (filters, category) => {
        const newFilters = { ...Filters };
        newFilters[category] = filters;
        showFilterResults(newFilters);
    };
    const updateSearchTerm = (newSearchTerm) => {
        let body = {
            skip: 0,
            limit: Limit,
            filter: Filters,
            searchTerm: newSearchTerm,
        };
        setSkip(0);
        setSearchTerm(newSearchTerm);
        getProducts(body);
    };
    return (
        <div style={{ width: "75%", margin: "3rem auto" }}>
            <div style={{ textAlign: "center" }}>
                <h2>
                    Shopping <Icon type="rocket" />
                </h2>
            </div>

            <CheckBox
                list={clothes}
                handleFilters={(filters) => handleFilters(filters, "clothes")}
            />
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    margin: "1rem auto",
                }}
            >
                <SearchFeature refreshFunction={updateSearchTerm} />
            </div>

            <Row gutter={[16, 16]}>{renderCards}</Row>

            <br />

            {PostSize >= Limit && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button onClick={loadMoreHandler}>More</button>
                </div>
            )}
        </div>
    );
}

export default LandingPage;
