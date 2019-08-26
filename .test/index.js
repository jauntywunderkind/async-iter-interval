"use module"
import AsyncIterInterval from ".."
import delay from "delay"
import tape from "tape"

const
  TIMEBASE= 30,
  E= 10

tape( "emits at intervals", async function( t){
	const aii= new AsyncIterInterval( 30)
	let i= 0
	function expectN( aii, n){
		aii.next().then( function(){
			t.equal( i++, n, `expected iteration ${n}`)
		})
	}
	expectN( aii, 0)
	expectN( aii, 1)
	expectN( aii, 2)
	expectN( aii, 3)
	t.equal( aii.queueCount, -4, "four pending reads")

	await delay( TIMEBASE+ E)
	t.equal( aii.queueCount, -3, "three pending reads")

	await delay( TIMEBASE* 5)
	t.equal( aii.queueCount, 2, "two queued writes")
	aii.return()

	t.end()
})
