import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header">
      <Link to="/" className="header--link header--link__brand">
        Recipe Finder
      </Link>
      <Link to="/recipes/new" className="header--link header--link__new">
        New Recipe
      </Link>
    </div>
  );
};

export default Header;
