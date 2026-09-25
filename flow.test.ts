namespace $ {

	class $bog_flow_test_chain extends $mol_object {

		@ $mol_mem
		a( next = 1 ) {
			return next
		}

		@ $mol_mem
		b() {
			return this.a() + 1
		}

		@ $mol_mem
		c() {
			return this.b() * 2
		}

	}

	$mol_test({

		'graph goes from c down to a and counts recomputes'( $ ) {

			const chain = $bog_flow_test_chain.make({ $ })
			chain.c()

			const flow = $bog_flow.make({ $, root: ()=> $bog_flow.fiber( chain, 'c' ) })
			const before = flow.snapshot().nodes

			$mol_assert_like(
				before.map( node => node.name.replace( /^.*\./, '' ) ),
				[ 'c()', 'b()', 'a()' ],
			)
			$mol_assert_like( before.map( node => node.count ), [ 0, 0, 0 ] )

			chain.a( 5 )
			chain.c()

			const after = flow.snapshot().nodes
			$mol_assert_like( after.map( node => node.count ), [ 1, 1, 1 ] )
			$mol_assert_like( after.map( node => node.hot ), [ true, true, true ] )

		},

	})

}
