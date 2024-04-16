import axios from 'axios'
import https from "https"
import { TOKEN_DICTIONARY, getKeyValue } from "./storage.service.js"

export const getIcon = (icon) => {
	switch (icon.slice(0, -1)) {
		case '01':
			return '☀️';
		case '02':
			return '🌤️';
		case '03':
			return '☁️';
		case '04':
			return '☁️';
		case '09':
			return '🌧️';
		case '10':
			return '🌦️';
		case '11':
			return '🌩️';
		case '13':
			return '❄️';
		case '50':
			return '🌫️';
	}
};

export const getWeather = async (city) => {
    const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);
    if (!token) {
        threw = new Error('set token with command  -t [API_KEY]')
    }


    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: { 'q': city, 'appid': token, 'units': 'metric' },
    })
    return data


    // const url = new URL('https://api.openweathermap.org/data/2.5/weather');
    // url.searchParams.append('q', city)
    // url.searchParams.append('appid', token)
    // url.searchParams.append('units', 'metric')

    // https.get(url, (response) => {
    //     let res = '';
    //     response.on('data', (chunk) => {
    //         res += chunk
    //     })
    //     response.on('end', () => {
    //         console.log(res)
    //     })
    //     response.on('error', (error) => {
    //     })
    // })

}




