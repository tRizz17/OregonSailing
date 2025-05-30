import React, { useState, useRef, useEffect } from "react";

function SailingTipButton() {
  const [tip, setTip] = useState("");
  const [showTip, setShowTip] = useState(false);
  const buttonRef = useRef();
  const tipRef = useRef();

  const getTip = async () => {
    if (showTip) {
      setShowTip(false);
      return;
    }
    const res = await fetch(`${import.meta.env.VITE_API_URL}/tip`);
    const data = await res.json();
    setTip(data.tip);
    setShowTip(true);
  };

  // Hide tip when clicking outside
  useEffect(() => {
    if (!showTip) return;
    function handleClickOutside(event) {
      if (
        tipRef.current &&
        !tipRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowTip(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showTip]);

  return (
    <div className="relative flex flex-col items-end">
      <button
        ref={buttonRef}
        onClick={getTip}
        className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition-colors"
      >
        Get Sailing Tip
      </button>
      {showTip && tip && (
        <div
          ref={tipRef}
          className="absolute right-0 mt-2 z-50 max-w-xs bg-white border border-blue-200 rounded shadow p-3 text-sm text-gray-800"
          style={{ minWidth: "200px" }}
        >
          {tip}
        </div>
      )}
    </div>
  );
}

export default SailingTipButton;