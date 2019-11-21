import React from 'react';

// const SingleLine = ({ type, title, domain, value }) => {
//   const isMain = type === 'main';
//
//   return (
//     <div className="compare-scale">
//       <h1>{title}</h1>
//       <div className="flex-center w-100">
//         {isMain && <p>{value}</p>}
//         <div className="legend">
//           <div
//             className="whole"
//             style={{
//               height: '100%',
//               width: `${(value * 100) / domain}%`,
//               background: '#3EA0DA',
//               [`margin${isMain ? 'Right' : 'Left'}`]: 'auto'
//             }}
//           />
//         </div>
//         {!isMain && <p>{value}</p>}
//       </div>
//     </div>
//   );
// };

const MultipleLine = ({ domain, values, withPercent, title }) => {
  const ld = Math.floor((values[0] - values[1]) * 10) / 10; // left difference
  const rd = Math.floor((values[1] - values[0]) * 10) / 10; // right difference
  domain = domain || Math.max(...values);

  return (
    <div className="compare-scale">
      <h1>{title}</h1>
      <div className="flex-center w-100">
        <p>
          {values[0] ? `${values[0]}${withPercent ? '%' : ''}` : '—'}
          {values[1] && ld > 0 ? <span>+{ld}</span> : ''}
        </p>
        <div className="legend">
          <div
            className="left"
            style={{
              width: `calc(${values[0] / domain} * 50%)`,
              background: !values[1] || ld > 0 ? '#3EA0DA' : '#6F91BA'
            }}
          />
          <div className="separator" />
          <div
            className="right"
            style={{
              width: `calc(${values[1] / domain} * 50%)`,
              background: !values[0] || rd > 0 ? '#3EA0DA' : '#6F91BA'
            }}
          />
        </div>
        <p>
          {values[1] ? `${values[1]}${withPercent ? '%' : ''}` : '—'}
          {values[0] && rd > 0 ? <span>+{rd}</span> : ''}
        </p>
      </div>
    </div>
  );
};

export default MultipleLine;

// const CompareLine = ({ single, ...rest }) => single ? <SingleLine {...rest} /> : <MultipleLine {...rest} />;
// export default CompareLine;
