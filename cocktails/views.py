import requests
import json
from rest_framework.views import APIView
from rest_framework.response import Response
import random


class generateCocktails(APIView):
    def get(self, request, format=None):
        lookup_url_kwarg = 'drink'
        drink = request.GET.get(lookup_url_kwarg)
        url = f"http://www.thecocktaildb.com/api/json/v1/1/filter.php?i={drink}"
        payload={}
        headers = {'api_key': '1'}
        response = requests.request("GET", url, headers=headers, data=payload)
        binary = response.content
        output = json.loads(binary)
        firstDrink = random.randint(0, len(output['drinks']))
        lastDrink = firstDrink + 4
        return Response (output['drinks'][firstDrink:lastDrink])
       

class getCocktailDetails(APIView):
    def get(self, request, format=None):
        lookup_url_kwarg = 'name'
        name = request.GET.get(lookup_url_kwarg)
        url = f"http://www.thecocktaildb.com/api/json/v1/1/search.php?api_key=1&s={name}"
        payload={}
        headers = {'api_key': '1'}
        response = requests.request("GET", url, headers=headers, data=payload)
        binary = response.content
        output = json.loads(binary)

        for item in output['drinks']:
            instructions = item['strInstructions']
        for item in output['drinks']:
            glass = item['strGlass']
        for item in output['drinks']:
            id = item['idDrink']
        ingredients_list = []
        loop = True
        i=1
        while loop is True:
            for item in output['drinks']:
                if item[f'strIngredient{i}'] is not None:
                    ingredients_list.append(item[f'strIngredient{i}'] + ' | ')
                    i+=1
                else:
                    loop = False
        package = [id, glass, instructions, ingredients_list]
        return Response(package)


class getCocktailImage(APIView):
    def get(self, request, format=None):
        lookup_url_kwarg = 'id'
        id = request.GET.get(lookup_url_kwarg)
        url = f"http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i={id}"
        payload = ""
        headers = {
        'api-key': '1'
        }
        response = requests.request("GET", url, headers=headers, data=payload)
        binary = response.content
        output = json.loads(binary)
        for item in output['drinks']:
            image = item['strDrinkThumb']
        return Response(image)