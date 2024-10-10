<template>
  <client-only>
    <div class="calendar-container">
      <v-calendar 
        v-model="selectedDate" 
        is-expanded 
        :attributes="events"
        style="width: 600px; height: 350px;"
      />
    </div>
  </client-only>
</template>

<script setup>
import { ref } from 'vue'
import 'v-calendar/dist/style.css'

const selectedDate = ref(new Date())

// イベントデータ
const events = [
  { key: 'today', highlight: { backgroundColor: 'green' }, dates: new Date() }
]
</script>

<style scoped>
.calendar-container {
  display: block;
  width: 100%;
  max-width: 100%; 
  margin: 0 auto;   
}
</style>
