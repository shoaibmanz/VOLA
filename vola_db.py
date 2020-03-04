import pymongo
from mongoengine import *


def create_database(db_name, client):
    """ create a mongodb database """ 
    mydb = client[db_name]
    return mydb 

def create_collection(collection_name,db,client):
    """ create collection in given database """ 
    mydb = client[db]
    my_collection = mydb[collection_name]

    return my_collection


def create_vola_collections (myclient):
    create_collection("reviewer", "vola" ,myclient)
    create_collection("task", "vola" ,myclient)
    create_collection("session", "vola" ,myclient)
    create_collection("annotations", "vola" ,myclient)

    create_collection("project", "vola" ,myclient)
    create_collection("dataset", "vola" ,myclient)
    create_collection("source", "vola" ,myclient)
    create_collection("model", "vola" ,myclient)
class User(Document):
    email = StringField(required=True)
    first_name = StringField(max_length=50)
    last_name = StringField(max_length=50)


class Post(Document):
    title = StringField(max_length=120, required=True)
    author = ReferenceField(User)

    meta = {'allow_inheritance': True}

class TextPost(Post):
    content = StringField()

class ImagePost(Post):
    image_path = StringField()

class LinkPost(Post):
    link_url = StringField()


def insert (db, collection, record_dict):
    """insert record"""
    mycol = db[collection]
    mycol.insert_one (record_dict)

connect ("vola")


for user in User.objects:
    print(user.email)