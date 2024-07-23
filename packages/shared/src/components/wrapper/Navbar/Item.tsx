import React from "react";
import s from "./Navbar.module.scss";
import book from "../img/open-book.png";
import { Img } from "../../Img/Img";
import classNames from "classnames";

interface Props {
  title: string;
  i: number;
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
  photo: any;
}

export const Item: React.FC<Props> = ({
  title,
  active,
  i,
  setActive,
  photo,
}) => {
  return (
    <>
      <div
        onClick={() => {
          setActive(i);
        }}
        className={classNames({
          [s.navbar__item]: true,
          [s["navbar__item--active"]]: i === active,
        })}
      >
        <Img src={photo} w="22px" h="22px" />
        <div className={s["navbar__item-text"]}>{title}</div>
      </div>
    </>
  );
};
