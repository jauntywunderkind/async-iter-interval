"use module"

import AsyncIterPipe from "async-iter-pipe"

export class AsyncIterInterval extends AsyncIterPipe{
	constructor( ms, opts){
		super( opts)
		this.tick= this.produce.bind( this, null)
		this.interval= setInterval( this.tick, ms)
	}
	async return( value){
		clearInterval( this.interval)
		return super.return( value)
	}
	async throw( err){
		clearInterval( this.interval)
		super.throw( value)
	}
}
export {
	AsyncIterInterval as default,
	AsyncIterInterval as asyncIterInterval,
	AsyncIterInterval as Interval,
	AsyncIterInterval as interval
}
