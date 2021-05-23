export default function UseHttpRequest({ url, method = "GET", data = null, token = false }) {
 return   fetch('http://localhost:4500' + url, {
        method,
        body:data ?  JSON.stringify(data) : null,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}`: null,
        }
    }).then((res) => res.json())
        .then((data) => {

            return data
        })
        .catch((e) => console.log(e))
}
