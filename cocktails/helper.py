import requests
import random
import json

class Helper:


    # The API call to the alcohol endpoint outputs a list of drinks, this function picks four numbers in that list to 
    # display to the user
    def pickRandomDrinks(source):
        i = 0
        random_drink = 0
        destination = []
        while i < 4:
            random_number = random.randint(5000, 5000000000000)
            random_drink = (((1709*(random_number))) % len(source['drinks']))
            if source['drinks'][random_drink] not in destination:
                destination.append(source['drinks'][random_drink])
                i = i + 1
        return destination


    # The API call to the name endpoint gives a dictionary with the form 'drinks' as the key and the details of each drink as the value
    # so to find the details you have to loop through the 'drinks' key, I then put all the details in an array for the front end 
    def getDetails(output):
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
                    ingredients_list.append('| ' + item[f'strIngredient{i}'] + ' |') # the ingredients are outputted from 1-12 but some are null so the 
                    i+=1                                                             # loop breaks when it finds the first null ingredient tag
                else:
                    loop = False
        package = [id, glass, instructions, ingredients_list]
        return package


    def getImage(output):
        for item in output['drinks']:
            image = item['strDrinkThumb']
        return image


    # There is a 50/50 chance that picking the 'wine' option in the frontend outputs champagne or wine options from the API
    def regulateWine(self, drink):
        self.drink = drink
        number = random.randint(0, 10)
        if self.drink=='Champagne':
            if number < 5:
                self.drink = 'Wine'
        return self.drink


    # Api_key of 1 is used for free API calls that don't use premium features of the API
    def sendRequest(url):
        payload={}
        headers = {'api_key': '1'}
        response = requests.request("GET", url, headers=headers, data=payload)
        return response


    # Converts response into json format
    def extractJSON(response):
        binary = response.content
        output = json.loads(binary)
        return output
    