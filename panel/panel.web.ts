namespace $ {

	$mol_dom_context.document?.addEventListener(
		'DOMContentLoaded',
		()=> {
			if( !new URL( $mol_dom_context.location.href ).searchParams.has( 'flow' ) ) return
			$bog_flow_panel.mount()
		},
		{ once: true },
	)

}
