const reducer = (prevState, action)=>{
    let newState = {...prevState};
    switch(action.type) {
        case "setBeerList":
            newState.beerList = [...newState.beerList, ...action.value];
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
        case "addPage":
            newState.page++;
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
    suggestedList: []
}

export {reducer, initialState};