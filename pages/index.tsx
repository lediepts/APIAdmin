import anime from "animejs";
import React, { useEffect, useState } from "react";
import Layout from "../components/UI/layout";

export default function Home() {
  const [state, setState] = useState<JSX.Element[]>();
  useEffect(() => {
    const el = new Array(
      Math.ceil(window.screen.width / 24) * Math.ceil(window.screen.height / 24)
    )
      .fill(1)
      .map((_v, i) => {
        return (
          <span
            key={i}
            className={`class${i} h-5 w-5 inline-block rounded-sm m-0.5`}
          ></span>
        );
      });
    setState(el);
  }, []);
  useEffect(() => {
    new Array(
      Math.ceil(window.screen.width / 24) * Math.ceil(window.screen.height / 24)
    )
      .fill(1)
      .map((_v, i) => {
        return anime({
          targets: `.class${i}`,
          keyframes: [
            { background: "#ce9160" },
            { background: "#0cf099" },
            { background: "#5c58c9" },
            { background: "#c958b0" },
            { background: "#00ba44" },
          ],
          duration: anime.random(500, 2500),
          easing: "easeInOutBounce",
          loop: true,
          autoplay: true,
          direction: "alternate",
        });
      });
  }, [state]);

  return (
    <Layout>
      <div className="bg-black h-screen flex flex-wrap justify-center items-center overflow-hidden ">
        {/* <div className=""> {state}</div> */}
      </div>
    </Layout>
  );
}
