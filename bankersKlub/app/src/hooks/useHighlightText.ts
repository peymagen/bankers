import { useEffect } from "react";

const useHighlightText = (word: string, color: string = "#FF0059") => {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const highlightText = (node: Node) => {
      if (node.nodeType === 3) {
        // If it's a text node
        const regex = new RegExp(`\\b(${word})\\b`, "gi");
        if (regex.test(node.textContent || "")) {
          const span = document.createElement("span");
          span.style.color = color;
          span.style.fontWeight = "bold";
          span.textContent = node.textContent || "";
          node.parentNode?.replaceChild(span, node);
        }
      }
    };

    const processElements = (element: HTMLElement) => {
      element.childNodes.forEach(highlightText);
    };

    // Apply to existing elements
    const elements = document.querySelectorAll(
      "h1, h2, h3, p, span, div, li, td, th"
    );
    elements.forEach((element) => processElements(element as HTMLElement));

    // Observe new elements being added dynamically
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) processElements(node);
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect(); // Cleanup observer on unmount
  }, [word, color]); // Runs when `word` or `color` changes
};

export default useHighlightText;
