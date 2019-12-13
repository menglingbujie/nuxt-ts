const apiHost = process.env.apiHost;
export default {
  fetchNews(ctx, form) {
    return this.$axios.get(`${apiHost}/news/list?limit=12&type=0&page=${form.page}`);
  }
}