from rest_framework import serializers
from .models import Categoria, Comentario, Post
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class CategoriaSerializar(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'nombre', 'slug']


class ComentarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comentario
        fields = ['id', 'nombre', 'email', 'contenido', 'fecha_creacion',
                  'activo']


class PostSerializer(serializers.ModelSerializer):
    autor = UserSerializer(read_only=True)
    autor_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source='autor',
        write_only=True,
    )
    categorias = CategoriaSerializar(many=True, read_only=True)
    categoria_ids = serializers.PrimaryKeyRelatedField(
        queryset=Categoria.objects.all(),
        source='categorias',
        write_only=True,
        many=True,
    )
    comentarios = ComentarioSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = [
            'id', 'titulo', 'slug', 'autor', 'contenido',
            'imagen_destacada', 'categorias', 'fecha_publicacion',
            'fecha_creacion', 'fecha_actualizacion', 'publicado',
            'comentarios',
        ]
