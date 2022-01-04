import React,{createContext,useEffect,useReducer,useContext} from 'react'
import {BrowserRouter,Redirect,Route,Switch,useHistory} from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar/Navbar'
import Home from './components/screen/Home/Home';
import Login from './components/screen/Login/Login';
import Signup from './components/screen/Signup/Signup';
import Profile from './components/screen/Profile/Profile';
import EditProfile from './components/screen/Profile/EditProfile'
import Opportunity from './components/screen/Opportunity/Opportunity'
import CreatePost from './components/screen/CreatePost/CreatePost';
import EditPost from './components/screen/EditPost/EditPost';
import Users from './components/screen/Users/Users';
import UserProfile from './components/screen/Profile/UserProfile';
import AddOpportunity from './components/screen/Opportunity/AddOpportunity';
import EditOpportunity from './components/screen/Opportunity/EditOpportunity';
import OpportunityDetail from './components/screen/OpportunityDetails/OpportunityDetail'
import ResetPass from './components/screen/ResetPass/ResetPass';
import NewPass from './components/screen/NewPass/NewPass';
import {reducer,initialState} from './Reducers/userReducer'
import ErrorPage from './components/screen/ErrorPage';
import MemeGenerator from './components/screen/MemeGenerator/MemeGenerator';

export const UserContext = createContext()

const Routing = () => {

    const {dispatch} = useContext(UserContext)
    const history = useHistory()

    // initial user configuration on App refresh
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        if(user){
            dispatch({type:"USER",payload:user})
            history.push('/opportunity')
        }
        else{
            if(!history.location.pathname.startsWith('/resetPass'))
                history.push('/login')
        }
    },[])

    // useEffect(() => {
    //     fetch("/current-user",{
    //         method : "GET",
    //         headers: {
    //             "Authorization" : `Bearer ${localStorage.getItem('jwt')}`
    //         }
    //         // body : JSON.stringify({username,firstName,lastName,collegeId,phone,email,password})
    //     })
    //     .then((res) => res.json())
    //     .then((data) => {
    //         console.log(data);
    //     })
    //     .catch((error) => {
    //         console.log('erferf')
    //     })
    // },[])

    return (
        <>
            <Navbar/>
            <Switch>
                <Route exact path='/opportunity' component={Home}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/signup' component={Signup}/>
                <Route exact path='/profile' component={UserProfile}/>
                <Route exact path='/create' component={CreatePost}/>
                <Route exact path='/users' component={Users}/>
                <Route exact path='/admin/addOpportunity' component={AddOpportunity}/>
                <Route exact path='/admin/editOpportunity/:opportunityId' component={EditOpportunity}/>
                <Route exact path='/admin/opportunity/:opportunityId/details' component={OpportunityDetail}/>
                <Route exact path='/profile/edit/:userId' component={EditProfile}/>
                <Route exact path='/:postid/edit' component={EditPost}/>
                <Route exact path='/user/:userId' component={Profile}/>
                <Route exact path='/opportunity/:opportunityId' component={Opportunity} />
                <Route exact path='/resetPass' component={ResetPass}/>
                <Route exact path='/resetPass/:token' component={NewPass}/>
                <Route exact path='/memeGenerator' component={MemeGenerator}/>
                <Redirect to="/notFound"/>
            </Switch>
        </>
    )
}

const App = () => {

    const [state,dispatch] = useReducer(reducer,initialState)

    return (
        <>
            <UserContext.Provider value={{state,dispatch}}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/notFound" component={ErrorPage}/>
                        <Route component={Routing}/>
                    </Switch>
                </BrowserRouter>
            </UserContext.Provider>
        </>
    );
}

export default App