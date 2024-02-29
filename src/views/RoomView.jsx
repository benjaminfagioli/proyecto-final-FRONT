import React from "react";
import { useParams } from "react-router";

const RoomView = () => {
  const { number } = useParams();
  return (
    <>
      <div>{number}</div>
    </>
  );
};

export default RoomView;
