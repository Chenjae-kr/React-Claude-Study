import { useState } from 'react'
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Link,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { authApi, type LoginRequest, type UserResponse } from '../../api/authApi'

interface LoginFormProps {
  onLoginSuccess: (user: UserResponse) => void
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email.trim() || !password.trim()) {
      setError('이메일과 비밀번호를 입력해주세요.')
      return
    }

    try {
      setSubmitting(true)
      const data: LoginRequest = { email, password }
      const user = await authApi.login(data)
      onLoginSuccess(user)
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : '로그인에 실패했습니다.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
        로그인
      </Typography>
      <Paper sx={{ p: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="이메일"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
            disabled={submitting}
            required
          />
          <TextField
            label="비밀번호"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
            disabled={submitting}
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={submitting}
            sx={{ mb: 2 }}
          >
            {submitting ? <CircularProgress size={24} /> : '로그인'}
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2">
              계정이 없으신가요?{' '}
              <Link
                component="button"
                type="button"
                onClick={() => navigate('/register')}
                sx={{ cursor: 'pointer' }}
              >
                회원가입
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}
