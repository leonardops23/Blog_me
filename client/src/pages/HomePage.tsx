import React, {useState, useEffect} from "react"
import axios from "axios"
import PostCard from '../components/PostCard'

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/posts/')
      .then(response => {
        setPosts(response.data)
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <div>
        {loading ? (
          <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-2">Cargando artículo...</p>
        </div>
        ):(posts.map(post => (
          <PostCard post={post} />
        )))}
      </div>
    </div>
  )
}

export default HomePage
