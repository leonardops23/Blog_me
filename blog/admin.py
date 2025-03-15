from django.contrib import admin
from .models import Categoria


# Register your models here.
@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'slug',)
    prepopulated_fields = {'slug': ('nombre',)}
    search_fields = ('nombre',)
