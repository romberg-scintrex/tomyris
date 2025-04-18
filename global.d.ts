/// <reference types="react" />

declare interface ImportMeta {
  readonly hot?: {
    accept: () => void;
  };
}

declare module '*.png' {
  const value: string;
  export default value;
}
