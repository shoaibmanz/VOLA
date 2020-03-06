from django.db import models

# Create your models here.


class User(models.Model):
    ID = models.IntegerField()
    email = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=50)


class Annotation(models.Model):
    ID = models.IntegerField()
    project_name = models.CharField(max_length=100)  

