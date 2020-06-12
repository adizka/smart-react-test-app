import React from "react";
import PropTypes from "prop-types";

function getBadgeCssClassesByType(type) {
  return type.split("-").reduce((acc, item) => `${acc} badge-${item}`, "badge");
}

function Badge({ type, value }) {
  console.log('value', typeof value, value);
  return (
    <span className={getBadgeCssClassesByType(type)} role="listitem">
      € {value}
    </span>
  );
}

Badge.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
};

export {Badge};