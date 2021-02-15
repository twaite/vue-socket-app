<template>
	<div id="root">
		<Sidebar :users="state.users" />
		<Chat :messages="state.messages" @message="message" />
		<LoginModal v-if="!state.loggedIn" @login="login" />
	</div>
</template>

<script setup>
import { reactive } from 'vue';
import Chat from './components/Chat.vue';
import LoginModal from './components/LoginModal.vue';
import Sidebar from './components/Sidebar.vue';

const socket = io('http://192.168.1.70:3000');

socket.on('chat message', msg => {
	state.messages.push(msg)
})

const state = reactive({
	loggedIn: false,
	user: null,
	messages: [],
	users: []
});

socket.on('user list updated', users => {
	state.users = users;
})

function login(user) {
	socket.emit('login', user);
	state.loggedIn = true;
	state.user = user;
}

function message(message) {
	socket.emit('chat message', {
		name: `${state.user.firstName} ${state.user.lastName}`,
		time: new Date(),
		text: message
	});
}
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

#root {
	@apply bg-gray-800 h-screen text-white flex flex-row;
}
</style>
