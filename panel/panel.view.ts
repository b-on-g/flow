namespace $.$$ {

	export class $bog_flow_panel extends $.$bog_flow_panel {

		@ $mol_mem
		static floating() {
			return this.make({ float: ()=> true })
		}

		@ $mol_mem
		static mount() {
			const panel = this.floating()
			const node = panel.dom_node()
			if( !node.isConnected ) this.$.$mol_dom_context.document.body.append( node )
			panel.dom_tree()
			return node
		}

		flow_root() {
			return $bog_flow.fiber( this.$.$mol_view, 'auto' )
		}

		@ $mol_mem
		nodes() {
			this.$.$mol_state_time.now( 500 )
			return this.Flow().snapshot().nodes
		}

		@ $mol_mem
		node_dict() {
			return new Map( this.nodes().map( node => [ node.id, node ] ) )
		}

		node( id: string ) {
			return this.node_dict().get( id )
		}

		@ $mol_mem
		tree() {
			const query = this.query().toLowerCase()
			if( query ) {
				return this.nodes()
					.filter( node => node.name.toLowerCase().includes( query ) )
					.map( node => [ node.id, 0 ] as const )
			}
			const rows = [] as ( readonly [ string, number ] )[]
			const seen = new Set< string >()
			const visit = ( id: string, level: number )=> {
				if( seen.has( id ) ) return
				seen.add( id )
				rows.push([ id, level ])
				if( !this.row_expanded( id ) ) return
				for( const pub of this.node( id )?.pubs ?? [] ) visit( pub, level + 1 )
			}
			const root = this.nodes()[0]
			if( root ) visit( root.id, 0 )
			return rows
		}

		@ $mol_mem
		levels() {
			return new Map( this.tree() )
		}

		rows() {
			return this.tree().map( ([ id ])=> this.Row( id ) )
		}

		row_level( id: string ) {
			return this.levels().get( id ) ?? 0
		}

		@ $mol_mem_key
		row_expanded( id: string, next?: boolean ) {
			if( !this.node( id )?.pubs.length ) return null
			return next ?? true
		}

		row_hot( id: string ) {
			return this.node( id )?.hot ?? false
		}

		row_name( id: string ) {
			return this.node( id )?.name ?? id
		}

		row_host( id: string ) {
			return this.node( id )?.host ?? ''
		}

		row_count( id: string ) {
			const count = this.node( id )?.count ?? 0
			return count ? `×${ count }` : ''
		}

		row_value( id: string ) {
			return this.node( id )?.value ?? ''
		}

	}

}
