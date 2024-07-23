declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg" {
    const content: any;
    export default content;
}

declare const __PLATFORM__: "mobile" | "desktop";
declare const __ENV__: "production" | "development";