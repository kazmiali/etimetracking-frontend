import React from 'react';

import './error-boundary.styles.scss';

class ErrorBoundary extends React.Component {
  constructor() {
    super();

    this.state = {
      hasErrored: false,
    };
  }

  static getDerivedStateFromError(error) {
    // process the error
    return { hasErrored: true };
  }

  componentDidCatch(error, info) {
    console.error(error);
    console.error(info);
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <div className='error-image-overlay'>
          <div className='error-image-container' />
          <h2 className='error-image-text'>
            Somthing went wrong - This page is burnt to a Crisp
          </h2>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
