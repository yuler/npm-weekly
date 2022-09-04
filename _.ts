import { MultiBar, Presets } from 'cli-progress'
import c from 'picocolors'

const bars = new MultiBar(
	{
		clearOnComplete: true,
		hideCursor: true,
		format: `{type} {bar} {value}/{total} ${c.gray('{name}')}`,
		linewrap: false,
		barsize: 40,
	},
	Presets.shades_grey
)

const depBar = bars.create(3, 0, { type: c.green('deps') })

depBar?.increment(1, { name: 'express' })
setTimeout(() => {
	depBar?.increment(1, { name: 'typescript' })
}, 1000)

setTimeout(() => {
	depBar?.increment(1, { name: 'loadsh' })
}, 2000)

setTimeout(() => {
	bars.stop()
}, 3000)
