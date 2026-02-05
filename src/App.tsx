import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { Container, CssBaseline, AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import PostList from './components/board/PostList'
import PostForm from './components/board/PostForm'
import PostDetail from './components/board/PostDetail'
import RegisterForm from './components/auth/RegisterForm'
import LoginForm from './components/auth/LoginForm'
import type { Post } from './types/post'
import { postApi, type PostCreateRequest } from './api/postApi'
import type { UserResponse } from './api/authApi'

interface NavBarProps {
  user: UserResponse | null
  onLogout: () => void
}

function NavBar({ user, onLogout }: NavBarProps) {
  const navigate = useNavigate()

  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="a"
          href="/"
          sx={{ color: 'inherit', textDecoration: 'none', flexGrow: 1 }}
        >
          React 게시판
        </Typography>
        <Box>
          {user ? (
            <>
              <Typography component="span" sx={{ mr: 2 }}>
                {user.name}님
              </Typography>
              <Button color="inherit" onClick={onLogout}>
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/login')}>
                로그인
              </Button>
              <Button color="inherit" onClick={() => navigate('/register')}>
                회원가입
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

function App() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<UserResponse | null>(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const data = await postApi.getAll()
      setPosts(data)
    } catch (error) {
      console.error('게시글 로딩 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleLoginSuccess = (loggedInUser: UserResponse) => {
    setUser(loggedInUser)
    localStorage.setItem('user', JSON.stringify(loggedInUser))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const handleAddPost = async (newPost: PostCreateRequest) => {
    try {
      await postApi.create(newPost)
      await fetchPosts()
    } catch (error) {
      console.error('게시글 생성 실패:', error)
      alert('게시글 생성에 실패했습니다.')
    }
  }

  const handleDeletePost = async (id: number) => {
    try {
      await postApi.delete(id)
      await fetchPosts()
    } catch (error) {
      console.error('게시글 삭제 실패:', error)
      alert('게시글 삭제에 실패했습니다.')
    }
  }

  return (
    <BrowserRouter>
      <CssBaseline />
      <NavBar user={user} onLogout={handleLogout} />
      <Container maxWidth="md">
        <Routes>
          <Route path="/" element={<PostList posts={posts} loading={loading} />} />
          <Route path="/write" element={<PostForm onSubmit={handleAddPost} />} />
          <Route path="/post/:id" element={<PostDetail onDelete={handleDeletePost} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App
