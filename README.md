# AsyncPreact
Declarative Promise Handling for Preact

```jsx
import { h } from 'preact';
import Async from './Async';

function App() {
  const promise$ = new Promise(...);

  return (
    <Async promise={promise$}>
      <Async.Pending>{() => <div>loading...</div>}</Async.Pending>
      <Async.Success>{({ value }) => <div>promise resolved with value: {value}</div>}</Async.Success>
      <Async.Error>{({ error }) => <div>uh oh - {error}</div>}</Async.Error>
    </Async>
  );
}

export default App;
```
