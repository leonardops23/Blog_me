from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoriaViewSet, PostViewSet, ComentarioViewSet


# campos el router para la api
router = DefaultRouter()
router.register(r'categorias', CategoriaViewSet)
router.register(r'posts', PostViewSet)
router.register(r'comentarios', ComentarioViewSet)

urlpatterns = [
    path('api/', include(router.urls))
]
