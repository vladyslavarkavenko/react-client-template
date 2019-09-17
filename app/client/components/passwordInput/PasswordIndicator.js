import React from 'react';

const levelsName = ['WEAK', 'NORMAL', 'STRONG'];
const indicatorsColors = [
  ['red', 'darkorange', '#13c29b'],
  ['#E6E9EE', 'darkorange', '#13c29b'],
  ['#E6E9EE', '#E6E9EE', '#13c29b'],
];

export default function PasswordIndicator({ value }) {
  if (!value || value.trim().length < 8) {
    return null;
  }

  const lowerCaseUsed = /[a-z]/.test(value);
  const upperCaseUsed = /[A-Z]/.test(value);
  const numbersUsed = /[0-9]/.test(value); // TODO: Add special symb.

  const level = [lowerCaseUsed, upperCaseUsed, numbersUsed].filter(b => b).length;

  const Indicator = ({ n }) => (
    <span
      style={{
        backgroundColor: indicatorsColors[n][level - 1],
      }}
    >
      &nbsp;
    </span>
  );

  return (
    <div className="password-strength">
      <span className="password-strength__name">{levelsName[level - 1]}</span>
      <div className="password-strength__indicator">
        <Indicator n={0} />
        <Indicator n={1} />
        <Indicator n={2} />
      </div>
    </div>
  );
}
