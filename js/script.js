  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDSERla4XQmnJ7xaryTKTqzkq5iovLiE34",
    authDomain: "ddpapp-6447a.firebaseapp.com",
    databaseURL: "https://ddpapp-6447a-default-rtdb.firebaseio.com",
    projectId: "ddpapp-6447a",
    storageBucket: "ddpapp-6447a.appspot.com",
    messagingSenderId: "1092501560659",
    appId: "1:1092501560659:web:914f577e9b14f55a5dd5a6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var tvshow = firebase.database().ref('tvshow');
  
  var shows = [];
  
  loadTable();
  
  
  
  function borrar(){
	firebase.database().ref("tvshow").child("-MTLax3pF5xQ_ylJtG6w").remove();
	
  }
 
 function loadTable(){
	firebase.database().ref('tvshow').once('value',   function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      shows.push(childSnapshot.val());
	  console.log(childSnapshot.key);
    });
	var data = "";
	for(var i=0;i<shows.length;i++){
		data += "<tr>";
		data += "<td>";
		data += shows[i].title;
		data += "</td>";
		data += "<td>";
		data += shows[i].network;
		data += "</td>";
		data += "<td>";
		data += shows[i].numberOfSeasons;
		data += "</td>";
		data += "<td>";
		data += shows[i].isCurrent;
		data += "</td>";
		data += "<td>";
		data += shows[i].genres;
		data += "</td>";
		data += "</tr>";
	}
	$("#tableData").html(data);
  });
 }
function sendData(e){
	
	e.preventDefault();
	let title = $("#txtTitle").val();	
	let network = $("#txtNetwork").val();
	let numberOfSeasons = $("#txtNumberOfSeasons").val();
	let isCurrent = $("#isCurrent").prop('checked');
	let genres = $("#genres").val();
	if(title != "" && network != "" && numberOfSeasons != "" && genres != -1){
		
		let nuevoTVShow = tvshow.push();
		nuevoTVShow.set({
			title : title,
			network : network,
			numberOfSeasons : numberOfSeasons,
			isCurrent : isCurrent,
			genres : genres
		});
		nuevoTVShow.on('value', (snapshot) => {
			Swal.fire(
			  'Genial',
			  'se ha insertado el registro con id '+snapshot.key,
			  'success'
			);
			loadTable();
		});
		
	}else{
		Swal.fire(
		  'STOP!',
		  'Faltan Datos que completar',
		  'error'
		)
	}
	
}