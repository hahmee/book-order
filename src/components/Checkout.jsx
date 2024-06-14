import React, {useContext, useEffect} from 'react';
import Modal from "./UI/Modal.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import Button from "./UI/Button.jsx";

const Checkout = () => {
    const {progress,  showCheckout, hideCheckout} = useContext(UserProgressContext);


    return (
        <Modal
            className="checkout"
            onClose={hideCheckout}
            open={progress === 'checkout'}
        >
            <h2>Checkout</h2>
            <input type="text"/>

            <Button type="button" textOnly>
                Close
            </Button>
            <Button>Submit Order</Button>

        </Modal>
    );
}

export default Checkout;