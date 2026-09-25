namespace $.$$ {

	$mol_style_define( $bog_flow_panel, {

		'@': {
			bog_flow_panel_float: {
				'true': {
					position: 'fixed',
					top: 0,
					right: 0,
					bottom: 0,
					width: '28rem',
					maxWidth: '100%',
					zIndex: 1000,
					boxShadow: `0 0 1rem 0 ${ $mol_theme.shade }`,
				},
			},
		},

		Row: {
			transition: 'background-color 1.5s',
			'@': {
				bog_flow_panel_row_hot: {
					'true': {
						background: {
							color: $mol_theme.current,
						},
						transition: 'none',
					},
				},
			},
		},

		Expand: {
			flex: {
				grow: 1,
				shrink: 1,
			},
			minWidth: 0,
			whiteSpace: 'nowrap',
		},

		Count: {
			color: $mol_theme.focus,
			padding: $mol_gap.text,
		},

		Value: {
			color: $mol_theme.shade,
			padding: $mol_gap.text,
			whiteSpace: 'nowrap',
			overflow: 'hidden',
			maxWidth: '40%',
		},

	} )

}
