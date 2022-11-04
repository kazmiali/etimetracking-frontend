import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2';
import { signInSuccess } from '../../redux/user/user.actions';

const StripeCheckoutButton = ({
  price,
  employeesNum,
  isAuthenticated,
  currentUser,
  signInSuccess,
}) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_ZQINZScGPSSplRaFhWkRRl0200qxZCMmPf';

  const onToken = (token) => {
    console.log('token', token);
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token,
        currentUser,
        employeesNum,
        price,
      },
    })
      .then((response) => {
        console.log('response', response);
        signInSuccess(response.data.userRes);
        Swal.fire(
          'Payment Successful!',
          'Payment has been done.',
          'success',
        );
      })
      .catch((error) => {
        console.error('Payment Error: ', error);
        alert(
          'There was an issue with your payment. Please make sure to use the given credit card',
        );
      });
  };

  return (
    <StripeCheckout
      disabled={isAuthenticated ? (price <= 0 ? true : false) : true}
      label='Pay Now'
      name='E-Time Tracking Ltd.'
      img='https://svgshare.com/i/CUz.jpg'
      description={`Your Total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
      allowRememberMe={false}
    />
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  signInSuccess: (userData) => dispatch(signInSuccess(userData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StripeCheckoutButton);
