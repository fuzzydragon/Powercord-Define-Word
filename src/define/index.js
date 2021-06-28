const { Plugin } = require(`powercord/entities`)
const { get } = require(`powercord/http`)

class Define extends Plugin {
	async startPlugin() {
		powercord.api.commands.registerCommand({
			command: `define`,
			description: `define word`,
			usage: ``,
			executor: async (args) => {
				const query = args[0]
				const request = get(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${query}`) 
				
				const response = await request.execute()

				return {
					send: false,
					result: {
						type: `rich`,
						color: `0x0000FF`,
						title: `Definition of ${query}`,
						fields: response.body[0].meanings.map(m => new Object({ name: m.partOfSpeech, value: m.definitions[0].definition}))
					}
				}
			}
		})
	}

	pluginWillUnload() {
		powercord.api.commands.unregisterCommand(`define`)
	}
}

module.exports = Define
