import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import type { Post } from '../../types/post'

interface PostListProps {
  posts: Post[]
}

export default function PostList({ posts }: PostListProps) {
  const navigate = useNavigate()

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">게시판</Typography>
        <Button variant="contained" onClick={() => navigate('/write')}>
          글쓰기
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={60}>번호</TableCell>
              <TableCell>제목</TableCell>
              <TableCell width={120}>작성자</TableCell>
              <TableCell width={120}>작성일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  게시글이 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post) => (
                <TableRow
                  key={post.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/post/${post.id}`)}
                >
                  <TableCell>{post.id}</TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>{post.createdAt}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
