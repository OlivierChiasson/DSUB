DB design for dsub:


Key for each user.

user = {
	id: ''
}

// To be deleted in discord on bot bootup.
posts: [
	{
		id: '',
		belongs: 'user_id',
		type: 'from messagetypes.js'
		title: '',
		description: '',
		current_reactions: [
			{
				id: 'user_id',
				reaction: 'emoji'
			}
		],
		default_reactions: [
			{
				emoji: 'emoji'
			}
		],
		created_at: ''
	}
]