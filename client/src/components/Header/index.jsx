import React from 'react';

import './header.css';
import logoSrc from '../../imgs/ou-logo-big.png';

const Header = () => {
  return (
    <div className='header-div'>
      <img src={logoSrc} alt="over/under logo" />
      <h1 className='title'>Over / Under</h1>
      <p className="description">Quick stats to help you decide whether you should take the Over or the Under</p>
    </div>
  );
};

export default Header;
