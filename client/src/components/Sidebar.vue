<template>
	<nav>
		<div v-for="user in usersWithAcronyms" class="user">
			<span class="avatar">{{user.acronym}}</span>{{user.firstName}} {{user.lastName}}
		</div>
	</nav>
</template>

<script>
import { computed, defineComponent } from 'vue';

export default defineComponent({
	props: ['users'],
	setup(props) {

		const usersWithAcronyms = computed(() => {
			return props.users.map(u => ({
				...u,
				acronym: `${u.firstName[0].toUpperCase()}${u.lastName[0].toUpperCase()}`
			}));
		});

		return {
			props,
			usersWithAcronyms
		};
	}
});
</script>

<style>
.avatar {
	@apply rounded-full h-10 w-10 flex items-center justify-center bg-red-400 font-bold mr-3;
}

.user {
	@apply flex items-center;
}

nav {
	@apply w-1/4 h-full p-3 bg-gray-900;
}
</style>
