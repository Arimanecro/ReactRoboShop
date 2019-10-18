export default (funcs: any[]) => {
  funcs.forEach((f: () => {}) => f());
};
