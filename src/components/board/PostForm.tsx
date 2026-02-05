import { useState } from 'react'
import { Box, TextField, Button, Typography, Paper, CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import type { PostCreateRequest } from '../../api/postApi'

interface PostFormProps {
  onSubmit: (post: PostCreateRequest) => Promise<void>
}

export default function PostForm({ onSubmit }: PostFormProps) {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim() || !author.trim()) {
      alert('모든 필드를 입력해주세요.')
      return
    }
    try {
      setSubmitting(true)
      await onSubmit({ title, content, author })
      navigate('/')
    } catch (error) {
      console.error('게시글 등록 실패:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        글쓰기
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="작성자"
            fullWidth
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            sx={{ mb: 2 }}
            disabled={submitting}
          />
          <TextField
            label="제목"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
            disabled={submitting}
          />
          <TextField
            label="내용"
            fullWidth
            multiline
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ mb: 2 }}
            disabled={submitting}
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button type="submit" variant="contained" disabled={submitting}>
              {submitting ? <CircularProgress size={24} /> : '등록'}
            </Button>
            <Button variant="outlined" onClick={() => navigate('/')} disabled={submitting}>
              취소
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}
