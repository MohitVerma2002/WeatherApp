let loc=document.getElementById("location");
let tempicon=document.getElementById("temp-icon");
let tempvalue=document.getElementById("temp-value");
let climate=document.getElementById("climate");
let iconfile;
const search=document.getElementById("search");
const searchbutton=document.getElementById("search-button");





searchbutton.addEventListener('click',(e)=>{
	e.preventDefault();
	getWeather(search.value);
	search.value='';
})


const getWeather=async(city)=>{
	try{
		const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5ed250886b660ead639e4a7ddb90bfd3`,

		{mode:'cors'}
		);

		const weatherData= await response.json();
		console.log(weatherData);
		const{name}=weatherData;
		const{feels_like}=weatherData.main;
		const{id,main}=weatherData.weather[0];
        
		loc.textContent=name;
		climate.textContent=main;
		climate.textContent = main;
			tempvalue.textContent = Math.round(feels_like-273);

			if(id>200 && id<300){
				tempicon.src="thunderstorm.png";
			 }
			 else if(id>300 && id<400)
			 {
				tempicon.src="cloud.png";
			 }
			 else if(id>500 && id<600)
			 {
				tempicon.src="rain.png";
			 }
			 else if(id>600 && id<700)
			 {
				tempicon.src="snow.png";
			 }
			 else if(id>700 && id<800)
			 {
				tempicon.src="haze.png";
			 }
			 else if(id==800)
			 {
				tempicon.src="sunny.png";
			 }

	}
	catch(error){
		alert('city not found');
	}
};






window.addEventListener("load",()=>{
let long;
let lat;

if(navigator.geolocation)
{
	navigator.geolocation.getCurrentPosition((position)=>{
		long = position.coords.longitude;
		lat = position.coords.latitude;
		const proxy="https://cors-anywhere.herokuapp.com/";

		const api=`${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=5ed250886b660ead639e4a7ddb90bfd3`

		fetch(api).then((response)=>{
			return response.json();
		})
		.then(data=>{
			const{name}=data;
			const{feels_like}=data.main;
			const{id,main}=data.weather[0];

			loc.textContent = name;
			climate.textContent = main;
			tempvalue.textContent = Math.round(feels_like-273);

         if(id>200 && id<300){
			tempicon.src="thunderstorm.png";
		 }
		 else if(id>300 && id<400)
		 {
			tempicon.src="cloud.png";
		 }
		 else if(id>500 && id<600)
		 {
			tempicon.src="rain.png";
		 }
		 else if(id>600 && id<700)
		 {
			tempicon.src="snow.png";
		 }
		 else if(id>700 && id<800)
		 {
			tempicon.src="haze.png";
		 }
		 else if(id>=800)
		 {
			tempicon.src="sunny.png";
		 }


			console.log(data);
		})
	})
}
})