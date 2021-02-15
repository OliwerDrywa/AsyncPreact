import { useEffect, useState } from 'preact/hooks';

// the hook
export function useAsync<V>(promise: Promise<V>) {
  const [flatPromise, __set] = useState<
    | { status: 'pending'; value: null; error: null }
    | { status: 'success'; value: V; error: null }
    | { status: 'error'; value: null; error: any }
  >({ status: 'pending', value: null, error: null });

  useEffect(function () {
    let cancel: (reason?: any) => void;

    new Promise<V>(function (resolve, reject) {
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

// declarative component
interface AsyncComponent {
  (props: { promise: Promise<any>; children?: any }): any;
  Pending: any;
  Success: any;
  Error: any;
}

const Async: AsyncComponent = function ({ promise, children }) {
  const { status, value, error } = useAsync(promise);

  let child = children.find((child: any) => child?.type?.name === status);

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

Async.Pending = function pending({ children }: any) {
  return children({});
};
Async.Success = function success({ children, value, error }: any) {
  return children({ value, error });
};
Async.Error = function error({ children, value, error }: any) {
  return children({ value, error });
};

export default Async;
