<script setup lang="ts">
  import { onMounted, ref, watch } from "vue";
  import { fetchItemById, fetchTopStories } from "./server";
  import dayjs from "dayjs";

  const topstoriesID = ref<number[]>([]);
  onMounted(() => {
    fetchTopStories().then((res) => {
      topstoriesID.value = res.slice(0, 5);
    });
  });
  const topstories = ref<Record<string, any>[]>([]);
  watch(topstoriesID, (topstoriesID) => {
    if (topstoriesID.length) {
      topstoriesID.forEach((id) => {
        fetchItemById(id).then((res) => {
          topstories.value.push(res);
        });
      });
    }
  });
</script>

<template>
  <div class="p-2">
    <h2>topstoriesID</h2>
    <div
      v-for="(storie, index) in topstories"
      class="box mb-2 hover:bg-gray-200">
      <div>
        {{ index + 1 }}.
        <a
          class="font-bold decoration-none c-black"
          target="_blank"
          :href="storie.url">
          {{ storie.title }}
        </a>
      </div>
      <div class="pl-5">
        {{ storie.score }} points | by {{ storie.by }} |
        {{ dayjs.unix(storie.time).format("YYYY-MM-DD HH:mm:ss") }} |
        {{ storie.descendants }} commants
      </div>
    </div>
  </div>
</template>
