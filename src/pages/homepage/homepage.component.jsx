import React, { Fragment } from 'react';

import Header from '../../components/header/header.component';

import Start from './homepage-sections/start.component';
import Ratings from './homepage-sections/ratings.component';
import Time from './homepage-sections/time.component';
import Reasons from './homepage-sections/reasons.component';
import Price from './homepage-sections/price.component';
import Testimonial from './homepage-sections/testimonial.component';
import Footer from './homepage-sections/footer.component';

const HomePage = () => (
  <Fragment>
    <Header />
    <div className='homepage'>
      <Start />
      <Ratings />
      <Time />
      <Reasons />
      <Price />
      <Testimonial />
      <Footer />
    </div>
  </Fragment>
);

export default HomePage;
