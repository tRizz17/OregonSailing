import React, { useState, useRef, useEffect } from "react";

function SailingTermButton() {
  const [term, setTerm] = useState("");
  const [showTerm, setShowTerm] = useState(false);
  const buttonRef = useRef();
  const termRef = useRef();

  const getTerm = async () => {
    if (showTerm) {
      setShowTerm(false);
      return;
    }
    const res = await fetch(`${import.meta.env.VITE_API_URL}/terms`);
    const data = await res.json();
    setTerm(data.term);
    setShowTerm(true);
  };

  useEffect(() => {
    if (!showTerm) return;
    function handleClickOutside(event) {
      if (
        termRef.current &&
        !termRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowTerm(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showTerm]);

  return (
    <div className="relative flex flex-col items-end">
      <button
        ref={buttonRef}
        onClick={getTerm}
        className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition-colors"
      >
        Get Sailing Term
      </button>
      {showTerm && term && (
        <div
          ref={termRef}
          className="absolute right-0 mt-2 z-50 max-w-xs bg-white border border-blue-200 rounded shadow p-3 text-sm text-gray-800"
          style={{ minWidth: "200px" }}
        >
          {term}
        </div>
      )}
    </div>
  );
}

export default SailingTermButton;