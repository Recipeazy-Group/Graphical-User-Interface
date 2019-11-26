import Login from './components/Login';
import Signup from './components/SignupPage/Signup';
import RecipePage from './components/RecipePage';
import WorkoutPageEdit from './components/WorkoutPageEdit';
import AccountHome from './components/accountPage/AccountHome';
import WorkoutGenerator from './components/WorkoutGenerator';


export const ROUTES = [
  { path: '/login', component: Login},
  { path: '/signup', component: Signup},
  { path: '/home', component: AccountHome},
  { path: '/recipepage/:recipeId', component: RecipePage},
  { path: '/workoutgen', component: WorkoutGenerator},
  { path: '/', component: Login},
];

export default ROUTES;
