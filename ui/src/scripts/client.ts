import axios from "axios";
import type { AppResponse, Paged, Message } from "./types";
import type { Hex } from "viem";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const Client = {
  async getMessage(
    messageId: Hex
  ): Promise<AppResponse<Message | null> | null> {
    try {
      const response = await api.get(`/messages/${messageId}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async getMessages(
    page: number,
    take: number
  ): Promise<AppResponse<Paged<Message[]>> | null> {
    try {
      const response = await api.get(`/messages?page=${page}&take=${take}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

export default Client;
