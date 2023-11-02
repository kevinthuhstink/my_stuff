import React from 'react';

function Navbar() {
  return (
    <nav>
      <h1>KC (kevinthuhstink) learns React.js</h1>
      <ul className="nav_items">
        <li>Progress</li>
        <li>Projects</li>
      </ul>
    </nav>
  );
}

function Footer() {
  return (
    <footer>
      <h4 className="end">Email: kev72eat@gmail.com<br/>
        <a href="https://github.com/kevinthuhstink/kevinthuhstink">
          Github
        </a>
      </h4>
    </footer>
  );
}

export { Navbar, Footer };
