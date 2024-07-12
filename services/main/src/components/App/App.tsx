import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import { Navbar } from "@packages/shared/src/components/wrapper/Navbar/Navbar";
import { Wrapper } from "@packages/shared/src/components/wrapper/Wrapper/Wrapper";
import { Img } from "@packages/shared/src/components/Img/Img";
import arrow from "@packages/shared/src/components/wrapper/img/arrow.png";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { useSelector } from "react-redux";

export const App = () => {
  // useSelector
  // useTheme
  return (
    <Provider store={store}>
      {/* <Navbar /> */}
      {/* <div style={{height:'10000px'}}></div> */}
      <Wrapper>
        <div style={{display:'flex',width:'100%',justifyContent:'space-between'}}>
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione impedit provident consequuntur. Assumenda asperiores iusto neque alias architecto? Enim repudiandae, et omnis, assumenda voluptate ducimus dolores impedit blanditiis laborum officia praesentium perferendis facilis adipisci corporis tenetur repellat quisquam. Quam, officiis veniam aperiam doloribus reiciendis velit beatae tenetur ad harum eius doloremque ipsum pariatur corporis hic nostrum eum autem quas quidem, dolores recusandae, illum soluta asperiores maxime praesentium. Doloremque natus, tempore ratione commodi, distinctio voluptas quaerat fugiat omnis optio veritatis magni voluptatibus amet nam aliquid blanditiis saepe? Quisquam dicta sit voluptatibus necessitatibus itaque eligendi? Explicabo rerum esse expedita sint dicta aliquid cupiditate nihil eos modi laboriosam tempore ipsa, accusantium praesentium nobis neque temporibus atque earum natus minima illo magnam vitae eligendi. Sequi voluptate nisi nam delectus, est exercitationem cupiditate aperiam, laudantium vero impedit dolor at fugit. Neque ab similique nostrum adipisci illo? Molestiae, harum! Tempore maiores repellat illum ex quia odit similique esse! Temporibus similique earum, magni corrupti sed facere non culpa incidunt eveniet, vero accusamus inventore ducimus exercitationem praesentium blanditiis saepe enim. Nesciunt quos dolores fuga. Nihil fuga eligendi quam recusandae voluptatem quo numquam explicabo similique porro rerum! At minus maiores veniam, natus fuga temporibus amet voluptas labore soluta doloremque.</div>
      </Wrapper>
    </Provider>
  );
};
