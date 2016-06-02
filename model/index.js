/**
 * Created by jocyci on 2016/6/1.
 */
var mongoose = require('mongoose');
// 1.链接数据库
mongoose.connect('mongodb://123.57.143.189:27017/jocyblog');

// 2.定义schema
var userSchama = new mongoose.Schema({
    username:{type:String},// 用户名
    password:{type:String},// 密码
    email:{type:String},// 邮箱
    avatar:{type:String}//头像
});


//定义articleSchama
var articleSchama = new mongoose.Schema({
    title:{type:String},// 标题
    content:{type:String},// 正文
    createAt:{type:Date,default:new Date()},// 发表时间
    user:{type: mongoose.Schema.Types.ObjectId,ref:'user'}//作者  ref代表这个ID引用的哪个模型的id
});


// 3.定义模型
var userModel = mongoose.model('user',userSchama);
var articleModel = mongoose.model('article',articleSchama);


// 4.导出用户模型
module.exports = {
    user:userModel,
    article:articleModel
};

