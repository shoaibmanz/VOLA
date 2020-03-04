
from .views import UserVeiw
from django.urls import path, include

from rest_framework import routers
from django.conf.urls import url
from home import views

router =routers.DefaultRouter()
router.register('home',UserVeiw)

urlpatterns = [
    path('',include(router.urls))
]
