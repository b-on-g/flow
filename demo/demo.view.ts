namespace $.$$ {

	export class $bog_flow_demo extends $.$bog_flow_demo {

		@ $mol_mem
		sum() {
			return this.price() * this.count()
		}

		total() {
			return `Total: ${ this.sum() }`
		}

		app_root() {
			return $bog_flow.fiber( this.App(), 'dom_tree' )
		}

	}

}
