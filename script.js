function searchRecipe() {
    const dishName = document.getElementById('dishName').value;
    const recipeResultElement = document.getElementById('recipeResult');
    
    const footer = document.querySelector('footer'); // ignore this line
    
    // Using TheMealDB API
    // Search meal by name - first option in https://www.themealdb.com/api.php
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${dishName}`;
  
    //Fetch sends a HTTP GET request to the specified API endpoint, to the MealDB server,  and fetch  returns a promise that resolves to the response of that HTTP request 
    fetch(apiUrl)
    // .then used to handle asynchronous reponse. it takes the response from API and converts it to JSON format. the json() method acutall returns another promise that resolved eventually to the actual data.
    .then(response => response.json()) 
      .then(data => {  //callback function processes the data received from API 
        // Check if the meal is found
        if (data.meals) {
          const meal = data.meals[0];
          // Display the recipe details, image, and ingredients
          recipeResultElement.innerHTML = `
            <h2>${meal.strMeal}</h2>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="max-width: 100%; border-radius: 8px; margin-bottom: 10px;">
            <div class="ingredients">
              <h3>Ingredients:</h3>
              <ul>${formatIngredients(meal)}</ul>
            </div>
            <h3>Instructions:</h3>
            <ol>${formatInstructions(meal.strInstructions)}</ol>
          `;
  
          // Update footer content dynamically
          updateFooter();
  
          // Adjust the layout to accommodate the dynamic content
          adjustLayout();
        } else {
          recipeResultElement.innerHTML = 'Recipe not found. Please try another dish.';
  
          // Reset footer content and layout if no recipe is found
          updateFooter();
          resetLayout();
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        recipeResultElement.innerHTML = 'Error fetching recipe. Please try again.';
  
        // Reset footer content and layout in case of an error
        updateFooter();
        resetLayout();
      });
  }
  // Ingredients 
  function formatIngredients(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && measure) {
        ingredients.push(`${measure} ${ingredient}`);
      } else if (ingredient) {
        ingredients.push(ingredient);
      }
    }
    return ingredients.map(ingredient => `<li>${ingredient}</li>`).join('');
  }
  
  //  Instructions
  function formatInstructions(instructions) {
    // Convert line breaks to list items
    const steps = instructions.split('\r\n').filter(step => step.trim() !== '');
    return steps.map(step => `<li>${step}</li>`).join('');
  }
  
  // Update footer
  function updateFooter() {
    const footerContent = document.querySelector('.footer-content');
    const currentYear = new Date().getFullYear();
  
    // Update the content dynamically
    footerContent.innerHTML = `
      <p>&copy; ${currentYear} Recipe Finder. All rights reserved.</p>
      <p>Designed with ❤️ by Amir | Bek Brace</p>
    `;
  }
  
  // Adjust the layout
  function adjustLayout() {
    const footer = document.querySelector('footer');
    footer.style.position = 'relative';
    footer.style.bottom = 'auto';
  }
  
  // Reset layout
  function resetLayout() {
    const footer = document.querySelector('footer');
    footer.style.position = 'fixed';
    footer.style.bottom = '0';
  }
