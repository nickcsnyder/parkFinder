
$(function() {
    $("#requestForm").on("submit",onFormSubmit);
})

function onFormSubmit(e) {
    //e.target.numberRequested
    e.preventDefault();
    let form = e.target
    let limit = form.limitField.valueAsNumber
    let query = encodeURIComponent(form.queryField.value)
    let stateList = Array.from(form.statesField.selectedOptions).map(node => node.value).join(",");
    let apiKey = "CPzKV7nOBbxCKoc72YPEl9dqw8FurbdRJ9kDcq9V"
    fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${stateList}&q=${query}&limit=${limit}&api_key=${apiKey}`)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
        
    })
    
    .then(function(json) {
      let parksHtml = json.data.map(park => generateParkHtml(park.url,park.fullName,park.description)).join("") 
        $('#results').html(`<ul>${parksHtml}</ul>`)
    })
    .catch(promiseError => { 
        $("#results").text(`Error ${promiseError}`)   
    })

}
function generateParkHtml(url,fullName,desc) {
    return `<li><h2>${fullName}</h2><a href="${url}">${url}</a><p>${desc}</p></li>`
}
