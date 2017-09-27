import React from 'react';

function Youtube({ liveURL }) {
  return (
    <div className="embed-responsive embed-responsive-16by9 youtube">
      <iframe title="youtube" className="embed-responsive-item" src={`https://www.youtube.com/embed/${liveURL}`} />
    </div>
  );
}

export default Youtube;
