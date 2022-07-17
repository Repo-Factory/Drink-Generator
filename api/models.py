from lib2to3.pgen2.pgen import generate_grammar
from django.db import models

# Create your models here.
from django.db import models
import string
import random


def generate_room_code():
    length = 6

    while True:
        room_code = ''.join(random.choices(string.ascii_lowercase, k=length))
        if Room.objects.filter(code=room_code).count() == 0:
            break
    return room_code


# Create your models here.
class Room(models.Model):
    code = models.CharField(max_length=10, default=generate_room_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    host_name = models.CharField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    number_of_guests = models.IntegerField(null=False, default=1)
    created_on = models.DateTimeField(auto_now_add=True)

class Guest(models.Model):
    name = models.CharField(max_length=10, default='', unique=True)
    room = models.ForeignKey("Room", on_delete=models.SET_NULL, null=True)