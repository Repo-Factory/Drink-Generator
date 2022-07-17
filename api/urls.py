from django.urls import path
from .views import RoomView, CreateRoomView, GetRoomView

urlpatterns = [
    path('home', RoomView.as_view()),
    path('create', CreateRoomView.as_view()),
    path('room', GetRoomView.as_view()),
]

