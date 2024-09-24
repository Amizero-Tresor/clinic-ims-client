import React from 'react';

const Card = ({ title, count,loading }) => {
  return (
    <div className="bg-blue  hover:bg-white text-white hover:text-blue p-4 rounded-[20px] border  border-1 border-blue shadow-xl">
      <div className="font-display text-sm   ">{title}</div>
      <div className={`font-display text-xl`}>{loading ? "Loading..." : count}</div>
    </div>
  );
};

export default Card;