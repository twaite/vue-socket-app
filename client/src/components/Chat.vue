<template>
	<main>
		<div class="message-container">
			<div
				v-for="message in state.messages"
				class="message-wrapper"
				:key="message.id"
			>
				<div class="message-from">{{ message.from }}</div>
				<div class="message-bubble">
					<div class="message-bubble-text">{{ message.text }}</div>
				</div>
			</div>
		</div>
		<form novalidate @submit="sendMessage">
			<input v-model="state.message" />
			<button type="submit">Send</button>
		</form>
	</main>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';

const mockMessages = [
  {
    id: '1',
    from: 'joe',
    time: new Date('02/01/2021'),
    text: 'wanna hear my new guitar riff?',
  },
  {
    id: '2',
    from: 'TinyTim',
    time: new Date('02/02/2021'),
    text: 'nah, sorry, im too busy sculpting my guns',
  },
  {
    id: '3',
    from: 'dougiefresh',
    time: new Date('02/03/2021'),
    text: 'lets hear it joe!',
  },
];

const socket = io('http://localhost:3000');

socket.on('connect', () => {
	console.log('connected?', socket);
})

export default defineComponent({
	setup() {
		const state = reactive({
			messages: [...mockMessages],
			message: '',
			users: [],
			roomName: 'Dallas Vue Meetup',
		});

		console.log('socket: ', socket);
		socket.connect();


		if (socket.connected) {
			alert('CONNECTED!!!!!');
		}

		socket.on('chat message', message => {
			state.messages.push({
				from: 'Tiny Tim',
				time: new Date(),
				text: message
			})
		})

		function sendMessage(e) {
			e.preventDefault();
			socket.emit('chat message', state.message);
			state.message = '';
		}

		return {
			state,
			sendMessage
		}
	}
});
</script>

<style>
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
	@apply p-2 w-full flex;
}

input {
	@apply flex-1 bg-gray-700 h-12 px-5 rounded border-0 outline-none rounded-full;
}

button {
	@apply rounded-full bg-purple-300;
}

</style>
