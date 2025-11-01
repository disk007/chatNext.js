import { useEffect, useState } from "react";

export const useModalRoot = () => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let el = document.getElementById("modal-root");
    if (!el) {
      el = document.createElement("div");
      el.id = "modal-root";
      document.body.appendChild(el);
    }
    setContainer(el);
  }, []);

  return container;
};
