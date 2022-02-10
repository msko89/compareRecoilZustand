import { RecoilRoot } from 'recoil';
import Editor from './components/Editor/Editor';
import TodoList from './components/TodoList';

function App() {
  return (
    <RecoilRoot>
      {/* <TodoList /> */}
      <Editor />
    </RecoilRoot>
  );
}

export default App;
