import React from 'react';
import './TextNoti.css';
import TicTacToe from '../Game/TicTacToe';

const TextNoti = ({ text }) => {
  return (
    <>
      <div className='noti-container'>
        <div className="waiting-text">
          {/* <TicTacToe /> */}
        </div>
        {/* <div className='game'>
          <TicTacToe />
        </div> */}
      </div>
    </>
  )
};

export default TextNoti;
