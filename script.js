function searchRecipe() {
    const dishName = document.getElementById('dishName').value;
    const recipeResultElement = document.getElementById('recipeResult');
    const footer = document.querySelector('footer');
    
    // Using TheMealDB API
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${dishName}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
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
          updateFooter(meal.strMeal, 'Amir | Bek Brace');
  
          // Adjust the layout to accommodate the dynamic content
          adjustLayout();
        } else {
          recipeResultElement.innerHTML = 'Recipe not found. Please try another dish.';
  
          // Reset footer content and layout if no recipe is found
          updateFooter('', 'Amir | Bek Brace');
          resetLayout();
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        recipeResultElement.innerHTML = 'Error fetching recipe. Please try again.';
  
        // Reset footer content and layout in case of an error
        updateFooter('', 'Amir | Bek Brace');
        resetLayout();
      });
  }
  
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
  
  // Rest of the functions remain the same
  function formatInstructions(instructions) {
    // Convert line breaks to list items
    const steps = instructions.split('\r\n').filter(step => step.trim() !== '');
    return steps.map(step => `<li>${step}</li>`).join('');
  }
  
  function updateFooter(recipeName, designerName) {
    const footerContent = document.querySelector('.footer-content');
    const currentYear = new Date().getFullYear();
  
    // Update the content dynamically
    footerContent.innerHTML = `
      <p>&copy; ${currentYear} ${recipeName ? `${recipeName} Recipe` : 'Recipe Finder'}. All rights reserved.</p>
      <p>Designed with ❤️ by ${designerName}</p>
    `;
  }
  
  function adjustLayout() {
    const footer = document.querySelector('footer');
    footer.style.position = 'relative';
    footer.style.bottom = 'auto';
  }
  
  function resetLayout() {
    const footer = document.querySelector('footer');
    footer.style.position = 'fixed';
    footer.style.bottom = '0';
  }