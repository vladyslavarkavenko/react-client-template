import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavTabs({ navLinks = [] }) {
  if (!navLinks.length) {
    return null;
  }

  const list = navLinks.map(({ to, title, disabled }) => {
    if (disabled) {
      return (
        <li key={to} className="nav-tabs__item disabled">
          <span className="link">{title}</span>
        </li>
      );
    }

    return (
      <li key={to} className="nav-tabs__item">
        <NavLink to={to} className="link" activeClassName="active" exact>
          {title}
        </NavLink>
      </li>
    );
  });

  return <ul className="nav-tabs__list">{list}</ul>;
}
