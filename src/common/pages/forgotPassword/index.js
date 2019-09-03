// import React from 'react';
// import { Link } from 'react-router-dom';
// import { NewPasswordInput } from '../NewPassword/newPasswordInput';
//
// export default function ForgotPassword({ handleSubmitBtn }) {
//   const passwordRef = React.createRef();
//
//   return (
//     <div className="form-wrapper">
//       <form action="" className="form" onSubmit={handleSubmitBtn}>
//
//         <NewPasswordInput ref={passwordRef} />
//
//         <div className="input-block form__row">
//           <label className="form__row-label">
//             Confirm password
//           </label>
//           <input ref={passwordRef} type="password" name="password" className="form__row-input" />
//         </div>
//         <div className="form__bottom form__bottom-flex-a">
//           <button type="submit" className="button form__submit-btn">Save</button>
//           <Link to="/login" className="button form__cancel-btn">Cancel</Link>
//         </div>
//       </form>
//     </div>
//   );
// }
