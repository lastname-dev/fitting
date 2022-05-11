import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCartItems, removeCartItem } from "../../../_actions/user_actions";
import UserCardBlock from "./Sections/UserCardBlock";
import userImage from "./Sections/UserImage";
import { Empty } from "antd";
function CartPage(props) {
    const dispatch = useDispatch();

    const [Total, setTotal] = useState(0);
    const [ShowTotal, setShowTotal] = useState(false);
    useEffect(() => {
        let cartItems = [];

        if (props.user.userData && props.user.userData.cart) {
            if (props.user.userData.cart.length > 0) {
                props.user.userData.cart.forEach((item) => {
                    cartItems.push(item.id);
                });

                dispatch(
                    getCartItems(cartItems, props.user.userData.cart)
                ).then((response) => {
                    calculateTotal(response.payload);
                });
            }
        }
    }, [props.user.userData]);

    let calculateTotal = (cartDetail) => {
        let total = 0;
        cartDetail.map((item) => {
            total += parseInt(item.price, 10) * item.quantity;
        });
        setTotal(total);
        setShowTotal(true);
    };

    let removeFromCart = (productId) => {
        dispatch(removeCartItem(productId)).then((response) => {
            if (response.payload.productInfo.length <= 0) {
                setShowTotal(false);
            }
        });
    };
    return (
        <div style={{ width: "75%", margin: "0 auto" }}>
            <h2 style={{ textAlign: "center", whiteSpace: "pre" }}>My Cart</h2>

            <div style={{ position: "relative" }}>
                <img
                    style={{
                        width: "500px",
                        height: "600px",
                        position: "absolute",
                        marginTop: "50px",
                        paddingRight: "50px",
                    }}
                    src={`http://localhost:4000/${props.user.userData?.images}`}
                />
                <UserCardBlock
                    style={{ position: "absolute" }}
                    products={props.user.cartDetail}
                    removeItem={removeFromCart}
                />
            </div>

            {ShowTotal ? (
                <h1></h1>
            ) : (
                <div style={{ marginLeft: "50%", marginTop: "15%" }}>
                    <br />
                    <Empty description={false} />
                </div>
            )}
        </div>
    );
}

export default CartPage;
