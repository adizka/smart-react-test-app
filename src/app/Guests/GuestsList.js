import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Badge } from "../../_components/Badge";

function GuestsList({ guests, title }) {
  const id = useMemo(Math.random, []);

  return (
    <div className="room__column">
      {guests && (
        <div className="box" role="list">
          <h5 id={id}>{title}</h5>
          <div aria-labelledby={id}>
            {guests.map((guest, index) => (
              <Badge type={guest.type} value={guest.price} key={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

GuestsList.propTypes = {
  guests: PropTypes.array,
  title: PropTypes.string,
};

export { GuestsList };
