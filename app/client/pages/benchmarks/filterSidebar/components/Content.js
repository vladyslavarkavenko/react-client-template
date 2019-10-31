import React from 'react';

/* eslint-disable */

import Head from './Head';
import SubjectList from './SubjectList';

export default function Content({ isOpen, handleModal, forwardRef, closeModalHandler }) {
  return (
    <aside
      className={`filter-sidebar__wrapper ${isOpen ? 'active' : ''}`}
      ref={forwardRef}
      onClick={closeModalHandler}
    >
      <div className="filter-sidebar__inner">
        <div className="filter-sidebar__content">
          <Head handleModal={handleModal} />

          <div className="filter-sidebar__body">
            <SubjectList isOpen={isOpen} />
          </div>
        </div>
      </div>
    </aside>
  );
}
