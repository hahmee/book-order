import React, {useContext, useEffect} from 'react';
import Modal from "./UI/Modal.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import Button from "./UI/Button.jsx";
import Input from "./UI/Input.jsx";
import cartContext from "../store/CartContext.jsx";
import {currencyFormatter} from "../util/formatting.js";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";


const requestConfig = {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
}
const Checkout = () => {
    const {items, clearCart, addItem, removeItem} = useContext(cartContext);
    const {progress,  showCheckout, hideCheckout} = useContext(UserProgressContext);
    const {data,sendRequest,error,clearData, isLoading} = useHttp('http://localhost:3000/orders', requestConfig);

    const cartTotal = items.reduce((acc, cur) => {
        return acc + cur.quantity * cur.price;
    }, 0);

    const closeModal = () => {
        hideCheckout();
        clearCart();
        clearData();
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const fd = new FormData(e.target);
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(JSON.stringify(
            {
                order: {
                    items: items,
                    customer: customerData,
                }
            }));

        // fetch('http://localhost:3000/orders', {method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(
        //         {
        //             order: {
        //                 items: items,
        //                 customer: customerData,
        //             }
        //         }
        //
        //     ),
        //
        // })

    }

    if(data && !error) {
        return (<Modal
            open={progress === 'checkout'}
            onClose={closeModal}>
            <h2>주문 완료</h2>
            <p>주문이 정상적으로 진행되었습니다..</p>
            <p>
                이메일로 영수증 발급해드렸습니다. 주문해주셔서 감사합니다.
            </p>
            <p className="modal-actions">
                <Button onClick={closeModal}>Okay</Button>
            </p>
        </Modal>);

    }

    let actions = (
        <>
            <Button type="button" textOnly onClick={hideCheckout}>
                닫기
            </Button>
            <Button>주문하기</Button>
        </>
    );

    if(isLoading) {
        actions = <span>로딩중입니다...</span>;
    }

    return (
        <Modal
            className="checkout"
            onClose={hideCheckout}
            open={progress === 'checkout'}
        >
            <form onSubmit={handleSubmit}>
                <h2>주문서</h2>
                Total Amount
                {currencyFormatter.format(cartTotal)}
                <Input label="성함" type="text" id="name"/>
                <Input label="이메일 주소" type="email" id="email"/>
                <Input label="휴대폰 번호" type="text" id="phone-number"/>
                <div className="control-row">
                    <Input label="주소" type="text" id="address"/>
                    <Input label="우편번호" type="text" id="postal-code"/>
                </div>

                {error && <Error title="주문 실패했습니다." message={error} />}

                <p className="modal-actions">{actions}</p>
            </form>
        </Modal>
    );
}

export default Checkout;