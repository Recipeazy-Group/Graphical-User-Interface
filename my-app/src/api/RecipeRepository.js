const fetch = require("node-fetch");

var url = "http://ec2-18-218-75-228.us-east-2.compute.amazonaws.com";


//POST
//----------------------------------------

//Add User
export async function addUser(firstName, lastName, email, pass) {
	let head = new Headers();
	head.append('FirstName', firstName);
	head.append('LastName', lastName);
	head.append('Email', email);
	head.append('UserPassword', pass);

	const init = {
		method: 'POST',
		headers: head
	}

	const response = await fetch(url + '/User/new', init)
		.then(response => {
			if (!response.ok) {
				throw new Error('Could not connect');
			}
		})
		.catch(error => { console.log(error); });
	return response;
}

//Add User ingredient
export async function addUserIngredient(email, ingr) {
	let head = new Headers();
	head.append('Email', email);
	head.append('IngredientName', ingr);

	const init = {
		method: 'POST',
		headers: head
	}

	const response = await fetch(url + '/UserIngredient/new', init)
		.then(response => {
			if (!response.ok) {
				throw new Error('Could not connect');
			}
		})
		.catch(error => { console.log(error); });
	return response;
}

//Add User favorite
export async function addUserFavorite(email, id) {
	let head = new Headers();
	head.append('Email', email);
	head.append('RecipeId', id);

	const init = {
		method: 'POST',
		headers: head
	}

	const response = await fetch(url + '/UserFavorite/new', init)
		.then(response => {
			if (!response.ok) {
				throw new Error('Could not connect');
			}
		})
		.catch(error => { console.log(error); });
	return response;
}

//Add recipe image
export async function addRecipeImage(id, imgUrl) {
	let head = new Headers();
	head.append('ImageUrl', imgUrl);
	head.append('RecipeId', id);

	const init = {
		method: 'POST',
		headers: head
	}

	const response = await fetch(url + '/RecipeImage/new', init)
		.then(response => {
			if (!response.ok) {
				throw new Error('Could not connect');
			}
		})
		.catch(error => { console.log(error); });
	return response;
}

//GET
//-------------------------------------------

//Get account by email
export async function getAccount(email) {
	const response = await fetch(url + '/User/' + encodeURI(email))
		.then(response => {
			if (!response.ok) {
				throw new Error('Could not connect');
			}
		})
		.catch(error => { console.log(error); });
	return response;
}

//Get all recipe info by RecipeId
export async function getRecipe(id) {
	const response = await fetch(url + '/Recipe/' + id)
		.then(response => {
			if (!response.ok) {
				throw new Error('Could not connect');
			}
		})
		.catch(error => { console.log(error); });
	return response;
}

//Get all recipes
export async function getRecipes() {
	const response = await fetch(url + '/Recipes')
		.then(response => {
			if (!response.ok) {
				throw new Error('Could not connect');
			}
		})
		.catch(error => { console.log(error); });
	return response;
}

//Get all images of a recipe
export async function getRecipeImages(id) {
	const response = await fetch(url + '/RecipeImage/' + id)
		.then(response => {
			if (!response.ok) {
				throw new Error('Could not connect');
			}
		})
		.catch(error => { console.log(error); });
	return response;
}

//Get User Ingredients by email
export async function getUserIngredients(email) {
	const response = await fetch(url + '/UserIngredients/' + encodeURI(email))
		.then(response => {
			if (!response.ok) {
				throw new Error('Could not connect');
			}
		})
		.catch(error => { console.log(error); });
	return response;
}

//Get recipes containting all user ingredients
export async function getRecipesForUser(email) {
	const response = await fetch(url + '/Recipes/' + encodeURI(email))
		.then(response => {
			if (!response.ok) {
				throw new Error('Could not connect');
			}
		})
		.catch(error => { console.log(error); });
	return response;
}

//Get users favorite recipes
export async function getFavoritedRecipes(email) {
	const response = await fetch(url + '/UserFavorites/' + encodeURI(email))
		.then(response => {
			if (!response.ok) {
				throw new Error('Could not connect');
			}
		})
		.catch(error => { console.log(error); });
	return response;
}

//PUT
//-----------------------------------------------------------------

//Add difficulty rating
export async function rateDifficulty(id, rating) {
	let head = new Headers();
	head.append('DifficultyRating', rating);

	const init = {
		method: 'PUT',
		headers: head
	}

	const response = await fetch(url + '/Recipes/DifficultyRating/' + id, init)
		.then(response => {
			if (!response.ok) {
				throw new Error('Could not connect');
			}
		})
		.catch(error => { console.log(error); });
	return response;
}

//Add tasty rating
export async function rateTaste(id, rating) {
	let head = new Headers();
	head.append('TastyRating', rating);

	const init = {
		method: 'PUT',
		headers: head
	}

	const response = await fetch(url + '/Recipes/TastyRating/' + id, init)
		.then(response => {
			if (!response.ok) {
				throw new Error('Could not connect');
			}
		})
		.catch(error => { console.log(error); });
	return response;
}

export default class fake{
    
}