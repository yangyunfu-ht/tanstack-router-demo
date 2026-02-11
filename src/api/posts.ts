import api from '@/request'

export interface Post {
  id: number
  title: string
  body: string
}

export const fetchPosts = async () => {
  const { data } = await api.get<Post[]>('/posts', {
    params: {
      _limit: 5,
    },
  })
  return data
}
