import type { Post } from '../types/post'

const API_BASE_URL = 'http://localhost:8080/api'

export interface PostCreateRequest {
  title: string
  content: string
  author: string
}

export const postApi = {
  async getAll(): Promise<Post[]> {
    const response = await fetch(`${API_BASE_URL}/posts`)
    if (!response.ok) {
      throw new Error('게시글 목록을 불러오는데 실패했습니다.')
    }
    return response.json()
  },

  async getById(id: number): Promise<Post> {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`)
    if (!response.ok) {
      throw new Error('게시글을 불러오는데 실패했습니다.')
    }
    return response.json()
  },

  async create(post: PostCreateRequest): Promise<Post> {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    })
    if (!response.ok) {
      throw new Error('게시글 생성에 실패했습니다.')
    }
    return response.json()
  },

  async update(id: number, post: PostCreateRequest): Promise<Post> {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    })
    if (!response.ok) {
      throw new Error('게시글 수정에 실패했습니다.')
    }
    return response.json()
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('게시글 삭제에 실패했습니다.')
    }
  },
}
