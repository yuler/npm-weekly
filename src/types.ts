export type RangeMode = 'default' | 'major' | 'minor' | 'patch' | 'latest' | 'newest'

export type PackageMode = Omit<RangeMode, 'default'> | 'ignore'

export interface CommonOptions {
	cwd: string
	recursive?: boolean
	include?: string | string[]
	exclude?: string | string[]
	prod?: boolean
	dev?: boolean
	loglevel: string
	silent?: boolean
	force?: boolean
	packageMode?: { [name: string]: PackageMode }
}

export interface UsageOptions extends CommonOptions {
	detail: boolean
	recursive: true
}
