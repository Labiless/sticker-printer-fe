<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Camera from './services/Camera';
import Canvas from './services/Canvas';

let cameraService: Camera;
let canvasService: Canvas;

const cta = "Take a Picture!"
const cta2 = "Get Ready"
const isStart = ref(false);
const flash = ref(false);
const timerText = ref(cta);

const printingMaxTimer = 62;
const printingTimer = ref(printingMaxTimer)

onMounted(() => {
  //setup camera
  cameraService = new Camera();
  canvasService = new Canvas();
})

const startCamera = async () => {
  if (cameraService) {
    await cameraService.init();
    isStart.value = true;
    document.querySelector("body").webkitRequestFullscreen();
  }
}

const takePicture = async () => {
  let cont = 5;
  timerText.value = cta2;
  const interval = setInterval(() => {
    timerText.value = cont.toString();
    if (cont === 0) {
      waitForPrint();
      clearInterval(interval);
    }
    cont--;
  }, 1300)

}

const waitForPrint = () => {
  canvasService.drawSticker(cameraService.video);
  flash.value = true;
  let cont = printingMaxTimer;
  printingTimer.value = cont;
  const interval = setInterval(() => {
    cont--;
    printingTimer.value = cont;
    if (cont === 0) {
      timerText.value = cta;
      flash.value = false;
      clearInterval(interval);
    }
  }, 1000)
}

</script>

<template>
  <Transition>
    <div v-if="flash" id="flash" class="flex flex-col justify-center items-center">
      <div class="text-4xl text-center" v-if="printingTimer < printingMaxTimer - 2">
        <img class="block w-1/3 mb-4 m-auto" src="/img/cacao_text.png">
        <p>I'm printing your stickers! :)</p>
        <div class="my-4">
          <p>Wait</p>
          <p class="text-8xl">{{ printingTimer }}s</p>
          <p>before taking another shoot!</p>
        </div>
      </div>
    </div>
  </Transition>
  <main class="h-[100vh]">
    <v-btn v-if="!isStart" @click="startCamera">
      start
    </v-btn>
    <section class=" w-full h-full flex flex-col justify-center items-center">
      <video class="m-4 rounded-full"></video>
      <button id="take-a-picture" class="uppercase p-5 -translate-y-12 scale-150  rounded-full" v-if="isStart"
        @click="takePicture">
        {{ timerText }}
      </button>
    </section>
  </main>
</template>

<style>
#flash {
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: white;
  z-index: 100;
}

main {
  background-color: #6A6A6A;
}

section {
  background-image: url(../public/img/pattern.png);
  background-size: 200%;
  background-repeat: no-repeat;
  background-position: center;
}

#take-a-picture {
  letter-spacing: 2px;
  background-color: #3f38c4;
  color: white;
  box-shadow: 0px 0px 80px #000000c4;
}

video {
  border: 20px solid #5c91c8;
  box-shadow: 0px 0px 80px #000000c4;
  width: 600px;
  height: 600px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>