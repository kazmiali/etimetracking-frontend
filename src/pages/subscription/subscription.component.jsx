import React, { Fragment, useState } from 'react';
import { MdCheck } from 'react-icons/md';

import Header from '../../components/header/header.component';
import Footer from '../homepage/homepage-sections/footer.component';
import StripeCheckoutButton from '../../components/stripe-checkout-button/stripe-checkout-button.component';

import './subscription.styles.scss';
import { connect } from 'react-redux';

const SubscriptionPage = ({ currentUser }) => {
  const [paymentVal, setPaymentVal] = useState(0);
  const [empNumForPayment, setEmpNumForPayment] = useState(0);
  const [calculatorEmpVal, setCalculatorEmpVal] = useState(0);
  const [calculatorEmpResVal, setCalculatorEmpResVal] = useState(0);

  const handleChange = (e) => {
    let value = e.target.value;
    if (value < 0) {
      return;
    }
    setCalculatorEmpVal(value);
    if (value <= 30) {
      setCalculatorEmpResVal(value);
    } else {
      value = value - 30;
      value = value * 0.5;
      value = value + 30;
      setCalculatorEmpResVal(value);
    }
  };

  const handlePaymentChange = (e) => {
    let value = e.target.value;
    if (value < 0) {
      return;
    }

    setPaymentVal(value);
    if (value <= 30) {
      setEmpNumForPayment(value);
    } else {
      value = value - 30;
      value = value * 0.5;
      value = value + 30;
      setEmpNumForPayment(value);
    }
  };

  return (
    <Fragment>
      <Header />
      <div className='subscription-page'>
        <div className='subscription-price'>
          <div className='container d-flex price-section'>
            <div className='mobile-dollar-section'>
              <div className='dollar-section'>
                <img
                  className='one'
                  src={require('../../assets/images/1-grey.png')}
                  alt='1 written as'
                />
                <div className='text-part price-showcase-list '>
                  <h2 className='rating-h2 time-heading bold'>
                    $ PER EMPLOYEE
                  </h2>
                  <div className='statements-list'>
                    <div className='statement'>
                      <MdCheck className='statement-icon' />
                      Affordable
                    </div>
                    <div className='statement'>
                      <MdCheck className='statement-icon' />
                      Track hours using a timer
                    </div>
                    <div className='statement'>
                      <MdCheck className='statement-icon' />
                      One time payment per employee
                    </div>
                    <div className='statement'>
                      <MdCheck className='statement-icon' />
                      Discount on more than 30 employees
                    </div>
                  </div>
                </div>
              </div>
              <div className='mobile-section'>
                <figure className='iphonex'>
                  <div className='m-content'>
                    <h2>Calculate charges</h2>

                    <p>How many employess you want to pay for ?</p>

                    <input
                      type='number'
                      className='input subscription-input'
                      onChange={handleChange}
                      value={calculatorEmpVal}
                    />

                    <span>You will be charged:</span>

                    <span className='payment-value'>
                      ${calculatorEmpResVal ? calculatorEmpResVal : 0}
                    </span>
                  </div>
                </figure>
              </div>
            </div>
          </div>
        </div>
        <div className='payment-section'>
          <div className='container'>
            <h1 className='page-h1'>Get more from Clockify!</h1>
            <p className='lead'>
              Upgrade Syed Muhammad Ali Kazmi's workspace workspace
              and get even more features.
            </p>
            <div className='FAQ-payment-wrapper'>
              <div className='FAQ'>
                <h3>Frequently asked questions</h3>
                <p className='q'>Can I try it out first?</p>
                <p className='a'>
                  Absolutely! You can try out all the paid features
                  for free for one whole week, no credit card
                  required. Activate free trial now.
                </p>
                <p className='q'>
                  What types of payment are supported?
                </p>
                <p className='a'>
                  We support only payments by credit card.
                </p>
                <p className='q'>Are there any additional taxes?</p>
                <p className='a'>
                  No, we take care of all the taxes. The price you see
                  is what you'll get charged.
                </p>

                <p className='q'>Do you offer refunds?</p>
                <p className='a'>We don't offer refunds.</p>
              </div>
              <div className='payment-area'>
                <h2>Calculate charges</h2>

                {currentUser.isOnTrial && (
                  <p>You currently on a 7 days trial.</p>
                )}

                {currentUser.hasPaid === true &&
                  currentUser.isOnTrial === false && (
                    <p>
                      You currently have{' '}
                      {currentUser.employeesAllowed} employees plan
                    </p>
                  )}

                {currentUser.hasPaid === false &&
                  currentUser.isOnTrial === false && (
                    <p>
                      Your trial is over. Please pay to continue or
                      you can be invited to someone's workspace.
                    </p>
                  )}

                <p>How many employess you want to pay for ?</p>

                <input
                  type='number'
                  className='input subscription-input'
                  onChange={handlePaymentChange}
                  value={paymentVal}
                />

                <span className='payment-text'>
                  You will be charged:
                </span>

                <span className='payment-value'>
                  ${empNumForPayment}
                </span>

                <StripeCheckoutButton
                  price={empNumForPayment}
                  employeesNum={paymentVal}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(SubscriptionPage);
