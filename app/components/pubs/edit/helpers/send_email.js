
    var from
    var to
    var subject
    var text
    $("#send_email").click(function(){     
        to =
        subject =
        text = 
        alertify.message("Sending E-mail...Please wait");
        $.get("http://localhost:3000/send",{to:to,subject:subject,text:text},function(data){
        if(data=="sent")
        {
        alertify.message("Email is been sent at " + to + " . Please check inbox!");
      }
	});
  });
