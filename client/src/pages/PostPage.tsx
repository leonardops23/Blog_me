
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const PostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/api/posts/${slug}`)
      .then(response => {
        setPost(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener: ', error)
      });
  }, [slug]);

  if (loading) {
    return (
      <div>
        <p>Cargando articulo...</p>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div>
        {error || 'El articulo no fue encontrado'}
      </div>
    )
  }

  return (
    <div>
      {post.titulo}
    </div>
  )
}

export default PostPage;
