<template>
	<div class="modal-container">
		<div class="backdrop" />
		<form class="modal" @submit="submit" novalidate>
			<header>
				<h1>Enter Your Name to Chat</h1>
			</header>
			<main>
				<label for="firstName">First Name</label>
				<input name="firstName" v-model="state.firstName" />
				<div class="error">{{state.firstNameError}}</div>
				<label for="lastName">Last Name</label>
				<input name="lastName" v-model="state.lastName" />
				<div class="error">{{state.lastNameError}}</div>
			</main>
			<footer>
				<button type="submit">Start Chatting</button>
			</footer>
		</form>
	</div>
</template>

<script>
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	emits: ['login'],
	setup(_, context) {
		const state = reactive({
			firstName: '',
			lastName: '',
			firstNameError: null,
			lastNameError: null,
			submitted: false
		});

		function submit(e) {
			e.preventDefault();

			state.submitted = true;

			if (!state.firstName) {
				state.firstNameError = 'First name is required';
			} else {
				state.firstNameError = null;
			}

			if (!state.lastName) {
				state.lastNameError = 'Last name is required';
			} else {
				state.lastNameError = null;
			}

			if (state.firstName && state.lastName) {
				context.emit('login', {
					firstName: state.firstName,
					lastName: state.lastName
				});
			}
		}

		return {
			state,
			submit
		}
	}
});
</script>

<style scoped>
.modal-container {
	@apply fixed flex h-screen w-screen items-center justify-center;
}

.backdrop {
	@apply bg-gray-900 fixed h-screen w-screen z-0 opacity-80;
}

.modal {
	@apply w-1/3 bg-gray-700 p-3 rounded-lg shadow-lg z-10;
}

header {
	@apply pb-3;
}

form, main {
	@apply flex flex-col;
}

input {
	@apply py-2 px-4 bg-gray-600 rounded outline-none;
}

label {
	@apply pb-1;
}

.error {
	@apply text-red-400 pt-1 pb-2;
}

h1 {
	@apply text-2xl;
}

main {
	@apply py-2;
}

footer {
	@apply flex justify-end py-2;
}

button {
	@apply bg-pink-500 rounded px-3 py-2 focus:outline-none;
}
</style>
