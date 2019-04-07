import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props => {
  return ReactDOM.createPortal(
    <div onClick={props.onDismiss} className="modal">
      <div
        onClick={event => {
          event.stopPropagation();
        }}
        className="modal--content"
      >
        <div className="modal--content__title">{props.title}</div>
        <div className="modal--content__text">{props.content}</div>
        <div className="modal--content__actions">{props.actions}</div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;
