function getCode(){
    fetch('www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
        .then(response => response.json())
        .then(data => console.log(data));
}   

getCode()