<script setup lang="ts">
  import { onMounted, ref, watch } from "vue";
  import { fetchItemById, fetchTopStories } from "./server";
  import dayjs from "dayjs";
  import { Item } from "./types";

  const topstoriesID = ref<number[]>([]);
  const pageSize = ref(5);
  const pageNum = ref(1);
  onMounted(() => {
    fetchTopStories().then((res) => {
      topstoriesID.value = res;

      Promise.all(
        res
          .slice(
            (pageNum.value - 1) * pageSize.value,
            pageNum.value * pageSize.value,
          )
          .map((id) => fetchItemById(id)),
      ).then((res1) => {
        topstories.value = res1;
      });
    });
  });
  const topstories = ref<Item[]>([]);
  watch([pageNum, pageSize], ([pageNum, pageSize]) => {
    Promise.all(
      topstoriesID.value
        .slice((pageNum - 1) * pageSize, pageNum * pageSize)
        .map((id) => fetchItemById(id)),
    ).then((res1) => {
      topstories.value = res1;
    });
  });
</script>

<template>
  <div class="p-2">
    <h2>topstories {{ topstoriesID.length }}</h2>
    <div
      v-for="(storie, index) in topstories"
      class="box mb-2 hover:bg-gray-200">
      <div>
        {{ index + 1 + (pageNum - 1) * pageSize }}.
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
    <button @click="pageNum = Math.max(1, pageNum - 1)">prev</button>
    pageSize:
    <input
      class="w-10"
      type="number"
      v-model="pageSize" />
    pageNum: {{ pageNum }}
    <button
      @click="pageNum = Math.min(topstoriesID.length / pageSize, pageNum + 1)">
      next
    </button>
  </div>
</template>
