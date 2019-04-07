import React from 'react';

const Modal = () => {
  return (
    <div className="modal fade" id="tileModal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="tileModalLabel">Tile Preview</h4>
            <button type="button" className="close" data-dismiss="modal">&times;</button>
          </div>
          <div className="modal-body" id="tileModalBody"></div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
