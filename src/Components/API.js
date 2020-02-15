import axios from "axios";
import queryString from "querystring";

function APICall(data, callbackSuccess, callbackError)
{
    axios.post("http://---------/api/main.php", queryString.stringify(data),
        { 
            "headers":{"Content-Type":"application/x-www-form-urlencoded", "Accept":"*"}
        }).then((response) =>
        {
            callbackSuccess(response.data);
        }).catch(callbackError);
}

export default APICall;