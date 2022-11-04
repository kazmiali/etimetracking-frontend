import { linearAlertBottom } from './swalMixins';

export const isDisplayNameValid = (displayName, clearState) => {
  if (displayName.length < 2) {
    if (displayName.length === 0) {
      linearAlertBottom.fire({
        icon: 'warning',
        title: 'Please enter name',
      });
      clearState();
      return false;
    }
    linearAlertBottom.fire({
      icon: 'warning',
      title: 'Name is too short',
    });
    clearState();
    return false;
  } else {
    return true;
  }
};

export const isEmailValid = (email, clearState) => {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let emailValid = emailRegex.test(String(email).toLowerCase());

  if (emailValid) {
    return true;
  } else {
    linearAlertBottom.fire({
      icon: 'warning',
      title: 'Please enter a valid Email!',
    });
    clearState();
    return false;
  }
};

export const isPasswordValid = (
  password,
  confirmPassword,
  clearState,
) => {
  if (password !== confirmPassword) {
    linearAlertBottom.fire({
      icon: 'warning',
      title: 'Passwords do not match',
    });
    clearState();
    return false;
  } else {
    return true;
  }
};

export const isPasswordLengthValid = (password, clearState) => {
  if (password.length < 6) {
    linearAlertBottom.fire({
      icon: 'warning',
      title: 'Passwords should be at least 6 characters long.',
    });
    clearState();
    return false;
  } else {
    return true;
  }
};

export const isEmpty = (
  stringToCheck,
  alertMessage = 'Input field is empty',
) => {
  if (stringToCheck.length <= 0) {
    linearAlertBottom.fire({
      icon: 'warning',
      title: alertMessage,
    });
    return true;
  } else {
    return false;
  }
};
