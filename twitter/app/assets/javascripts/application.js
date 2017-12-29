// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require turbolinks
//= require_tree .
//= require jquery3
//= require jquery_ujs
//= require jquery-ui
//= require jquery-ui/widgets/dialog

//Función para recuperar y mostrar los datos del usuario en el diálogo
function show_user(id) {
	hideData();
   	$.getJSON( "/users/" + id, function( data ) {
		$("#name").text(data.name);
		$("#email").text(data.email);
		$( "#show" ).dialog({closeText: "X"});
	});
}

//Función para recuperar y mostrar los datos de los post de un usuario
function listpost(user_id) {
	hideData();
	$.getJSON( "/users/getPostByUserId/"+user_id, function( data ) {
		//Vaciamos la capa
		$("#show_post").empty();
		//Listamos post
		$("#show_post").append('<p> Usuario: '+user_id+'</p>');

		data.microposts.forEach(function (micropost,index){
			$("#show_post").append('<p>'+micropost.content+'</p>');
		});
		
		
		//Mostramos la capa
		$( "#show_post" ).dialog({closeText: 'X'});
	});
}

function edit_user(id){	
		hideData();

	$.getJSON("/users/"+id,function(dataw){
		console.log(dataw)
		$("#form_user").empty();
		$("#form_user").dialog({closeText:"X"});
	})

	$.get( "/users/"+id+"/edit", function( data ) {
	  $("#form_user").html( data );
	  	  $("#links").remove();	
	});
	
};

function hideData(){
	
   		if($("#form_user").parents('.ui-dialog:visible').length){
			$("#form_user").dialog('close');
   		}
   		if($("#show").parents('.ui-dialog:visible').length){
			$("#show").dialog('close');
		}
		if($("#show_post").parents('.ui-dialog:visible').length){
			$("#show_post").dialog('close');
   		}
}

$(document).ready(function(){
	document.addEventListener("turbolinks:before-render", function() {
  		Turbolinks.clearCache()
	})
});