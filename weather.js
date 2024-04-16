#!/usr/bin/env node

import { getArgs } from "./helpers/args.js"
import { getIcon, getWeather } from "./services/api.service.js"
import { printError, printHelp, printSuccess, printWeather } from "./services/log.service.js"
import { TOKEN_DICTIONARY, getKeyValue, saveKeyValue } from "./services/storage.service.js"

const api = "780ec35100683fe8420632353f413d0c"


const saveToken = async (token) => {
	if (!token) {
		printError('No token provided');
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess('Token saved');
	} catch (e) {
		printError(e.message);
	}
}

const saveCity = async (city) => {
	if (!city.length) {
		printError('No city provided');
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.city, city);
		printSuccess('City saved');
	} catch (e) {
		printError(e.message);
	}
}


const getForcast = async () => {
	try {
		const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
		const weather = await getWeather(city);
		printWeather(weather, getIcon(weather.weather[0].icon));
	} catch (e) {
		if (e?.response?.status == 404) {
			printError('Неверно указан город');
		} else if (e?.response?.status == 401) {
			printError('Неверно указан токен');
		} else {
			printError(e.message);
		}
	}
}


const initCLI = () => {
    const args = getArgs(process.argv)
    if (args.h) {
        printHelp()
    }
    if(args.s) {
        saveCity(args.s)
    }
    if(args.t) {
        saveToken(args.t)
    }
    getForcast()
}

initCLI()