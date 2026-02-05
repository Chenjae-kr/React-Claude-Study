import { useState } from 'react'
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { authApi, type UserRegisterRequest } from '../../api/authApi'

export default function RegisterForm() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('모든 필드를 입력해주세요.')
      return
    }

    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }

    if (password.length < 4) {
      setError('비밀번호는 최소 4자 이상이어야 합니다.')
      return
    }

    try {
      setSubmitting(true)
      const data: UserRegisterRequest = { name, email, password }
      await authApi.register(data)
      setSuccess(true)
      setTimeout(() => navigate('/'), 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : '회원가입에 실패했습니다.')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Alert severity="success" sx={{ mb: 2 }}>
          회원가입이 완료되었습니다! 잠시 후 메인 페이지로 이동합니다.
        </Alert>
      </Box>
    )
  }

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
        회원가입
      </Typography>
      <Paper sx={{ p: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="이름"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
            disabled={submitting}
            required
          />
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
            sx={{ mb: 2 }}
            disabled={submitting}
            required
            helperText="최소 4자 이상"
          />
          <TextField
            label="비밀번호 확인"
            type="password"
            fullWidth
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            sx={{ mb: 3 }}
            disabled={submitting}
            required
            error={passwordConfirm !== '' && password !== passwordConfirm}
            helperText={
              passwordConfirm !== '' && password !== passwordConfirm
                ? '비밀번호가 일치하지 않습니다'
                : ''
            }
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={submitting}
            >
              {submitting ? <CircularProgress size={24} /> : '가입하기'}
            </Button>
          </Box>
          <Button
            variant="text"
            fullWidth
            onClick={() => navigate('/')}
            disabled={submitting}
            sx={{ mt: 1 }}
          >
            취소
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}
