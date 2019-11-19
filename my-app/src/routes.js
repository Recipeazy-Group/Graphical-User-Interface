import Login from './components/Login';
import Signup from './components/SignupPage/Signup';
import WorkoutGenerator from './components/WorkoutGenerator';
import WorkoutPage from './components/WorkoutPage';
import WorkoutPageEdit from './components/WorkoutPageEdit';
import AccountHome from './components/accountPage/AccountHome'; 
import IngredientsPage from './components/accountPage/IngredientsPage';


export const ROUTES = [
  { path: '/login', component: Login},
  { path: '/signup', component: Signup},
  { path: '/home', component: AccountHome},
  { path: '/workoutgen', component: WorkoutGenerator},
  { path: '/recipepage/:recipeId', component: WorkoutPage},
  { path: '/', component: Login},
  { path: '/ingredients', component: IngredientsPage},
];

export default ROUTES;
