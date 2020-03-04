from django.shortcuts import render
from rest_framework import viewsets
 
from django.http import HttpResponse
from django.shortcuts import get_object_or_404


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . models import User
from .serializer import UserSerializer


# Create your views here.

class users(APIView):
    def get (self, request):
        users = User.objects.all()
        serailizer = UserSerializer(users, many=True)
        return Response(serailizer.data)

    def post (self, request):
        pass



