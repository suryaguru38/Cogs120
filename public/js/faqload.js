var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'FAQ.json');
ourRequest.onload = function() {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
        var data = JSON.parse(ourRequest.responseText);
        createHTML(data);
    }
    else {
        console.log("We connected to the server, but it return an error.");
    }
};

ourRequest.onerror = function() {
    console.log("Connection error");
};

ourRequest.send();

function createHTML(ADMoveSet) {
    var rawTemplate = document.getElementById('qna').innerHTML;
    var compiledTemplate = Handlebars.compile(rawTemplate);
    var ourGeneratedHTML = compiledTemplate(ADMoveSet);

    var ADMS = document.getElementById("FAQID");
    ADMS.innerHTML = ourGeneratedHTML;
}