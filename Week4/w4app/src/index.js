import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MyApp from './MyApp';
import Car from './Car';
import Yoda from './Yoda';
import Jan30 from './Jan30';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <div>
    <MyApp />
    <Car />
    <Yoda />
    <Jan30 />
  </div>
);
