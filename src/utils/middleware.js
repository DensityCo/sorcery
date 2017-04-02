const middleware = {};

const addMiddleware = (type, callback) => {
  const chain = middleware[type] || [];
  chain.push(callback);
}

const runMiddleware = (type, input) => {
  const chain = middleware[type] || [];
  return chain.reduce((a, n) => n(a), input);
}

export default {
  addMiddleware: addMiddleware,
  runMiddleware: runMiddleware
}
