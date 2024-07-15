<div align="center">
	<h1>
		@vyke/context
	</h1>
</div>
A simple context manager for running code in a specific context

## Installation
```sh
npm i @vyke/context
```

## API
### defineContext
Defines a context that can be used to run code in a specific context

```ts
const context = defineContext('test')

const context1 = 'test 1'
const context2 = 'test 2'
const context3 = 'test 3'

context.run(context1, () => {
	console.log(context.getValue(context1)) // test 1

	context.run(context2, () => {
		console.log(context.getValue(context2)) // test 2

		context.run(context3, () => {
			console.log(context.getValue(context3)) // test 3
		})

		console.log(context.getValue(context2)) // test 2
	})

	console.log(context.getValue(context1)) // test 1
})
```

## Others vyke projects
- [Flowmodoro app by vyke](https://github.com/albizures/vyke-flowmodoro)
- [@vyke/tsdocs](https://github.com/albizures/vyke-tsdocs)
- [@vyke/val](https://github.com/albizures/vyke-val)
- [@vyke/dom](https://github.com/albizures/vyke-dom)
