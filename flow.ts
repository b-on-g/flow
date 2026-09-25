namespace $ {

	export type $bog_flow_node = {
		id: string
		name: string
		host: string
		value: string
		depth: number
		pubs: string[]
		count: number
		hot: boolean
	}

	export class $bog_flow extends $mol_object {

		static fiber( host: object, field: string ) {
			const fiber = ( host as any )[ field + '()' ]
			return fiber instanceof $mol_wire_fiber ? fiber as $mol_wire_fiber< any, any, any > : null
		}

		root(): $mol_wire_pub | null {
			return null
		}

		counts = new Map< string, number >()
		caches = new Map< string, unknown >()

		snapshot() {

			const nodes = [] as $bog_flow_node[]
			const edges = [] as [ string, string ][]
			const seen = new Set< $mol_wire_fiber< any, any, any > >()

			const root = this.root()
			if( !( root instanceof $mol_wire_fiber ) ) return { nodes, edges }

			const queue = [ { fiber: root as $mol_wire_fiber< any, any, any >, depth: 0 } ]
			seen.add( root )

			while( queue.length ) {

				const { fiber, depth } = queue.shift()!
				const id = String( fiber )
				const pubs = fiber.pub_list.filter( pub => pub instanceof $mol_wire_fiber ) as $mol_wire_fiber< any, any, any >[]

				for( const pub of pubs ) {
					edges.push([ id, String( pub ) ])
					if( seen.has( pub ) ) continue
					seen.add( pub )
					queue.push({ fiber: pub, depth: depth + 1 })
				}

				const hot = this.caches.has( id ) && this.caches.get( id ) !== fiber.cache
				const count = ( this.counts.get( id ) ?? 0 ) + ( hot ? 1 : 0 )
				this.counts.set( id, count )
				this.caches.set( id, fiber.cache )

				nodes.push({
					id,
					name: this.name( id ),
					host: this.host( fiber.host ),
					value: this.preview( fiber.cache ),
					depth,
					pubs: pubs.map( String ),
					count,
					hot,
				})

			}

			return { nodes, edges }
		}

		name( id: string ) {
			return id.replace( /<>/g, '()' ).replace( /<(.*?)>/g, '($1)' )
		}

		host( host: unknown ) {
			if( !host ) return ''
			if( typeof host === 'function' ) return this.$.$mol_func_name( host )
			return this.$.$mol_func_name( ( host as object ).constructor )
		}

		preview( value: unknown ): string {
			if( $mol_promise_like( value ) ) return '...'
			if( value instanceof Error ) return value.message
			if( value === null || value === undefined ) return String( value )
			if( typeof value === 'string' ) return JSON.stringify( value.length > 40 ? value.slice( 0, 40 ) + '...' : value )
			if( typeof value !== 'object' ) return String( value )
			if( Array.isArray( value ) ) return `[${ value.length }]`
			if( typeof Element !== 'undefined' && value instanceof Element ) return `<${ value.localName }>`
			const tag = ( value as any )[ Symbol.toStringTag ]
			if( typeof tag === 'string' ) return tag
			return this.$.$mol_func_name( value.constructor ?? Object )
		}

	}

}
