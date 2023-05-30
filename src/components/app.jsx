/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter, Routes, Route, NavLink, useParams } from 'react-router-dom';
import MusicVAEPlayer from './musicVAE_player';
import DrumsRNNPlayer from './drumsRNN_player';

const Welcome = (props) => {
  return <div className='webpage'><h1> Welcome to the Magenta GUI web app!</h1></div>;
}

const MusicVAEPage = (props) => {
    return <div><MusicVAEPlayer /></div>;
};

const MusicRNNPage = (props) => {
    return <div><DrumsRNNPlayer /></div>
};

const Nav = (props) => {
    return (
      <nav>
        <ul id='nav-bar'>
            <li className='nav-item'><NavLink to="/">Home</NavLink></li>
            <li className='nav-item'><NavLink to="/musicVAE">Music VAE</NavLink></li>
            <li className='nav-item'><NavLink to="/musicRNN">Music RNN</NavLink></li>
        </ul>
      </nav>
    );
};

// const Test = (props) => {
//     const { id } = useParams();
//     return <div> ID: {id} </div>;
// };

const FallBack = (props) => {
    return <div>URL Not Found</div>;
};

const App = (props) => {
    return (
      <BrowserRouter>
        <div>
          <Nav />
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/musicVAE" element={<MusicVAEPage />} />
                <Route path="/musicRNN" element={<MusicRNNPage />} />
                <Route path="*" element={<FallBack />} />
            </Routes>
        </div>
      </BrowserRouter>
    );
  };

  export default App;