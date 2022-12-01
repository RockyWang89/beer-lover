const reducer = (prevState, action)=>{
    let newState = {...prevState};
    switch(action.type) {
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
        case "setBeerDetail":
            newState.beerDetail = {...action.value};
            break;
        case "updateConditions":
            newState = {...prevState, [action.value.key]: action.value.value};
            break;
        case "setSuggestedList":
            newState.suggestedList = [...action.value];
            break;
        case "setFilteredList":
            newState.filteredList = [...action.value]
            break;
        default:
    }
    return newState;
};

const initialState = {
    beerList: [],
    beerDetail: {},
    keyword: "",
    brewedBefore: "",
    brewedAfter: "",
    abvGreaterThan: "",
    abvLessThan: "",
    suggestedList: [],
    filteredList: []
}

export {reducer, initialState};