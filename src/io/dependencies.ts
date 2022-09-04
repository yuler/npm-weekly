import type { DepType, RawDep, ResolvedDepChange } from '../types'

export function parseDependencies(pkg: any, type: DepType, shouldUpdate: (name: string) => boolean): RawDep[] {
	return Object.entries(pkg[type] || {}).map(([name, version]) => ({
		name,
		currentVersion: version as string,
		source: type,
		// when `updated` marked to `false`, it will be bypassed on resolving
		update: shouldUpdate(name),
	}))
}

export function dumpDependencies(deps: ResolvedDepChange[], type: DepType) {
	const data: Record<string, string> = {}
	deps
		.filter((i) => i.source === type)
		.sort((a, b) => a.name.localeCompare(b.name))
		.forEach((i) => {
			data[i.name] = i.update ? i.targetVersion : i.currentVersion
		})

	return data
}
