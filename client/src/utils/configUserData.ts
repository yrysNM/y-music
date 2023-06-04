const user: {
  access_token: string;
  uid: number;
  username: string;
  password: string;
} = {
  access_token: String(import.meta.env.VITE_YM_ACCESS_TOKEN),
  uid: Number(import.meta.env.VITE_YM_UID),
  username: String(import.meta.env.VITE_YM_USERNAME),
  password: String(import.meta.env.VITE_YM_PASSWORD),
};

export default {
  user,
};
