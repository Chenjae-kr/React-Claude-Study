import { useState, useEffect } from 'react'
import { Box, Typography, Paper, Button, Divider, CircularProgress } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import type { Post } from '../../types/post'
import { postApi } from '../../api/postApi'

interface PostDetailProps {
  onDelete: (id: number) => void
}

export default function PostDetail({ onDelete }: PostDetailProps) {
  const navigate = useNavigate()
  const { id } = useParams()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return
      try {
        setLoading(true)
        const data = await postApi.getById(Number(id))
        setPost(data)
      } catch (err) {
        setError('게시글을 불러오는데 실패했습니다.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [id])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error || !post) {
    return (
      <Box>
        <Typography variant="h5">{error || '게시글을 찾을 수 없습니다.'}</Typography>
        <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>
          목록으로
        </Button>
      </Box>
    )
  }

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      onDelete(post.id)
      navigate('/')
    }
  }

  return (
    <Box>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          {post.title}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, color: 'text.secondary', mb: 2 }}>
          <Typography variant="body2">작성자: {post.author}</Typography>
          <Typography variant="body2">작성일: {post.createdAt}</Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', minHeight: 200 }}>
          {post.content}
        </Typography>
      </Paper>
      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
        <Button variant="outlined" onClick={() => navigate('/')}>
          목록
        </Button>
        <Button variant="outlined" color="primary" onClick={() => navigate(`/edit/${post.id}`)}>
          수정
        </Button>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          삭제
        </Button>
      </Box>
    </Box>
  )
}
