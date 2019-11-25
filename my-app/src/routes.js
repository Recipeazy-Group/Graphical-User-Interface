import Login from './components/Login';
import Signup from './components/SignupPage/Signup';
import WorkoutGenerator from './components/WorkoutGenerator';
import RecipePage from './components/RecipePage';
import WorkoutPageEdit from './components/WorkoutPageEdit';
import AccountHome from './components/accountPage/AccountHome';


export const ROUTES = [
  { path: '/login', component: Login},
  { path: '/signup', component: Signup},
  { path: '/home', component: AccountHome},
  { path: '/workoutgen', component: WorkoutGenerator},
  { path: '/recipepage/:recipeId', component: RecipePage},
  { path: '/', component: Login},
];

export default ROUTES;
