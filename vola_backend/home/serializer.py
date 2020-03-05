from .models import User
from .models import Annotation
from rest_framework import serializers


class UserSerializer (serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('name','email')
        
class AnnotSerializer(serializers.ModelSerializer):
    class Meta:
        model=Annotation
        fields = ('ID','project_name')