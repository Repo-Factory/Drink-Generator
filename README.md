
![Drink Generator Full Thumb](https://user-images.githubusercontent.com/108435248/181649641-daf7b972-9a15-4fa2-90bc-ddf006ffaa0b.png "Drink Array")


# Drink-Generator Web App #


## Introduction ##
This is a dynamic SPA built with react hooks that makes API requests (using a django backend) to a cocktail database to display random cocktail ideas of a preferred liquer/alcohol.

## Description ##
I'm not an alcoholic but my friend had commented that he wished it was easier to come up with drink ideas for his parties and said he was thinking of buying a book. I, on the other hand, realized it would be much more fun if I made a free program that did it for us. Thanks to the generous work of the contributors of TheCocktailDB (a free API with information on popular cocktails), I was able to make a program that fetches random drinks and displays them to the user. The user can then click on the drink that interest them for more details like ingredients, appropriate glassware, and instructions on how to prepare the drink properly. 

## Features ##
My main focus was on making the app as smooth and dyamic as possible, so I implemented React routing to keep the app as a single-page application. I found some great drink generators online but I noticed most were very heavy. In other words, there are a lot of steps to get the drinks generated and lots of bulk on the website that doesn't efficiently contribute to the main purpose of the app. Mine is a little more minimal with less features but I didn't want the user to feel like they're waiting to navigate to a lot of pages or like they have to input a list of ingredients to generate drinks. The app is currently designed to only support searches based on alcohol type instead of being able to create a cocktail out of ingredients, but I feel like it's a decent compromise for someone that simply wants to entertain themselves with some simple drink ideas. 

## Setup and Install ##
Set up is very easy because the build is included in the source code. To install run  

```git clone https://github.com/Repo-Factory/Drink-Generator.git .```

and run the server with:

```python manage.py runserver```

You'll find the app running at [localhost:8000]('http://localhost:8000').



## In-Work Features ##
I also thought it would be fun to add a game type feature to the app and give it a lobby/room setup where different clients can log in to the same room. A host would generate drinks and the players could vote on which one they want to drink to decide what to serve at a party. I'm currently in the middle of working on that feature right now but also have other projects I'm working on so it will be done in a few weeks. I think the generator aspect of the app is entertaining enough to have it posted even though that functionality isn't completely finished. 
