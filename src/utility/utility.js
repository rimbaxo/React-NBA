import Player from "../assets/images/basketball-player.png";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const getPlayerImage = (id) =>
    `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${id}.png`;

export const getTeamImage = (teamName) => {
    if (teamName === "denver-nuggets")
        return `https://loodibee.com/wp-content/uploads/nba-denver-nuggets-logo-2018-300x300.png`;
    else return `https://loodibee.com/wp-content/uploads/nba-${teamName}-logo-300x300.png`;
}

export const playerDefaultImage = (onErrorEvent) => onErrorEvent.target.src = Player;

//functions to manage the scrolling of players once the cards are opened
export const find_prev_id = (id, arr) => {
    let current = arr.indexOf(id); // 5 87 6789 ecc. It gives us the index
    return current-1 < 0 ? arr[current] : arr[current-1];
}

export const find_next_id = (id, arr) => {
    let current = arr.indexOf(id);
    return current+1 > arr.length ? arr[current] : arr[current+1];
}

// function that scrolls at the top of each page every time a path change occurs
export const ScrollToTop = (props) => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return <>{props.children}</>
};

// function to truncate a string after a specified number of characters
export const truncateStr = (str, n) => {
    return (str.length > n) ? str.substr(0, n-1) : str;
};

/*
Function to sort the games in order of date.
Since these are two-dimensional arrays, I have to compare the zero position of each element within my array,
as that is where the date information is.
*/
export const compareSecondColumn = (a, b) => {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] > b[0]) ? -1 : 1;
    }
}

const date=new Date();

export const getOneWeekAgoDate = (day, month, year) => {
    let max_day = 0;
    let correct_month = month;
    let correct_year = year;
    if(date.getMonth()-1 === 10 || date.getMonth()-1 === 8 || date.getMonth()-1 === 5 || date.getMonth()-1 === 3)
        max_day = 30;
    else if (date.getMonth()-1 === 1)
        max_day = 28;
    else max_day = 31;

    let res = day - 7;

    if (res < 0) {
        correct_month = month - 1;
        if(correct_month <= 0 ) {
            correct_month = 12;
            correct_year = year - 1;
        }
    }
    let correct_day = res > 0 ? res : max_day - Math.abs(res);
    return ""+correct_year+"-"+correct_month+"-"+correct_day;
}