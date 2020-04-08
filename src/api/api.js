
import axios from 'axios';


// let host = '';
let local_host = "http://127.0.0.1:8000";
// =============================================================== 文章 ==================================================================================
// 获取文章列表
export const getArticleList = (page,typeId) => { return axios.get(`${local_host}/article/?page=${page}&type=${typeId}`) };
// 获取文章详情
export const getArticle = articleId => { return axios.get(`${local_host}/article/${articleId}/`) };
// 创建文章
export const CreateArticle = params => { return axios.post(`${local_host}/article/`,params) };
// 保存文章
export const SaveArticle = (articleId,params) => { return axios.put(`${local_host}/article/${articleId}/`,params) };
// 更新文章
export const UpdateArticle = (articleId,params) => { return axios.patch(`${local_host}/article/${articleId}/`,params) };
// 删除文章
export const DeleteArticle = (articleId,params) => { return axios.put(`${local_host}/article/${articleId}/`,params) };
// 获取同种类型的文章列表
export const getArticleListOfSameType = (typeId,page) => {return axios.get(`${local_host}/article/?type=${typeId}&page=${page}`) }
// 获取文章类型列表
export const getArticleTypeList = params => { return axios.get(`${local_host}/articletype/`) };
// 新建文章类型
export const CreateArticleType = params => { return axios.post(`${local_host}/articletype/`,params) };
// 文章点赞
export const praiseArticle = (articleId,params) => { return axios.patch(`${local_host}/article/${articleId}/`,params) };

// =============================================================== 评论 ==================================================================================
// 获取文章评论列表
export const getArticleCommentList = articleId => { return axios.get(`${local_host}/parentcomment/?article=${articleId}`) };
// 创建文章评论
export const CreateArticleComment = params => { return axios.post(`${local_host}/parentcomment/`,params) };
// 创建回复评论
export const CreateReplyComment = params => { return axios.post(`${local_host}/childcomment/`,params) };


// =============================================================== 用户 ==================================================================================
// 用户登录
export const login = params => { return axios.post(`${local_host}/login/`,params) };
// 用户注册
export const register = params => { return axios.post(`${local_host}/user/`,params) };
// 判断用户是否存在
export const checkuser = username => { return axios.get(`${local_host}/user/?username=${username}`) };
// 获取用户信息
export const userinfo = params => {return axios.get(`${local_host}/user/${1}/`)};
// 用户信息更新
export const updateinfo = params => {return axios.patch(`${local_host}/user/${1}/`,params)}

// =============================================================== 图片 ==================================================================================
// 上传图片到服务器
export const uploadimagetoserver = params => {return axios.post(`${local_host}/image/`,params)};
// 获取图片列表
export const getimagelist = params => {return axios.get(`${local_host}/image/`)};

// =============================================================== 音乐 ==================================================================================
// 获取热门歌曲列表
export const hotmusiclist = params => {return axios.get(`${local_host}/music/list`)};
// 获取歌曲url
export const musicurl = id => {return axios.get(`${local_host}/music/url/?id=${id}`)};
// 获取歌曲lrc
export const musiclrc = id => {return axios.get(`${local_host}/music/lrc/?id=${id}`)};
// 获取歌曲pic
export const musicpic = id => {return axios.get(`${local_host}/music/pic/?id=${id}`)};
// 搜索音乐
export const musicsearch = (name,page,count=10) => {return axios.get(`${local_host}/music/search/?name=${name}&page=${page}&count=${count}`)};

// =============================================================== 英语 ==================================================================================
// 中英互译
export const translate = text => {return axios.get(`${local_host}/english/translate/?kw=${text}`)};

// =============================================================== 电影 ==================================================================================
// 搜索电影
export const searchmovies = name => {return axios.get(`${local_host}/movies/search/?name=${name}`)};
// 电影详情
export const detailmovies = url => {return axios.get(`${local_host}/movies/detail/?url=${url}`)};











