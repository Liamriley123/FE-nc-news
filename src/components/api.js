import axios from "axios";

const BASE_URL = "https://nc-news-lr.herokuapp.com/api";

export const getArticles = async () => {
  const { data } = await axios.get(`${BASE_URL}/articles`);
  return data.articles;
};

export const getArticlesByTopic = async topic => {
  const { data } = await axios.get(`${BASE_URL}/topics/${topic}/articles`);
  return data.articles;
};

export const getTopArticles = async () => {
  const { data } = await axios.get(
    `${BASE_URL}/articles?sort-by=votes&&order_by=asc`
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
