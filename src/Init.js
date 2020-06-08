import React from "react";

function Init({ children }) {
  const previewLoading = document.getElementById("splash");
  if (previewLoading) {
    previewLoading.classList.remove("show");
  }

  return <>{children}</>;
}

export default Init;
