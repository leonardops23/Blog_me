import axios from "axios";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

interface Categoria {
  id: number;
  nombre: string;
  slug: string;
}

const Header = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    axios.get('/api/categorias/')
      .then(response => {
        setCategorias(response.data)
      })
      .catch(error => {
        console.error('Error al obtener categorias', error)
      })
  }, [])

  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4">
        <nav>
          <ul className="flex gap-5 items-center justify-center">
            {categorias.map(categoria => (
              <li key={categoria.id}>
                <Link 
                  to={`/categoria/${categoria.slug}`}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  {categoria.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header;
