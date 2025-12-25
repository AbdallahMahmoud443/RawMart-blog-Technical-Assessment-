import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PostList from '../pages/PostList';
import PostDetail from '../pages/PostDetail';
import PostForm from '../pages/PostForm';
import ProtectedRoute from '../components/ProtectedRoute';
import Landing from '../pages/Landing';
import NotFound from '../pages/NotFound';
import ServerError from '../pages/ServerError';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="404" element={<NotFound />} />
        <Route path="500" element={<ServerError />} />
        <Route path="posts">
          <Route index element={<PostList />} />
          <Route path="create" element={
            <ProtectedRoute>
              <PostForm />
            </ProtectedRoute>
          } />
          <Route path=":id" element={<PostDetail />} />
          <Route path=":id/edit" element={
            <ProtectedRoute>
              <PostForm />
            </ProtectedRoute>
          } />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
