import { describe, expect, it } from 'vitest'
import { defineContext } from './'

it('run in context', () => {
	const context = defineContext('test')

	const context1 = 'test 1'
	const context2 = 'test 2'
	const context3 = 'test 3'

	context.run(context1, () => {
		expect(context.getValue()).toBe(context1)

		context.run(context2, () => {
			expect(context.getValue()).toBe(context2)

			context.run(context3, () => {
				expect(context.getValue()).toBe(context3)
			})

			expect(context.getValue()).toBe(context2)
		})

		expect(context.getValue()).toBe(context1)
	})
})

describe('when getting the value out of a context ', () => {
	it('throws an error', () => {
		const context = defineContext()

		expect(() => context.getValue()).toThrowError('out of context')
	})
})

describe('when a default is given', () => {
	it('returns the default value', () => {
		const context = defineContext('default')

		expect(context.getValue()).toBe('default')
	})
})
