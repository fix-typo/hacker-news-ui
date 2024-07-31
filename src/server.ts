import axios from "axios";

export async function fetchItemById(id: string | number) {
  const { data } = await axios.get<Record<string, any>>(`/item/${id}.json`);
  return data;
}

export async function fetchTopStories() {
  const { data } = await axios.get<number[]>("/topstories.json");
  return data;
}
