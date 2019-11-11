import axios from 'axios';

export class HomeRepository {

    url = 'http://18.218.117.25:3000';
    config = {
        headers: {
            Authorization: 'root'
        }
    };

    getProfilePic(userID) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/home/${userID}/avatar`, this.config)
            .then(resp => resolve(resp.data))
            .catch(resp => {console.log("getProfilePic failed: supplu imge "+resp); resolve([{avatar:"https://via.placeholder.com/150"}])})
        });
    }

    getBio(userID) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/home/${userID}/bio`, this.config)                     //prepare to switch this link
            .then(resp => resolve(resp.data))
            .catch(resp => {console.log("getBio failed: supply bio "+resp); resolve([{user_bio:"Hi everyone, I am a mother of 23 that hates cooking."}])})
        });
    }

//favorite is one or zero
    setFavorite(userID, recipeID, favorite) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/exercises/${userID}/recipe_id/${recipeID}/favorite/${favorite}`, recipeID, this.config)
            .then(resp => resolve(resp.data))
            .catch(resp => console.log("setFavorite failed: "+resp))
        });
    }

    getFavorites(userID) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/home/${userID}/favorite_recipe`, this.config)               //prepare to switch this link
            .then(resp => resolve(resp.data))
            .catch(resp => {console.log("getFavorites failed: "+resp); resolve([{recipe_id:107, recipe_name:"Jimbo's Fried Frog legs", recipe_desc:"Homemade recipe from the Roadkill Grill" },{recipe_id:102,recipe_desc:"Its like tofu but good", recipe_name:"Chicken masala" }])})
        });
    }
}
