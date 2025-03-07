from django.urls import path, include
from rest_framework import routers
from blog import views


router = routers.DefaultRouter()
router.register(r'blog', views.TaskView, 'blog')


urlpatterns = [
    path("api/v1", include(router.urls))
]
