// import React, { useState } from 'react';
// import { renderPasswordIndicator } from './passwordIndicator';
//
// export const NewPasswordInput = React.forwardRef((props, ref) => {
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [passwordValue, setPasswordValue] = useState('');
//
//   return (
//     <div className="input-block form__row">
//       <label className="form__row-label">
//         Password
//         {renderPasswordIndicator(passwordValue)}
//       </label>
//       <div className="position-relative">
//         <input
//           ref={ref}
//           name="password"
//           onChange={event => setPasswordValue(event.target.value)}
//           value={passwordValue}
//           type={passwordVisible ? 'text' : 'password'}
//           className="form__row-input"
//         />
//         <button
//           className="toggle-password-visibility"
//           type="button"
//           onClick={() => setPasswordVisible(!passwordVisible)}
//         >
//           <i className={`fas ${passwordVisible ? 'fa-eye' : 'fa-eye-slash'}`}>&nbsp;</i>
//         </button>
//       </div>
//       <span className="form__row-tooltip">At least 8 characters</span>
//     </div>
//   );
// });
