import React from "react";

interface Props {
  src: any;
  shrink?: boolean;
  w: string;
  h: string;
}

export const Img: React.FC<Props> = ({ src, shrink = true, w, h }) => {
  return (
    <>
      {shrink ? (
        <div
          style={{
            position: "relative",
            maxWidth: w,
            width: `${shrink ? "100%" : ""}`,
            height: h,
          }}
        >
          <img
            src={src}
            style={{
              top: "0",
              left: "0",
              objectFit: "contain",
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
            alt=""
          />
        </div>
      ) : (
        <img src={src} style={{ width: w, height: h }} alt="" />
      )}
    </>
  );
};
