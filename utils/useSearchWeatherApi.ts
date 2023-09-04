const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'a31c7d80d3msh9f3d28b0ea4a70bp1c9afejsn4fdcb533b79a',
		'X-RapidAPI-Host': 'ai-weather-by-meteosource.p.rapidapi.com'
	}
};

const useSearchWeatherApi=async(location)=>{
	// console.log("Search api",location)
	
		const url = `https://ai-weather-by-meteosource.p.rapidapi.com/current?lat=${location.lat}&lon=${location.lon}&timezone=auto&language=en&units=auto`;
	
		try {
		const response = await fetch(url, options);
		const result = await response.json();
		return result;
	} catch (error) { 
		console.error("Error found in useWeatherApi",error);
	}
}

export default useSearchWeatherApi;