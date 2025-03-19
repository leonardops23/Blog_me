from django.contrib import admin
from .models import Categoria, Post, Comentario


# Register your models here.
@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'slug',)
    prepopulated_fields = {'slug': ('nombre',)}
    search_fields = ('nombre',)


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'autor', 'fecha_publicacion', 'publicado')
    list_filter = ('publicado', 'fecha_publicacion', 'categorias')
    search_fields = ('titulo', 'contenido')
    prepopulated_fields = {'slug': ('titulo',)}
    filter_horizontal = ('categorias',)
    raw_id_fields = ('autor',)
    date_hierarchy = 'fecha_publicacion'


@admin.register(Comentario)
class ComentarioAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'email', 'post', 'fecha_creacion', 'activo')
