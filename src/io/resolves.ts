import os from 'os'
import { resolve } from 'path'
import { existsSync, promises as fs, lstatSync } from 'fs'
import _debug from 'debug'
import { PackageData } from '../types'

const debug = {
	cache: _debug('taze:cache'),
	resolve: _debug('taze:resolve'),
}

let cache: Record<string, { cacheTime: number; data: PackageData }> = {}
let cacheChanged = false

const cacheDir = resolve(os.tmpdir(), 'taze')
const cachePath = resolve(cacheDir, 'cache.json')
const cacheTTL = 30 * 60_000 // 30min

function now() {
	return +new Date()
}

function ttl(n: number) {
	return now() - n
}

export async function loadCache() {
	if (existsSync(cachePath) && ttl(lstatSync(cachePath).mtimeMs) < cacheTTL) {
		debug.cache(`cache loaded from ${cachePath}`)
		cache = JSON.parse(await fs.readFile(cachePath, 'utf-8'))
	} else {
		debug.cache('no cache found')
	}
}

export async function dumpCache() {
	if (!cacheChanged) return
	try {
		await fs.mkdir(cacheDir, { recursive: true })
		await fs.writeFile(cachePath, JSON.stringify(cache), 'utf-8')
		debug.cache(`cache saved to ${cachePath}`)
	} catch (err) {
		console.warn('Failed to save cache')
		console.warn(err)
	}
}

export async function getPackageData(name: string): Promise<PackageData> {
	let error: any

	if (cache[name]) {
		if (ttl(cache[name].cacheTime) < cacheTTL) {
			debug.cache(`cache hit for ${name}`)
			return cache[name].data
		} else {
			delete cache[name]
		}
	}

	try {
		debug.resolve(`resolving ${name}`)
		const data = await pacote.packument(name, { ...npmConfig, fullMetadata: true })

		if (data) {
			const result = {
				tags: data['dist-tags'],
				versions: Object.keys(data.versions || {}),
				time: data.time,
				// raw: data,
			}

			cache[name] = { data: result, cacheTime: now() }

			cacheChanged = true

			return result
		}
	} catch (e) {
		error = e
	}

	return {
		tags: {},
		versions: [],
		error: error?.statusCode?.toString() || error,
	}
}
