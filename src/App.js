import { RecoilRoot } from 'recoil';
import Editor from './components/Editor/Editor';
import TodoList from './components/Todo/TodoList';

function App() {
  return (
    <RecoilRoot>
      {/* <TodoList /> */}
      <Editor />
    </RecoilRoot>
  );
}

export default App;
