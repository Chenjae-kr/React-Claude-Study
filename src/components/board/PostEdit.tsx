import { useState, useEffect } from 'react'
import { Box, CircularProgress, Typography, Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import PostForm from './PostForm'
import type { Post } from '../../types/post'
import { postApi, type PostCreateRequest } from '../../api/postApi'

interface PostEditProps {
  onSubmit: (id: number, post: PostCreateRequest) => Promise<void>
}

export default function PostEdit({ onSubmit }: PostEditProps) {
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

  const handleSubmit = async (data: PostCreateRequest) => {
    await onSubmit(post.id, data)
  }

  return <PostForm onSubmit={handleSubmit} initialData={post} mode="edit" />
}
