declare module '*.module.scss' {
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames;
    export = classNames;
}

declare module "themaxopti-test";
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module "*.svg" {
    import React from "react";
    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}
declare module "*.mp4" {
    const src: string;
    export default src;
  }

declare const __PLATFORM__: 'mobile' | 'desktop';
declare const __ENV__: 'production' | 'development';