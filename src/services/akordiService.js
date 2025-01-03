import http from '@/services/httpAnon';

const serviceUrl = '';
let abortController = null;
export default {

  parseUrl(url) {
    const regex = /(\d+).*/;
    if (!regex.exec(url)) {
      return null;
    }
    return +regex.exec(url)[1];
  },

  getArtist(id) {
    return http(serviceUrl).get(`/api/v2/artists/${id}`);
  },

  getArtists(reqParams) {
    let params = reqParams;
    if (!params) {
      params = {
        size: 20,
        page: 0,
        sort: 'createdDate,desc',
      }
    }
    return http(serviceUrl).get('/api/v2/artists', { params });
  },

  getTags(reqParams) {
    let params = reqParams;
    if (!params) {
      params = {
        size: 20,
        page: 0,
        sort: 'title,asc',
      }
    }
    return http(serviceUrl).get('/api/v2/tags', { params });
  },

  getTag(id) {
    return http(serviceUrl).get(`/api/v2/tags/${id}`);
  },


  getSongs(reqParams) {
    let params = reqParams;
    if (!params) {
      params = {
        size: 20,
        page: 0,
        sort: 'createdDate,desc',
      }
    }
    return http(serviceUrl).get('/api/v2/songs', { params });
  },

  getSongsCount() {
    const params = {
      size: 0,
      page: 0
    };
    return http(serviceUrl).get('/api/v2/songs', { params });
  },

  getSong(id) {
    return http(serviceUrl).get(`/api/v2/songs/${id}`);
  },

  search(query) {
    if (abortController) {
      abortController.abort();
    }
    abortController = new AbortController();

    const params = {
      $top: 10,
      highlight: 'title,bodyLyrics,mainArtistTitle',
      search: query,
    };
    return http(serviceUrl).get(`/api/search`, {
      params,
      signal: abortController.signal
    });
  },

};
