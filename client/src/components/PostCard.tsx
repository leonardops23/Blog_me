import PostContent from "./PostContent";
import { User } from "@/types";

interface Post {
  id: number;
  titulo: string;
  slug: string;
  autor: User;
  contenido: string;
  imagen_destacada: string;
  fecha_publicacion: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
  publicado: boolean;
}

const PostCard = ({ post }: { post: Post }) => {
  // Crear un extracto del contenido limitando a los primeros 200 caracteres
  const createExcerpt = (content: string) => {
    // Eliminar tags HTML para el extracto
    const stripHtml = content.replace(/<[^>]+>/g, '');
    return stripHtml.length > 300 
      ? `${stripHtml.substring(0, 300)}...` 
      : stripHtml;
  };

  return (
    <article className="mb-8">
      <div className="flex gap-3 max-w-[1100px] m-auto cursor-pointer rounded-lg p-4">
        {post.imagen_destacada && (
          <img
            src={post.imagen_destacada}
            alt={post.titulo}
            className="w-48 h-48 object-cover rounded-lg"
          />
        )}
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold mb-2">
            {post.titulo}
          </h1>
          <div>
            <p className="flex gap-2">
            <span className="text-sm font-semibold">
              {post.autor.first_name} {post.autor.last_name}
            </span>
            <span className="mx-2">•</span>
            <span className="text-sm font-semibold">
              {new Date(post.fecha_publicacion).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            </p>
          </div>
          <div className="text-gray-600">
            {/* Mostrar un extracto del contenido en lugar del contenido completo */}
            {createExcerpt(post.contenido)}
          </div>
        </div>
      </div>
    </article>
  )
}

export default PostCard;
