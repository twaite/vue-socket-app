<template>
	<div id="root">
		<Sidebar />
		<Chat />
	</div>
</template>

<script setup>
import { defineComponent } from 'vue';
import Chat from './components/Chat.vue';
import Sidebar from './components/Sidebar.vue';

defineComponent({
	components: { Chat, Sidebar }
});
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

#root {
	@apply bg-gray-800 h-screen text-white flex flex-row;
}
</style>
