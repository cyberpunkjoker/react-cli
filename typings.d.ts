declare module '*.css';
declare module '*.wav';

declare module '*.less' {
  const classes: {[key: string]: string};
  export default classes;
}

declare module '*.png';

declare type Dict = {
  [key: string]: any
}