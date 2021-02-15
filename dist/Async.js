'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.useAsync = void 0;
const hooks_1 = require('preact/hooks');
// the hook
function useAsync(promise) {
  const [flatPromise, __set] = hooks_1.useState({
    status: 'pending',
    value: null,
    error: null,
  });
  hooks_1.useEffect(function () {
    let cancel;
    new Promise(function (resolve, reject) {
      cancel = reject;
      promise.then(resolve, reject);
    }).then(
      value => __set({ status: 'success', value, error: null }),
      error => __set({ status: 'error', value: null, error })
    );
    return () => cancel(new Error('component unmounted'));
  }, []);
  return flatPromise;
}
exports.useAsync = useAsync;
const Async = function ({ promise, children }) {
  const { status, value, error } = useAsync(promise);
  let child = children.find(child => {
    var _a;
    return (
      ((_a = child === null || child === void 0 ? void 0 : child.type) ===
        null || _a === void 0
        ? void 0
        : _a.name) === status
    );
  });
  if (child === undefined) {
    switch (status) {
      case 'pending':
        throw new Error('<Async.Pending /> must be provided');
      case 'success':
        throw new Error('<Async.Success /> must be provided');
      case 'error':
        throw new Error('<Async.Error /> must be provided');
    }
  }
  child.props.value = value;
  child.props.error = error;
  return child;
};
Async.Pending = function pending({ children }) {
  return children({});
};
Async.Success = function success({ children, value, error }) {
  return children({ value, error });
};
Async.Error = function error({ children, value, error }) {
  return children({ value, error });
};
exports.default = Async;
