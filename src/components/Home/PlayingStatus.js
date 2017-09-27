import React from 'react';
import PropTypes from 'prop-types';

function PlayingStatus({ canEnter, playing, greetingText }) {
  return (
    <div>
      {canEnter && playing && <h4>กิจกรรมเริ่มแล้ว</h4>}

      {canEnter && !playing && <h4>กิจกรรมกำลังจะเริ่ม</h4>}

      {!canEnter && playing && <h4>คุณไม่มีสิทธิ์เข้าร่วมในตอนนี้</h4>}

      {!canEnter &&
        !playing && (
          <div>
            <h5>{greetingText}</h5>
          </div>
        )}
    </div>
  );
}

PlayingStatus.propTypes = {
  canEnter: PropTypes.bool.isRequired,
  playing: PropTypes.bool.isRequired,
};

export default PlayingStatus;
