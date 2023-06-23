# Easy Nutrition

## Description
Easy Nutrition is a React application that empowers users to manage their nutrition by creating custom lists of food items. The app provides features for user registration, login, and the ability to search and add food items using the USDA FoodData Central API. Users can view their custom lists along with the corresponding food items and obtain the total amount of various vitamins and minerals for each list.

## Features
- **User Registration and Login**: Users can create an account or log in to access their personalized nutrition lists.
- **Custom List Creation**: Users can create custom lists to organize their food items.
- **Food Item Search**: The app integrates with the USDA FoodData Central API to allow users to search for specific food items.
- **Add Food Items**: Users can add food items from the search results to their custom lists.
- **View Lists and Food Items**: Users can view their custom lists and the corresponding food items.
- **Nutrition Information**: The app calculates and displays the total amount of various vitamins and minerals for each list and the percentage of the recommended daily value, providing users with valuable nutrition information.

## Installation
To run Easy Nutrition locally, follow these steps:

1. Clone the Easy API repository for the JSON server: `git clone https://github.com/loganbelew2/easy-api.git`
2. Navigate to the Easy API directory: `cd easy-api`
3. Start the JSON server for the database on port 8088: `json-server -p 8088 database.json`
4. Clone the Easy Nutrition repository for the React application: `git clone https://github.com/loganbelew2/easy-nutrition.git`
5. Navigate to the Easy Nutrition directory: `cd easy-nutrition`
6. Install the dependencies: `npm install`
7. Start the React application: `npm start`
8. Open your web browser and visit `http://localhost:3000` to access the application.

Make sure both the Easy API JSON server and the Easy Nutrition React application are running simultaneously to ensure proper data retrieval and functionality.

## Technologies Used
- React: Front-end framework for building user interfaces.
- React Router: Library for handling client-side routing in React applications.
- USDA FoodData Central API: External API for retrieving nutrition information for food items.
-  Bootstrap & CSS: Styling the application.

## Contributing
Contributions to Easy Nutrition are welcome! To contribute, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Implement your changes and ensure the code adheres to the project's coding standards.
4. Write tests for your code, if applicable.
5. Submit a pull request with a detailed description of your changes.

