from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django_ckeditor_5.fields import CKEditor5Field


class Categoria(models.Model):
    """
    Representa una categoría para clasificar posts del blog.
    
    Atributos:
        nombre (str): Nombre de la categoría (máx. 200 caracteres).
        slug (str): Identificador único legible para URLs (máx. 200 caracteres).
    
    Relaciones:
        - Relación Many-to-Many con Post a través del campo 'categorias'.
    """
    nombre = models.CharField(max_length=200)
    slug = models.CharField(max_length=200)

    def __str__(self) -> str:
        return self.nombre  # Corregido: faltaba el return
    
    class Meta:
        verbose_name_plural = 'Categorias'


class Post(models.Model):
    """
    Representa un artículo o entrada del blog.
    
    Atributos:
        titulo (str): Título del post (máx. 200 caracteres).
        slug (str): Identificador único legible para URLs.
        autor (User): Usuario que creó el post.
        contenido (str): Cuerpo principal del texto en formato HTML/Markdown.
        imagen_destacada (Image): Imagen principal asociada al post (opcional).
        fecha_publicacion (datetime): Fecha de publicación programada.
        publicado (bool): Estado de publicación (visible al público).
    
    Campos automáticos:
        fecha_creacion (datetime): Fecha de creación automática (solo inserción).
        fecha_actualizacion (datetime): Fecha de última modificación (auto-actualizable).
    
    Relaciones:
        - Relación Many-to-Many con Categoria a través del campo 'categorias'.
        - Relación One-to-Many con Comentario a través del campo 'comentarios'.
    """
    titulo = models.CharField(max_length=200)
    slug = models.CharField(max_length=200)
    autor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    contenido = CKEditor5Field('Contenido', config_name='default')
    imagen_destacada = models.ImageField(upload_to='blog/images/', blank=True)
    categorias = models.ManyToManyField(Categoria, related_name='posts')
    fecha_publicacion = models.DateTimeField(default=timezone.now)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    publicado = models.BooleanField(default=True)

    class Meta:
        ordering = ['-fecha_publicacion']  # Orden descendente por fecha de publicación
    
    def __str__(self) -> str:
        return self.titulo


class Comentario(models.Model):
    """
    Representa un comentario realizado por un usuario en un post.
    
    Atributos:
        nombre (str): Nombre del comentarista (máx. 80 caracteres).
        email (str): Email del comentarista (validado como formato email).
        contenido (str): Texto del comentario.
        activo (bool): Estado de moderación (comentario visible/publicado).
    
    Campos automáticos:
        fecha_creacion (datetime): Fecha de creación automática (solo inserción).
    
    Relaciones:
        - Relación Many-to-One con Post a través del campo 'post'.
    """
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comentarios')
    nombre = models.CharField(max_length=80)
    email = models.EmailField()
    contenido = models.TextField()
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    activo = models.BooleanField(default=True)

    class Meta:
        ordering = ['fecha_creacion']  # Orden ascendente por fecha de creación

    def __str__(self) -> str:
        return f'Comentario de {self.nombre} en {self.post}'
