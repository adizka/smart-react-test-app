import React from "react";

function getBadgeCssClassesByType(type) {
  return type.split("-").reduce((acc, item) => `${acc} badge-${item}`, "badge");
}

export function Badge({ type, value }) {
  return (
    <span className={getBadgeCssClassesByType(type)} role="listitem">
      € {value}
    </span>
  );
}
