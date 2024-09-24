import React from 'react';

const PayPalButton = () => {
    const handleApprove = (data, actions) => {
        return actions.order.capture().then(async (details) => {
            // Handle successful payment
            console.log('Transaction completed by ' + details.payer.name.given_name);
            // You might want to save the transaction details to your backend here
        });
    };

    const handleCreateOrder = async (data, actions) => {
        const order = await fetch('/api/paypal/create-order', {
            method: 'post',
        });
        const orderData = await order.json();
        return orderData.id;
    };

    return (
        <div>
            <paypal.Buttons
                createOrder={handleCreateOrder}
                onApprove={handleApprove}
            />
        </div>
    );
};

export default PayPalButton;
