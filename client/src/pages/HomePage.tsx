import React, {useState, useEffect} from "react"
import axios from "axios"
import PostCard from '../components/PostCard'

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('categoria/post/')
      .then(response => {
        setPosts(response.data)
      })
  })

  return (
    <div>
      <div>
        {posts.map(post => (
          <PostCard post={post}/>
        ))}
      </div>
    </div>
  )
}

export default HomePage
