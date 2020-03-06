from django.shortcuts import render
from rest_framework import viewsets
 
from django.http import HttpResponse
from django.shortcuts import get_object_or_404


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . models import User, Annotation
from .serializer import UserSerializer, AnnotSerializer


# Create your views here.

class users(APIView):
    def get (self, request):
        print(request)
        users = User.objects.all()
        serailizer = UserSerializer(users, many=True)
        return Response(serailizer.data)

    def post (self, request):
        pass

class Auth(APIView):
    def get(self, request):
        email = request.GET['email']
        password = request.GET['password']
        print(email, password)
        try:
            user = User.objects.get(email=email)
            if user.password == password:
                return Response({'success' : 1})
        except e:
            print(e)
        return Response({'success' : 0})

    def post (self, request):
        pass

class annotations(APIView):
    def get (self, request):
        annots = Annotation.objects.all()
        serailizer = UserSerializer(annots, many=True)
        return Response(serailizer.data)

    def post (self, request):
        print(request.data)
        serial = AnnotSerializer(data=request.data)
        if serial.is_valid():
            serial.save()
            return Response(serial.data,status=status.HTTP_201_CREATED)
        return Response(serial.errors, status=status.HTTP_400_BAD_REQUEST)

