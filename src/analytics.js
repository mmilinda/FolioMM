import ReactGA from "react-ga4";


export function Analytics(){

ReactGA.initialize(

"TON_ID_ANALYTICS"

);


ReactGA.send({

hitType:"pageview",

page:window.location.pathname

});


}