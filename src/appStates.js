const reducer = (prevState, action)=>{
    let newState = {...prevState};
    switch(action.type) {
        //Push the retrieved beer data into beerList and clear all searching conditions to avoid unnecessary filter operation
        case "setBeerList":
            newState = {
                ...newState,
                beerList: [...newState.beerList, ...action.value],
                keyword: "",
                brewedBefore: "",
                brewedAfter: "",
                abvGreaterThan: "",
                abvLessThan: ""
            }
            break;
        //Set the retrieved specific beer detail into state
        case "setBeerDetail":
            newState.beerDetail = {...action.value};
            break;
        //For the controlled components in SearchingBox, it must use controlled components as it won't lose the input value when jumping between routes
        case "updateConditions":
            newState = {...prevState, [action.value.key]: action.value.value};
            break;
        //Set suggested beer list for YouMayLike component
        case "setSuggestedList":
            newState.suggestedList = [...action.value];
            break;
        //Set the filtered beer list into the state seperately to control when to update the beer list displayed on the browser
        case "setFilteredList":
            newState.filteredList = [...action.value];
            break;
        //Control the loading icon of 'view more button'
        case "switchLoading":
            newState.loading = !newState.loading;
            break;
        default:
    }
    return newState;
};

const initialState = {
    beerList: [],  //used for storing the row beer data
    beerDetail: {},  //used for storing specific beer detail
    keyword: "",
    brewedBefore: "",
    brewedAfter: "",
    abvGreaterThan: "",
    abvLessThan: "",
    suggestedList: [],  //used for storing the beer list of YouMayLike component
    filteredList: [],  //used for storing the result beer list after click search button
    loading: false
}

export {reducer, initialState};