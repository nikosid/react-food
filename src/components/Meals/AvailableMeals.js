import { useState, useEffect } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meails, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  async function fetchMeals() {
    setIsLoading(true);
    const response = await fetch(
      "https://react-food-9c62b-default-rtdb.europe-west1.firebasedatabase.app/meails.json"
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const mealsFromDb = await response.json();
    const transformedMeals = [];
    for (const key in mealsFromDb) {
      transformedMeals.push({ id: key, ...mealsFromDb[key] });
    }
    setMeals(transformedMeals);

    setIsLoading(false);
  }

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meails.map((meal) => {
    return (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
