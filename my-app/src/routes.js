import Login from './components/Login';
import Signup from './components/SignupPage/Signup';
import WorkoutGenerator from './components/WorkoutGenerator';
import WorkoutPage from './components/WorkoutPage';
import WorkoutPageEdit from './components/WorkoutPageEdit';
import AccountHome from './components/accountPage/AccountHome'; 
import IngredientsPage from './components/accountPage/IngredientsPage';


export const ROUTES = [
  { path: '/Dashboard', component: Dashboard},
  { path: '/Splash', component: Splash},
  { path: '/Tracker', component: Tracker},
  { path: '/', component: Login},
  { path: '/ingredients', component: IngredientsPage},
];

export default ROUTES;
