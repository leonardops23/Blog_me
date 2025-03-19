from django.shortcuts import render
from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_list_or_404
from .models import Categoria, Post, Comentario
from .serializer import CategoriaSerializar, PostSerializer, ComentarioSerializer


class CategoriaViewSet(viewsets.ModelViewSet):
    """
        Api endpoint para categoria
    """
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializar
    lookup_fields = 'slug'
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fileds = ['nombre']


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'slug'
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ComentarioViewSet(viewsets.ModelViewSet):
    queryset = Comentario.objects.all()
    serializer_class = ComentarioSerializer
