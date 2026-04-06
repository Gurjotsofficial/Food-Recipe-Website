const searchbox = document.querySelector('.searchbox');
const searchbutton = document.querySelector('.searchbutton');
const recipecontainer = document.querySelector('.recipe-container');
const recipeclose = document.querySelector('.recipe-close');
const recipedetails = document.querySelector('.recipe-details');


const fetchrecipe = async (query) => {
    recipecontainer.innerHTML = "<h2>Fetching Recipies....</h2>";
    
    try {
        
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
        // console.log(respone);
        recipecontainer.innerHTML = "";
        response.meals.forEach(meal =>{
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> <span>${meal.strCategory}</span></p>
            `
            const button = document.createElement('button');
            button.innerText = "View Recipe";
            recipeDiv.appendChild(button);
            
            // adding event listener to recipe pop up
            button.addEventListener('click', () => {
                openrecipepopup(meal);
            })
            recipecontainer.appendChild(recipeDiv);
        });
        
    } catch (error) {
        recipecontainer.innerHTML = "<h2>Recipie doesn't exist!</h2>";    
    }
}

const fetchingredients = (meal) =>{
    let ingredientList = ""
    for(i = 1; i <=20;i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`]
            ingredientList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientList;
}

const openrecipepopup = (meal) => {
    recipedetails.innerHTML = `
    <h2 class="popupname">${meal.strMeal}</h2>
    <h3>Ingredients: </h3>
    <ul class="popupingredient">${fetchingredients(meal)}</ul>
        <div>
        <h3>Instructions: </h3>
        <p class="popupinstructions">${meal.strInstructions}</p>
        </div>
    
    `

    recipedetails.parentElement.style.display = "block";
}

recipeclose.addEventListener('click', () => {
    recipedetails.parentElement.style.display = "none";
})

searchbutton.addEventListener('click', (e) => {
    e.preventDefault();
    // console.log("clicked")
    const searchInput = searchbox.value.trim();
    recipedetails.parentElement.style.display = "none";
    if(!searchInput){
        recipecontainer.innerHTML = `<h2>Kindly type a name...</h2>`;
        return;
    }
    fetchrecipe(searchInput);

    })

