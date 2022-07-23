from rest_framework.views import APIView
from rest_framework.response import Response
from cocktails.helper import Helper


# from TheCocktailDB website, different endpoints for searching drinks based on alcohol type, name, or id number
class API_URLs():
    byAlochol = f"http://www.thecocktaildb.com/api/json/v1/1/filter.php?i="
    byName = f"http://www.thecocktaildb.com/api/json/v1/1/search.php?api_key=1&s="
    byId = "http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="


# When frontend calls /generate URL, django uses parameter passed in through URL of the type of alcohol
# and picks 4 (will change this to be dynamic) random drinks from the list that the API response generates
class generateCocktails(APIView):
    def get(self, request):
        url_param = 'drink'
        drink = request.GET.get(url_param)
        Helper.regulateWine(self, drink) # The API has small selections for wine and champagne so I have this choose between one of the two when using wine choice on frontend
        url = API_URLs.byAlochol + drink
        response = Helper.sendRequest(url)
        output = Helper.extractJSON(response)
        package = Helper.pickRandomDrinks(output)
        return Response (package)
       

# When frontend calls /details URL, django uses parameter passed in through URL of the name of the drink
# and retrieves the id (in the API databse) and ingredient list, glassware, and instructions to display
class getCocktailDetails(APIView):
    def get(self, request):
        url_param = 'name'
        name = request.GET.get(url_param)
        url = API_URLs.byName + name
        response = Helper.sendRequest(url)
        output = Helper.extractJSON(response)
        package = Helper.getDetails(output)
        return Response(package)


# Uses id found in the getCocktailDetials function to do another API request to the endpoint that utilizes 
# the unique id, and this has info on the drink's image link (not included when searching by name for some reason)
class getCocktailImage(APIView):
    def get(self, request):
        url_param = 'id'
        id = request.GET.get(url_param)
        url = API_URLs.byId + id
        response = Helper.sendRequest(url)
        output = Helper.extractJSON(response)
        image = Helper.getImage(output)
        return Response(image)