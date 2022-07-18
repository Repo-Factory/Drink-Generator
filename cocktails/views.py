import requests
import json
from rest_framework.views import APIView
from rest_framework.response import Response


class generateCocktails(APIView):
    def get(self, request, format=None):
        url = "http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin"
        payload={}
        headers = {'api_key': '1'}
        response = requests.request("GET", url, headers=headers, data=payload)
        binary = response.content
        output = json.loads(binary)
        return Response (output['drinks'])
       
       
class getCocktailDetails(APIView):
    def get(self, request, format=None):
        url = "http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin"
        payload={}
        headers = {'api_key': '1'}
        response = requests.request("GET", url, headers=headers, data=payload)
        binary = response.content
        output = json.loads(binary)
        return Response (output['drinks'])
