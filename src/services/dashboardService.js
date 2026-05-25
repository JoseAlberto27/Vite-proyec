import { httpClient } from './httpClient.js';

export const dashboardService = {
  getPosts() {
    return httpClient.get('/posts', {
      params: {
        _limit: 4
      }
    });
  }
};
