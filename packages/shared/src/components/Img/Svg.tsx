import React from "react";

interface Props {
  src: any;
  shrink?: boolean;
  w: string;
  h: string;
}

export const Svg: React.FC<Props> = ({ src, shrink = true, w, h }) => {
  return (
    <>
      <div
        style={{
          backgroundImage: "url(/images/)",
          width: "100px",
          height: "100px",
        }}
      ></div>
    </>
  );
};
