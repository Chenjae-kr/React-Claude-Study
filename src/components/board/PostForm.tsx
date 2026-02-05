import { useState, useEffect } from 'react'
import { Box, TextField, Button, Typography, Paper, CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import type { PostCreateRequest } from '../../api/postApi'
import type { Post } from '../../types/post'

interface PostFormProps {
  onSubmit: (post: PostCreateRequest) => Promise<void>
  initialData?: Post
  mode?: 'create' | 'edit'
}

export default function PostForm({ onSubmit, initialData, mode = 'create' }: PostFormProps) {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title)
      setContent(initialData.content)
      setAuthor(initialData.author)
    }
  }, [initialData])

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
      console.error('게시글 저장 실패:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const isEditMode = mode === 'edit'

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {isEditMode ? '글수정' : '글쓰기'}
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="작성자"
            fullWidth
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            sx={{ mb: 2 }}
            disabled={submitting || isEditMode}
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
              {submitting ? <CircularProgress size={24} /> : isEditMode ? '수정' : '등록'}
            </Button>
            <Button variant="outlined" onClick={() => navigate(-1)} disabled={submitting}>
              취소
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}
