import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './routes/routes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <Toaster/>
      <RouterProvider router={router}>

      </RouterProvider>
    </div>
  );
}

export default App;
