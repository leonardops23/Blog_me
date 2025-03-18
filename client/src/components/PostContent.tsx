import DOMPurify from 'dompurify';

interface PostContentProps {
  contenido: string;
}

const PostContent = ({ contenido }: PostContentProps) => {
  // Sanitizar el contenido HTML
  const sanitizedContent = DOMPurify.sanitize(contenido, {
    ALLOWED_TAGS: [
      'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'strong', 'em', 'u', 'ul', 'ol', 'li',
      'figure', 'img', 'br', 'i', 'a', 'blockquote',
      'table', 'thead', 'tbody', 'tr', 'td', 'th'
    ],
    ALLOWED_ATTR: [
      'style', 'src', 'alt', 'width', 'height',
      'class', 'href', 'target', 'rel'
    ]
  });

  // Corregir rutas de imágenes si existe REACT_APP_API_URL
  const processedContent = process.env.REACT_APP_API_URL 
    ? sanitizedContent.replace(
        /src="\/media\//g,
        `src="${process.env.REACT_APP_API_URL}/media/`
      )
    : sanitizedContent;

  return (
    <div 
      className="post-content ck-content"
      dangerouslySetInnerHTML={{ __html: processedContent }} 
    />
  );
};

export default PostContent;
