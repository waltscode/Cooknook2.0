// route to get logged in user's info (needs the token)
export const getMe = (token) => {
  return fetch('/api/users/me', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData) => {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const searchSpoonacular = ( cuisine) => {
  return fetch (`/api/recipes/cuisine/${cuisine}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    
  });
  }




// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
// export const searchSpoonacular = (query, cuisine) => {
//   return fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=10f834d78e4841f987607050deb2e9af&cuisine=${cuisine}`, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
// };

// export const searchSpoonacular = (query, cuisine) => {
//   return fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=a5d7286f6b864fef82d1dd50060278cb&cuisine=${cuisine}&query=${query}`, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
// };

export const searchSpoonacularById = (id) => {
  return fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=10f834d78e4841f987607050deb2e9af`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export const savedRecipes = (recipeData, token) => {
  return fetch('/api/recipes/saved', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ recipeData }),
  });
};

