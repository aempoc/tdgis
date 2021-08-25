var tags =[];

function traverse(o) {
   
 for (var i in o) {
        if (o[i] && typeof (o[i]) == "object") {
            if (i == "xdm:tags") {
               for (var key in o[i]) {
                  tags.push(o[i][key]);   }
                       }
               traverse(o[i]);
        }
    }
    
    return tags;
}

