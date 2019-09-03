// import React from 'react';
//
// export const renderPasswordIndicator = (passwordValue) => {
//   if (passwordValue.trim().length < 8) return;
//
//   let level = 1;
//
//   if (!/[a-zA-Z]/.test(passwordValue)) return;
//
//   if (/[a-zA-Z]/.test(passwordValue) && /[A-Z]/.test(passwordValue)) {
//     level = 2;
//     if (/[0-9]/.test(passwordValue)) level = 3;
//   } else if (/[a-zA-Z]/.test(passwordValue) && /[0-9]/.test(passwordValue)) level = 2;
//
//   const levelName = level === 1 ? 'WEAK' : level === 2 ? 'NORMAL' : 'STRONG';
//
//   return (
//     <div className="password-strength">
//       <span className="password-strength__name">{levelName}</span>
//       <div className="password-strength__indicator">
//         <span
//           style={{
//             backgroundColor: level === 1
//               ? 'red'
//               : level === 2
//                 ? 'darkorange'
//                 : '#13c29b',
//           }}
//         >
//           &nbsp;
//         </span>
//         <span
//           style={{
//             backgroundColor: level === 1
//               ? '#E6E9EE'
//               : level === 2
//                 ? 'darkorange'
//                 : '#13c29b',
//           }}
//         >
//           &nbsp;
//         </span>
//         <span
//           style={{
//             backgroundColor: level === 1
//               ? '#E6E9EE'
//               : level === 2
//                 ? '#E6E9EE'
//                 : '#13c29b',
//           }}
//         >
//           &nbsp;
//         </span>
//       </div>
//     </div>
//   );
// };
