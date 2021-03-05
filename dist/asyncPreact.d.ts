export declare function useAsync<V>(
  promise: Promise<V>
):
  | {
      status: 'pending';
      value: null;
      error: null;
    }
  | {
      status: 'success';
      value: V;
      error: null;
    }
  | {
      status: 'error';
      value: null;
      error: any;
    };
interface AsyncComponent {
  (props: { promise: Promise<any>; children?: any }): any;
  Pending: any;
  Success: any;
  Error: any;
}
declare const Async: AsyncComponent;
export default Async;
