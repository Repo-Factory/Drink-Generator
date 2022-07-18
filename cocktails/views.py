import requests
import json
from rest_framework.views import APIView
from rest_framework.response import Response


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
        return Response (output['drinks'][0:3])
       

class getCocktailDetails(APIView):
    def get(self, request, format=None):
        url = "www.thecocktaildb.com/api/json/v1/1/search.php?api_key=1&s={name}"
        payload={}
        headers = {'api_key': '1'}
        response = requests.request("GET", url, headers=headers, data=payload)
        binary = response.content
        output = json.loads(binary)
        return Response (output['drinks'])
