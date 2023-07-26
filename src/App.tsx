import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home        from './pages/Home';
import BakeryOwner from './pages/BakeryOwner';
import Baker       from './pages/Baker';
import User        from './pages/User';
import DetalhePao  from './pages/DetalhePao';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/bakery-owner",
    element: <BakeryOwner />
  },
  {
    path: "/baker",
    element: <Baker />
  },
  {
    path: "/user",
    element: <User />
  },
  {
    path: "/details/:id",
    element: <DetalhePao />
  }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App
