import { Box, Typography, Paper, Button, Divider } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import type { Post } from '../../types/post'

interface PostDetailProps {
  posts: Post[]
  onDelete: (id: number) => void
}

export default function PostDetail({ posts, onDelete }: PostDetailProps) {
  const navigate = useNavigate()
  const { id } = useParams()
  const post = posts.find((p) => p.id === Number(id))

  if (!post) {
    return (
      <Box>
        <Typography variant="h5">게시글을 찾을 수 없습니다.</Typography>
        <Button onClick={() => navigate('/')}>목록으로</Button>
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
        <Button variant="outlined" color="error" onClick={handleDelete}>
          삭제
        </Button>
      </Box>
    </Box>
  )
}
