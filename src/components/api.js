import axios from "axios";

const BASE_URL = "https://nc-news-lr.herokuapp.com/api";

export const getArticles = async () => {
  const { data } = await axios.get(`${BASE_URL}/articles`);
  return data.articles;
};

export const getSortedArticles = async (sort, order, limit, page) => {
  const { data } = await axios.get(
    `${BASE_URL}/articles?sort_by=${sort}&order=${order}&limit=${limit}&p=${page}`
  );
  return data.articles;
};

export const auth = (user, route, auth) => {
  return user ? route : auth;
};

export const deleteData = async (articleid, commentid) => {
  const url = commentid
    ? `${BASE_URL}/articles/${articleid}/comments/${commentid}`
    : `${BASE_URL}/articles/${articleid}`;


  const { data } = await axios.delete(url);
  return data;
};

export const getUserByUsername = username => {
  return axios.get(`${BASE_URL}/users/${username}`).then(({ data }) => data);
};

export const getUsers = async () => {
  const { data } = await axios.get(`${BASE_URL}/users`);
  return data.users;
};

export const getComments = async id => {
  const { data } = await axios.get(`${BASE_URL}/articles/${id}/comments`);
  return data.comments;
};

export const getArticleById = async id => {
  const { data } = await axios.get(`${BASE_URL}/articles/${id}`);
  return data.article;
};

export const getArticlesByTopic = async topic => {
  const { data } = await axios.get(`${BASE_URL}/topics/${topic}/articles`);
  return data.articles;
};

export const getTopArticles = async () => {
  const { data } = await axios.get(
    `${BASE_URL}/articles?sort_by=votes&order=desc`
  );
  return data.articles;
};

export const getRecentArticles = async () => {
  const { data } = await axios.get(
    `${BASE_URL}/articles?sort_by=created_at&order=desc`
  );
  return data.articles;
};

export const formatDate = date => {
  const dateArr = date.slice(0, 10).split("-");
  return `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`;
};

export const getTopics = async () => {
  const { data } = await axios.get(`${BASE_URL}/topics`);
  return data.topics;
};

// export const addArticle = async (name, cohort) => {
//   const articleToPost = { name, startingCohort: cohort };
//   const { data } = await axios.post(`${BASE_URL}/articles`, articleToPost);
//   return data.article;
// };
