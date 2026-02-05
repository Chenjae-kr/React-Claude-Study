import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Container, CssBaseline, AppBar, Toolbar, Typography } from '@mui/material'
import PostList from './components/board/PostList'
import PostForm from './components/board/PostForm'
import PostDetail from './components/board/PostDetail'
import type { Post } from './types/post'

function App() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: '첫 번째 게시글입니다',
      content: '안녕하세요! 첫 번째 게시글 내용입니다.',
      author: '관리자',
      createdAt: '2024-01-01',
    },
  ])

  const handleAddPost = (newPost: Omit<Post, 'id' | 'createdAt'>) => {
    const post: Post = {
      ...newPost,
      id: posts.length > 0 ? Math.max(...posts.map((p) => p.id)) + 1 : 1,
      createdAt: new Date().toISOString().split('T')[0],
    }
    setPosts([post, ...posts])
  }

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter((p) => p.id !== id))
  }

  return (
    <BrowserRouter>
      <CssBaseline />
      <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar>
          <Typography variant="h6" component="a" href="/" sx={{ color: 'inherit', textDecoration: 'none' }}>
            React 게시판
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Routes>
          <Route path="/" element={<PostList posts={posts} />} />
          <Route path="/write" element={<PostForm onSubmit={handleAddPost} />} />
          <Route path="/post/:id" element={<PostDetail posts={posts} onDelete={handleDeletePost} />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App
