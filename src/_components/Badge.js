import React from "react";

function getBadgeCssClassesByType(type) {
  let result = "badge";
  const classes = type.split("-");
  classes.forEach((cl) => {
    result = `${result} badge-${cl}`;
  });
  return result;
}

export function Badge({ type, value }) {
  return (
    <span className={getBadgeCssClassesByType(type)} role="listitem">
      € {value}
    </span>
  );
}
