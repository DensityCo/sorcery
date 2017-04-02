const middleware = {};

const addMiddleware = (type, callback) => {
  middleware[type] = middleware[type] || [];
  middleware[type].push(callback);
}

const runMiddleware = (type, input) => {
  const chain = middleware[type] || [];
  return chain.reduce((a, n) => n(a), input);
}

export default {
  addMiddleware: addMiddleware,
  runMiddleware: runMiddleware
}
