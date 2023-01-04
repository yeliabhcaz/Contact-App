import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root, { loader as rootLoader, action as rootAction } from './routes/root';
import ErrorPage from './error-page';
import './index.css'
import Contact, { loader as contactLoader } from './routes/contact';
import EditContact, { action as editAction } from './routes/edit';
import DestroyContact, { action as destroyAction } from './routes/destroy';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader, 
    action: rootAction, 
    children: [
      {
        path: 'contacts/:contactId',
        element: <Contact />,
        errorElement: <ErrorPage />,
        loader: contactLoader,
      },
      {
        path: 'contacts/:contactId/edit',
        element: <EditContact />,
        loader: contactLoader,
        action: editAction
      }, 
      {
        path: 'contacts/:contactId/destroy',
        element: <DestroyContact />,
        action: destroyAction,
        errorElement: <div>Oops! There was an error.</div>
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
 