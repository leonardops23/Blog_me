from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoriaViewSet


# campos el router para la api
router = DefaultRouter()
router.register(r'categorias', CategoriaViewSet)


urlpatterns = [
    path('api/', include(router.urls))
]
