from django.urls import path
from .views import generateCocktails, getCocktailDetails, getCocktailImage

urlpatterns = [
    path('generate', generateCocktails.as_view()),
    path('name', getCocktailDetails.as_view()),
    path('id', getCocktailImage.as_view()),
]
