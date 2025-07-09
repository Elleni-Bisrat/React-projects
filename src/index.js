import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Faraway from "./faraway";



export default function App(){
  return (
    <div>
      <Faraway />
    </div>
  )
}




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

