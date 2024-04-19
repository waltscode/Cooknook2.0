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

export const searchSpoonacularById = (id) => {
  return fetch(`/api/recipes/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}




export const saveRecipe = (obj, token) => {
  console.log('Object to be saved:', obj); // Log obj before sending the request
  return fetch('/api/recipes/saved', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(obj),
  });
};

