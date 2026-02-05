import { useState } from 'react'
import { Box, TextField, Button, Typography, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import type { Post } from '../../types/post'

interface PostFormProps {
  onSubmit: (post: Omit<Post, 'id' | 'createdAt'>) => void
}

export default function PostForm({ onSubmit }: PostFormProps) {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim() || !author.trim()) {
      alert('모든 필드를 입력해주세요.')
      return
    }
    onSubmit({ title, content, author })
    navigate('/')
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
          />
          <TextField
            label="제목"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="내용"
            fullWidth
            multiline
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button type="submit" variant="contained">
              등록
            </Button>
            <Button variant="outlined" onClick={() => navigate('/')}>
              취소
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}
