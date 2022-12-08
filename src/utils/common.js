import { toast } from 'react-toastify';

export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const toastify = (type, label) => {
  switch (type) {
    case 'success': {
      toast.success(label, {
        position: 'top-right',
        autoClose: 3000,
      });
      break;
    }
    case 'error': {
      toast.error(label, {
        position: 'top-left',
        autoClose: 1000,
      });
      break;
    }
    default:
      break;
  }
};
