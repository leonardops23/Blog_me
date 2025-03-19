import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PostCard from '../components/PostCard';

function CategoryPage() {
  const { slug } = useParams();
  const [categoria, setCategoria] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obtenemos la información de la categoría
    axios.get(`/api/categorias/${slug}/`)
      .then(catResponse => {
        setCategoria(catResponse.data);
        
        // Una vez que tenemos la categoría, obtenemos los posts relacionados
        return axios.get(`/api/posts/?categoria=${slug}`);
      })
      .then(postsResponse => {
        setPosts(postsResponse.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
        setError('No se pudieron cargar los datos. Por favor, intenta de nuevo más tarde.');
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
        <p className="mt-2">Cargando...</p>
      </div>
    );
  }

  if (error || !categoria) {
    return (
      <div className="bg-red-100 text-red-800 p-4 rounded-md">
        {error || 'La categoría no fue encontrada.'}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Categoría: {categoria.nombre}
      </h1>
      
      {posts.length === 0 ? (
        <p className="text-gray-600">No hay posts disponibles en esta categoría.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
