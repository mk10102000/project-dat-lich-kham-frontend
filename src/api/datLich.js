import { toastify } from '../utils/common';
import axiosClient from './axiosClient';

export const datLichApi = {
  async getDatLich(params) {
    try {
      const res = await axiosClient.get('dat-lich', {
        params: params,
      });
      console.log(res);
      return res;
    } catch (error) {
      toastify('error', error.message);
    }
  },
  async dangKyDatLich(formData) {
    try {
      const res = await axiosClient.post('dat-lich', formData);
      console.log(res);
      return res;
    } catch (error) {
      toastify('error', error.message);
    }
  },

  async getDatLichUser(maND) {
    try {
      const res = await axiosClient.get(`dat-lich-user/${maND}`);
      console.log(res);
      return res;
    } catch (error) {
      toastify('error', error.message);
    }
  },

  async getAllDatLich(params) {
    try {
      const res = await axiosClient.get(`all-dat-lich`, {
        params: params,
      });
      return res;
    } catch (error) {
      toastify('error', error.message);
    }
  },

  async comfirmDangKy(params, payload) {
    try {
      const res = await axiosClient.put('confirm-dat-lich', payload, {
        params: params,
      });
    } catch (error) {}
  },
};
