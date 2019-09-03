// import React from 'react';
//
// import Input from '../../components/ui-components/CustomInput';
// import {
//   validateEmail,
//   validatePassword,
//   validateFirstName,
//   validateLastName,
//   validatePhone,
// } from '../../utils/validator';
//
// class SignUp extends React.Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       firstName: '',
//       lastName: '',
//       email: '',
//       phone: '',
//       password: '',
//       policy: false,
//
//       errorFirstName: '',
//       errorLastName: '',
//       errorEmail: '',
//       errorPhone: '',
//       errorPassword: '',
//       errorPolicy: '',
//     };
//
//     this.onChange = this.onChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//
//   onChange(e) {
//     const { value, name } = e.target;
//     this.setState({ [name]: value });
//   }
//
//   handleSubmit() {
//     const {
//       firstName,
//       lastName,
//       email,
//       phone,
//       password,
//       policy,
//     } = this.state;
//
//     const isFirstNameValid = validateFirstName(firstName);
//     const isLastNameValid = validateLastName(lastName);
//     const isEmailValid = validateEmail(email);
//     const isPasswordValid = validatePassword(password);
//     const isPhoneValid = validatePhone(phone);
//
//     if (
//       isEmailValid
//       && isPasswordValid
//       && isFirstNameValid
//       && isLastNameValid
//       && isPhoneValid
//       && policy
//     ) {
//       // send request to server
//     } else {
//       const newState = {};
//
//       if (!isEmailValid) newState.emailError = 'Email error';
//       if (!isPasswordValid) newState.passwordError = 'Password error';
//       if (!isFirstNameValid) newState.firstNameError = 'First name error';
//       if (!isLastNameValid) newState.lastNameError = 'Last name error';
//       if (!isPhoneValid) newState.phoneError = 'Phone error';
//       if (!policy) newState.policyError = 'Policy error';
//
//       this.setState(newState);
//     }
//   }
//
//   render() {
//     const {
//       firstName,
//       lastName,
//       email,
//       phone,
//       password,
//       policy,
//       errorFirstName,
//       errorLastName,
//       errorEmail,
//       errorPhone,
//       errorPassword,
//       errorPolicy,
//     } = this.state;
//     return (
//       <div className="form-wrapper">
//         <form action="" className="form" onSubmit={this.handleSubmit}>
//           <Input
//             value={firstName}
//             error={errorFirstName}
//             onChange={this.onChange}
//             name="firstName"
//             labelText="First name"
//           />
//           <Input
//             value={lastName}
//             error={errorLastName}
//             onChange={this.onChange}
//             name="lastName"
//             labelText="Last name"
//           />
//           <Input
//             value={email}
//             error={errorEmail}
//             onChange={this.onChange}
//             name="email"
//             labelText="Email address"
//           />
//           <Input
//             value={phone}
//             error={errorPhone}
//             onChange={this.onChange}
//             name="phone"
//             labelText="Phone"
//           />
//
//           <NewPasswordInput ref={passwordRef} />
//
//           <div className="policy-agreement">
//             <input type="checkbox" id="policy-agreement" />
//            <label htmlFor="policy-agreement">
//              I agree to the Terms of Service, Privacy Policy and Cookie Policy
//            </label>
//           </div>
//
//           <div className="form__bottom">
//             <button type="submit" className="button form__submit-btn">Sign up</button>
//           </div>
//         </form>
//       </div>
//     );
//   }
// }
//
// export default SignUp;
