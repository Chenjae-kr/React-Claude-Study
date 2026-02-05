const API_BASE_URL = 'http://localhost:8080/api'

export interface UserRegisterRequest {
  name: string
  email: string
  password: string
}

export interface UserResponse {
  id: number
  name: string
  email: string
  createdAt: string
}

export const authApi = {
  async register(data: UserRegisterRequest): Promise<UserResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || '회원가입에 실패했습니다.')
    }

    return result
  },

  async checkEmail(email: string): Promise<boolean> {
    const response = await fetch(`${API_BASE_URL}/auth/check-email?email=${encodeURIComponent(email)}`)
    if (!response.ok) {
      throw new Error('이메일 확인에 실패했습니다.')
    }
    const result = await response.json()
    return result.exists
  },
}
