import React from 'react';

const Card = ({ title, count,loading }) => {
  return (
    <div className="bg-blue text-white p-4 rounded-[20px]">
      <div className="font-display text-lg">{title}</div>
      <div className={`font-display text-2xl`}>{loading ? "Loading" : count}</div>
    </div>
  );
};

export default Card;