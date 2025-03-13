from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Categoria(models.Model):
    nombre = models.CharField(max_length=200)
    slug = models.CharField(max_length=200)

    def __str__(self):
        self.nombre
    
    class Meta:
        verbose_name_plural = 'Categorias'


class Post(models.Model):
    titulo = models.CharField(max_length=200)
    slug = models.CharField(max_length=200)
    autor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')


