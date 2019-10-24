const meal = document.getElementById("meal");
const getMeal = document.getElementById("getMeal");
const MEAL_API = "https://www.themealdb.com/api/json/v1/1/random.php";

const img = document.querySelector("#meal img");
const cat = document.getElementById("cat");
const area = document.getElementById("area");
const tag = document.getElementById("tag");
const ingredients = document.getElementById("ingredients");
const mealName = document.getElementById("mealName");
const desc = document.getElementById("description");
const video = document.getElementById("video");
let ingred = [];
// console.log(img);

getMeal.addEventListener("click", function() {
  fetch(MEAL_API)
    .then(res => res.json())
    .then(({ meals }) => {
      meal.style.display = "block";
      img.setAttribute("src", meals[0].strMealThumb);
      cat.innerHTML = meals[0].strCategory;
      area.innerHTML = meals[0].strArea;
      tag.innerHTML = meals[0].strTags;
      mealName.innerHTML = meals[0].strMeal;
      desc.innerHTML = meals[0].strInstructions;
      video.setAttribute(
        "src",
        meals[0].strYoutube.replace("watch?v=", "embed/")
      );
      Object.keys(meals[0])
        .filter(
          item => item.startsWith("strIngredient") && meals[0][item] !== ""
        )
        .map((ingredient, i) => {
          // Checking measure undefined or not
          let measure =
            typeof meals[0][`strMeasure${i}`] === "undefined"
              ? ""
              : meals[0][`strMeasure${i}`];

          ingredients.innerHTML += `<li>${meals[0][ingredient]}- ${measure}
          </li>`;
        });
    });
});
