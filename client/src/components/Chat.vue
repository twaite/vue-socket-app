<template>
	<main>
		<div class="message-container">
			<div
				v-for="message in props.messages"
				class="message-wrapper"
				:key="message.id"
			>
				<div class="message-from">{{ message.name }}</div>
				<div class="message-bubble">
					<div class="message-bubble-text">{{ message.text }}</div>
				</div>
			</div>
		</div>
		<form novalidate @submit="sendMessage">
			<input v-model="state.message" />
		</form>
	</main>
</template>

<script>
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	props: ['messages'],
	setup(props, { emit }) {
		const state = reactive({
			message: '',
			messages: []
		});

		function sendMessage(e) {
			e.preventDefault();
			emit('message', state.message);
			state.message = '';
		}

		return {
			state,
			props,
			sendMessage
		};
	}
})
</script>

<style scoped>
main {
	@apply h-full w-full flex flex-col;
}

.message-container {
	@apply p-5 max-w-3xl flex-1;
}

.message-wrapper {
	@apply py-3;
}

.message-from {
	@apply text-purple-300 text-sm;
}

.message-bubble {
	@apply bg-gray-700 px-5 py-3 mt-1 rounded-full;
}

form {
	@apply p-3 w-full flex;
}

input {
	@apply flex-1 bg-gray-700 h-12 px-5 rounded border-0 outline-none rounded-lg;
}
</style>
