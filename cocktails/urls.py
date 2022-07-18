from django.urls import path
from .views import generateCocktails, getCocktailDetails

urlpatterns = [
    path('generate', generateCocktails.as_view()),
]
