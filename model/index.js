/**
 * Created by jocyci on 2016/6/1.
 */
var mongoose = require('mongoose');
// 1.�������ݿ�
mongoose.connect('mongodb://123.57.143.189:27017/jocyblog');

// 2.����schema
var userSchama = new mongoose.Schema({
    username:{type:String},// �û���
    password:{type:String},// ����
    email:{type:String},// ����
    avatar:{type:String}//ͷ��
});


//����articleSchama
var articleSchama = new mongoose.Schema({
    title:{type:String},// ����
    content:{type:String},// ����
    createAt:{type:Date,default:new Date()},// ����ʱ��
    user:{type: mongoose.Schema.Types.ObjectId,ref:'user'}//����  ref�������ID���õ��ĸ�ģ�͵�id
});


// 3.����ģ��
var userModel = mongoose.model('user',userSchama);
var articleModel = mongoose.model('article',articleSchama);


// 4.�����û�ģ��
module.exports = {
    user:userModel,
    article:articleModel
};

