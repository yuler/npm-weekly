import type { UsageOptions } from '../types'
import { CheckUsages } from '../api/usage'

export async function usage(options: UsageOptions) {
	console.log('usage')

	const resolveUsages = await CheckUsages(options, {
		onLoaded(usages) {
			depBar = bars.create(usages.length, 0, { type: c.green('deps') })
		},
		onDependencyResolved(_, name) {
			depBar?.increment(1, { name })
		},
	})
}
