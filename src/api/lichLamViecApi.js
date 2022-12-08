import { toastify } from '../utils/common';
import axiosClient from './axiosClient';

export const register = async (formData) => {};

export const lichLamViecApi = {
  async getThoiGianLamViec() {
    try {
      const res = await axiosClient.get('thoi-gian');
      return {
        buoiSang: res.data.slice(0, 4),
        buoiChieu: res.data.slice(4, 7),
      };
    } catch (error) {
      toastify('error', error.message);
    }
  },
};
