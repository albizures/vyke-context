type Context<TValue> = {
	run: <TResult>(value: TValue, fn: () => TResult) => TResult
	getValue: () => TValue
}

type InContextFn<TResult> = () => TResult

/**
 * Defines a context that can be used to run code in a specific context
 * @param defaultValue The default value of the context, if not provided, the context will throw an error when trying to get the value out of it
 * @example
 * ```ts
 * const context = defineContext('test')
 *
 * const context1 = 'test 1'
 * const context2 = 'test 2'
 * const context3 = 'test 3'
 *
 * context.run(context1, () => {
 * 	console.log(context.getValue(context1)) // test 1
 *
 * 	context.run(context2, () => {
 * 		console.log(context.getValue(context2)) // test 2
 *
 * 		context.run(context3, () => {
 * 			console.log(context.getValue(context3)) // test 3
 * 		})
 *
 * 		console.log(context.getValue(context2)) // test 2
 * 	})
 *
 * 	console.log(context.getValue(context1)) // test 1
 * })
 * ```
 */
export function defineContext<TValue>(defaultValue?: TValue): Context<TValue> {
	let context: TValue | undefined = defaultValue
	function getContext() {
		if (!context) {
			throw new Error('out of context')
		}

		return context
	}

	function run<TResult>(newContext: TValue, fn: InContextFn<TResult>) {
		const oldContext = context

		context = newContext

		const result = fn()

		context = oldContext

		return result
	}

	return {
		getValue: getContext,
		run,
	}
}
