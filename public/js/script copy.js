// Complete Button logic

function ChangeToCompleted(itemVal){
    
	var arrObj;
    
    var storedItems = localStorage.getItem('CompletedSet');
    console.log(storedItems);
    if(storedItems != null){
        arrObj = $.parseJSON(storedItems);
    }
    else{
        arrObj = [];
    }
    console.log(arrObj);
    
	var item = {}
    item["name"] = itemVal;
    item["status"] = "Completed";

    arrObj.push(item);

    var arrStr = JSON.stringify(arrObj);
    localStorage.setItem("CompletedSet", arrStr);
    $(".completeBtn").html('<button type="button" class="btn btn-success btn-completed">Completed</button>');
};


// Load list
function LoadListWithChecks(){
    var storedItems = localStorage.getItem('CompletedSet');
    if(storedItems != null){
        var json_arr = $.parseJSON(storedItems);
        $(".list-group a").each(function(){

            for(var i=0; i<json_arr.length; i++){
                if($(this).attr("data-id") == json_arr[i].name && json_arr[i].status == "Completed"){
                    var htmlVal = $(this).html()+' <i class="fa fa-check"></i>';
                    $(this).html(htmlVal);
                }
            }

        });
    }
}

// Load Completed Button 

function LoadCompletedButton(itemVal){
    var storedItems = localStorage.getItem('CompletedSet');
    if(storedItems != null){
        var json_arr = $.parseJSON(storedItems);
        for(var i=0; i<json_arr.length; i++){
            if(itemVal == json_arr[i].name && json_arr[i].status == "Completed"){
                $(".completeBtn").html('<button type="button" class="btn btn-success btn-completed">Completed</button>');
            }
        }
    }
}