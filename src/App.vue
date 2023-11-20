<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Camera from './services/Camera';

let cameraService : Camera;
const isStart = ref(false);

onMounted(() => {
  //setup camera
  cameraService = new Camera();
})

const startCamera = async () => {
  if (cameraService) {
    console.log(cameraService);
    await cameraService.init();
    console.log("starting camera");
    isStart.value = true;
  }
}

</script>

<template>
  <main class="flex justify-center items-center min-h-[100vh]">
    <v-btn v-if="!isStart" @click="startCamera">
      start
    </v-btn>
    <video class="rounded-full"></video>
  </main>
</template>