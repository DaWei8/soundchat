import React from "react";

interface SpinnerProps {
  size?: number;
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 32, color = "#000000" }) => {
  return (
    <div
      className={`animate-spin rounded-full border-t-2 border-r-2`}
      style={{
        width: size,
        height: size,
        borderColor: `${color} transparent transparent transparent`,
      }}
    />
  );
};

export default Spinner;
