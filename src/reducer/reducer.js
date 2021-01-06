import {CHANGEINPUT,SEARCHSUBJECT,GITOBJ} from '../action/actionType';
const defaultState={
    inputValue:"Input the full_name to search",
    gitData:[],
    isloading: false,
    subjectName:'',
    owner:'',
    stargazersCount:'',
    watchersCount:'',
    htmlUrl:'',
    language:'',
    description:"",
};

export default (state=defaultState,action)=>{
    switch (action.type) {
    case CHANGEINPUT: {
        let newState = JSON.parse(JSON.stringify(state))
        newState.inputValue = action.value
        return newState
    }
    case GITOBJ: {
        let newState = JSON.parse(JSON.stringify(state))
        newState.gitData = Object.assign({},action.data)
        newState.isloading = true;
        return newState
    }
    case SEARCHSUBJECT: {
        let newState = JSON.parse(JSON.stringify(state))
        let flag = false;
        for(let i in newState.gitData)
        {
            if(newState.gitData[i].full_name === newState.inputValue){
                newState.subjectName = newState.gitData[i].name;
                newState.owner = newState.gitData[i].owner.login;
                newState.stargazersCount = newState.gitData[i].stargazers_count;
                newState.watchersCount = newState.gitData[i].watchers_count;
                newState.htmlUrl = newState.gitData[i].html_url;
                newState.language = newState.gitData[i].language;
                newState.description = newState.gitData[i].description;
                flag = true;
            }           
        } 
        if(!flag){
            alert('Cannot find the right information')
        }
        newState.inputValue = defaultState.inputValue;
        return newState
    }
    default:
        return state;
    }
}