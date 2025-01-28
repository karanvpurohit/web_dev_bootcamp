import React from "react";
import emojipedia from "../emojipedia";


function truncMeanings(term){
    return <li> {term.meaning.substring(0, 100)}... </li>
}

function App(){
    return(
        <div>
            <ul>
                {emojipedia.map(truncMeanings)}
            </ul>
        </div>
    );
}

export default App;