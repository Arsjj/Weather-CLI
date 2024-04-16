import chalk from "chalk"
import dedent from "dedent-js"

const printError = (err) => {
    console.error(chalk.bgRed('Error') + ' ' + err)
}

const printSuccess = (success) => {
    console.error(chalk.bgGreen('Success') + ' ' + success)
}

const printHelp = (help) => {
    console.log(
        dedent`${chalk.bgCyan('Help')}
        without args - show weather
        -s [city] set city
        -h for help
        -t [API_KEY] for seving token 
        `
    )
}

export const printWeather = (res, icon) => {
    console.log(
        dedent`${chalk.bgYellow('Weather')} Weather in city ${res.name}
        ${icon}  ${res.weather[0].description}
        Temperature: ${res.main.temp} (feels like ${res.main.feels_like})
		Humidity: ${res.main.humidity}%
		Wind speed: ${res.wind.speed}
        `
    )
}

export { printError, printSuccess, printHelp }