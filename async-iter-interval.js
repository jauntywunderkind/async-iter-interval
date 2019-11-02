"use module"

import AsyncIterPipe from "async-iter-pipe"

export class AsyncIterInterval extends AsyncIterPipe{
	constructor( ms, opts){
		super( opts)
		this.ms= ms
		this.tick= this.produce.bind( this, null)
		if( !opts|| opts.start!== false){
			this.setInterval()
		}
	}
	setInterval(){
		if( this.done){
			throw new Error( "already done")
		}
		if( this.interval){ // hi ho hello implicit state machine
			return
		}
		this.interval= setInterval( this.tick, this.ms)
		return this
	}
	end(){
		this.clearInterval()
		return super.end()
	}
	clearInterval(){
		if( this.interval){
			clearInterval( this.interval)
			this.interval= null
		}
		return this
	}
	async return( value){
		this.clearInterval()
		return super.return( value)
	}
	async throw( err){
		this.clearInterval()
		super.throw( value)
	}
}
export {
	AsyncIterInterval as default,
	AsyncIterInterval as asyncIterInterval,
	AsyncIterInterval as Interval,
	AsyncIterInterval as interval
}
